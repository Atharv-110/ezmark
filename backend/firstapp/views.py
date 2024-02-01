from rest_framework.response import Response
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, ListCreateAPIView
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from .serializers import (
    StudentRegistrationSerializer,
    StudentloginSerializer,
    PendingRequestSerializer,
    AdminloginSerializer,
    AdminRegistrationSerializer,
    StudentSendPasswordResetEmailSerializer,
    StudentPasswordResetSerializer,
    AdminSendPasswordResetEmailSerializer,
    AdminPasswordResetSerializer,
    PendingRequestManagementSectionSerializer,
    StudentMangementSectionSerializer,
    AttendanceManagementSectionSerializer,
    StudentAfterLoginPanelSerializer,
    StudentAttendenceByDateSerializer,
    UpdateGeofenceSerializer,
)
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from .renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import date, datetime, timedelta
from .utils import is_within_geofence
from .models import Student, Attendance, PendingRequest, Admin, GPS



# Generate token manually for student get_tokens_for_student
def gettokensforstudent(student):
    refresh = RefreshToken.for_user(student)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }
    

# Generate token manully for admin
def gettokensforadmin(admin):
    refresh = RefreshToken.for_user(admin)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


# Student Registration View
class StudentRegistrationView(APIView):
    # It will Generalize The way of giving error
    renderer_classes = [UserRenderer]
    # print(" render_classes : ",renderer_classes)
    def post(self, request, format=None):
        serializer = StudentRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        pending_request = serializer.save(is_active=False)
        print("pending_request :",pending_request) 
        token = gettokensforstudent(pending_request)
        return Response(
            {"token": token, "msg": "Registration Successful"},
            status=status.HTTP_201_CREATED,
        )


class PendingRequestView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [UserRenderer]

    def post(self, request, *args, **kwargs):
        serializer = PendingRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]

            # Move the pending request to the Student model
            pending_request = PendingRequest.objects.get(email=email)
            actemail = pending_request.email
            actname = pending_request.name
            actmobile_numbe = pending_request.mobile_number
            actpassword = pending_request.password
            pending_request.delete()
            Student.objects.create(
                email=actemail,
                name=actname,
                mobile_number=actmobile_numbe,
                password=actpassword,
            )
            return Response(
                {"msg": "Student approved and details moved to Student table."},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        try:
            email = request.data.get("email")

            # Delete the PendingRequest instance
            pending_request = PendingRequest.objects.get(email=email)
            pending_request.delete()

            return Response(
                {"msg": "PendingRequest deleted."}, status=status.HTTP_204_NO_CONTENT
            )
        except PendingRequest.DoesNotExist:
            return Response(
                {"error": "PendingRequest not found"}, status=status.HTTP_404_NOT_FOUND
            )


# student login view


class StudentloginView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = StudentloginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get("email")
        password = serializer.data.get("password")
        student = authenticate(request, email=email, password=password)
        try:
            if student.is_student == False:
                return Response(
                    {"errors": {"Present-error": ["Already registered as admin"]}},
                    status=status.HTTP_404_NOT_FOUND,
                )
        except Exception:
            return Response(
                {"error": "Not Found Details"}, status=status.HTTP_404_NOT_FOUND
            )
        if student is not None:
            token = gettokensforstudent(student)
            return Response(
                {"token": token, "msg": "Login Success"}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"errors": {"non_field_errors": ["Email or Password is not Valid"]}},
                status=status.HTTP_404_NOT_FOUND,
            )


class AdminloginView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = AdminloginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get("email")
        password = serializer.data.get("password")
        admin = authenticate(email=email, password=password)
        try:
            if admin.is_student == True:
                return Response(
                    {"errors": {"Present-error": ["Already registered as Student"]}},
                    status=status.HTTP_404_NOT_FOUND,
                )
        except Exception:
            return Response(
                {"error": "Not Found Details"}, status=status.HTTP_404_NOT_FOUND
            )
        if admin is not None:
            token = gettokensforadmin(admin)
            return Response(
                {"token": token, "msg": "Login Success"}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"errors": {"non_field_errors": ["Email or Password is not Valid"]}},
                status=status.HTTP_404_NOT_FOUND,
            )


class AdminRegistrationView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = AdminRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        admin = serializer.save(is_student=False)
        token = gettokensforadmin(admin)
        return Response(
            {"token": token, "msg": "Registartion Successful"},
            status=status.HTTP_201_CREATED,
        )


# student password view


class StudentSendPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        data = {
            "email": request.data.get("email"),
        }
        serializer = StudentSendPasswordResetEmailSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        reset_link = serializer.validated_data["link"]

        return Response(
            {
                "msg": "Password Reset link send. Please check your Email",
                "reset_link": reset_link,
            },
            status=status.HTTP_200_OK,
        )


class StudentPasswordResetView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, sid, token, format=None):
        serializer = StudentPasswordResetSerializer(
            data=request.data, context={"sid": sid, "token": token}
        )
        serializer.is_valid(raise_exception=True)
        return Response(
            {"msg": "Password Reset Successfully"}, status=status.HTTP_200_OK
        )

    # admin password view


class AdminSendPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        data = {
            "email": request.data.get("email"),
        }
        serializer = AdminSendPasswordResetEmailSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        reset_link = serializer.validated_data["link"]

        return Response(
            {
                "msg": "Password Reset link send. Please check your Email",
                "reset_link": reset_link,
            },
            status=status.HTTP_200_OK,
        )


class AdminPasswordResetView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, aid, token, format=None):
        serializer = AdminPasswordResetSerializer(
            data=request.data, context={"aid": aid, "token": token}
        )
        serializer.is_valid(raise_exception=True)
        return Response(
            {"msg": "Password Reset Successfully"}, status=status.HTTP_200_OK
        )


#  view for student metrics:


class AdminDashboardMetricsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            total_students = Student.objects.count()
            present_students = Attendance.objects.filter(
                date=date.today(), status="Present"
            ).count()
            admin_user = request.user
            obj = Admin.objects.filter(email=admin_user).first()
            metrics_data = {
                "admin_name": obj.name,
                "admin_email": admin_user.email,
                "total_students": total_students,
                "present_students": present_students,
                "absent_students": total_students - present_students,
            }
            return Response(metrics_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# Pending student-req view


class PendingRequestManagementSectionView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PendingRequestManagementSectionSerializer
    renderer_classes = [UserRenderer]
    queryset = PendingRequest.objects.all()


# Student Management Section View


class StudentManagementSectionView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentMangementSectionSerializer
    queryset = Student.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "roll_number", "email", "mobile_number"]

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.filter_queryset(self.get_queryset())
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# Attendence section management view

cdformat = "%Y-%m-%d"
class AttendenceManageMentSectionView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AttendanceManagementSectionSerializer

    @method_decorator(
        cache_page(60 * 2)
    )  # Cache the result for 2 minutes, adjust as needed
    def list(self, request, *args, **kwargs):
        try:
            selected_date = self.request.query_params.get(
                "date", datetime.today().strftime(cdformat)
            )
            student_queryset = Student.objects.all()
            queryset = []
            for student_obj in student_queryset:
                name = student_obj.name
                roll = student_obj.roll_number
                email = student_obj.email
                if Attendance.objects.filter(
                    student__email=email, date=selected_date
                ).exists():
                    queryset.append(
                        {
                            "roll_number": roll,
                            "name": name,
                            "email": email,
                            "status": "Present",
                            "date": selected_date,
                        }
                    )
                elif (
                    datetime.strptime(selected_date, cdformat).date()
                    > datetime.now().date()
                    or datetime.strptime(selected_date, cdformat).date()
                    < datetime.strptime(
                        str(student_obj.created_at)[0:10], cdformat
                    ).date()
                ):
                    queryset.append(
                        {
                            "roll_number": roll,
                            "name": name,
                            "email": email,
                            "status": "Not Available",
                            "date": selected_date,
                        }
                    )
                else:
                    queryset.append(
                        {
                            "roll_number": roll,
                            "name": name,
                            "email": email,
                            "status": "Absent",
                            "date": selected_date,
                        }
                    )
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# Student Panel --after login


class StudentAfterLoginPanelView(APIView):
  permission_classes = [IsAuthenticated]

  def get(self, request, *args, **kwargs):
    try:
       
        student_user = get_object_or_404(Student, email=request.user.email)

        present_days = Attendance.objects.filter(student=student_user, status='Present').count()
        absent_days = 0
        obj = Student.objects.filter(email = request.user).first()
        starting_date = obj.created_at
        original_datetime = datetime.strptime(str(starting_date), '%Y-%m-%d %H:%M:%S.%f%z')
        start_date = original_datetime.date()
        end_date = datetime.now().date()
        presentdatelist = []
        for i in Attendance.objects.filter(student=student_user, status='Present'):
          presentdatelist.append(i.date)        
        range_date_list = [start_date + timedelta(days=x) for x in range((end_date - start_date).days + 1)]
        attendencerecord = {}
        for i in range_date_list:
          if i in presentdatelist:
            attendencerecord[str(i)] = "Present"
          else:
            attendencerecord[str(i)] = "Absent" 
            absent_days += 1
        totaldays = present_days + absent_days
        
        student_user = request.user
        metrics_data = {
            'Roll_Number' : obj.roll_number,
            'student_name': obj.name,  
            'student_email': student_user.email,
            'total_days': totaldays, 
            'present_days': present_days,
            'absent_days':  absent_days,
            'attendenceRecord':attendencerecord,
        }

        serializer = StudentAfterLoginPanelSerializer(metrics_data)
        serialized_data = serializer.data

        return Response(serialized_data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# core code generation


class GenerateQRCodeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            student_id = request.user
            timestamp = timezone.now().timestamp()
            data = f"{student_id}_{timestamp}"
            return Response({"data": data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# Filter student_attendence_by_date


class GetAttendenceByDateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            student_user = get_object_or_404(Student, email=request.user.email)
            requested_date_str = self.request.query_params.get("date", None)
            if not requested_date_str:
                return Response(
                    {"error": "Date parameter is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            requested_date = datetime.strptime(requested_date_str, cdformat).date()
            attendance_status = Attendance.objects.filter(
                student=student_user, date=requested_date
            ).first()
            if attendance_status:
                status_text = attendance_status.status
            else:
                student_instance = get_object_or_404(Student, email=str(request.user))
                idcreatedate = student_instance.created_at
                ak = str(idcreatedate)
                idcreatedate = ak[0:10]
                idcreatedate = datetime.strptime(idcreatedate, cdformat).date()
                if (
                    requested_date > datetime.now().date()
                    or requested_date < idcreatedate
                ):
                    status_text = "Not available"
                else:
                    status_text = "Absent"
            response_data = {
                    # 'student_email': request.user.email,
                    "requested_date": requested_date_str,
                    "attendance_status": status_text,
                }

            serializer = StudentAttendenceByDateSerializer(response_data)
            serialized_data = serializer.data

            return Response(serialized_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# Mark Attendence view


class MarkAttendanceDynamicQRView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        qr_code_data = request.data.get("qr_code_data")
        latitude = request.data.get("latitude")
        longitude = request.data.get("longitude")
        try:
            student_email, timestamp = qr_code_data.split("_")
            timestamp = float(timestamp)
            current_timestamp = timezone.now().timestamp()
            if str(student_email) != str(request.user):
                return Response({"error": "Device Error"}, status=400)

            if abs(current_timestamp - timestamp) > 60:  # increase time according
                return Response({"error": "Invalid QR code data."}, status=400)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        student = Student.objects.get(email=student_email)
        if not is_within_geofence(latitude, longitude):
            return Response(
                {"error": "Device is outside from geofence location"}, status=400
            )
        date = timezone.now().date()
        if Attendance.objects.filter(student=student, date=date).exists():
            return Response(
                {"error": "Attendance already marked for today."}, status=400
            )
        Attendance.objects.create(student=student, date=date, status="Present")
        return Response({"msg": "Attendance marked successfully."}, status=200)

class UpdateGeofenceView(APIView):
    def put(self, request, *args, **kwargs):
        try:
            instance = GPS.objects.first()
        except GPS.DoesNotExist:
            return Response({"error": "GPS instance not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = UpdateGeofenceSerializer(instance, data=request.data)
        
        # Validate and save the serializer
        if serializer.is_valid():
            serializer.save()
            return Response({"msg":"success"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)