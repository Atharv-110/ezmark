from rest_framework.response import Response
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, ListCreateAPIView
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from .serializers import *
from django.contrib.auth import authenticate
from .renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import date, datetime
# Generate Token Manually
def get_tokens_for_student(student):
  refresh = RefreshToken.for_user(student)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

def get_tokens_for_Admin(admin):
  refresh = RefreshToken.for_user(admin)
  return {
    'refresh': str(refresh),
    'access': str(refresh.access_token),
  }

class StudentRegistrationView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = StudentRegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    pending_request = serializer.save()
    token = get_tokens_for_student(pending_request)
    return Response({'token':token, 'msg':'Registration Successful'}, status=status.HTTP_201_CREATED)

class PendingRequestView(APIView):
  permission_classes = [IsAuthenticated]
  renderer_classes = [UserRenderer]

  def post(self, request, *args, **kwargs):
    serializer = PendingRequestSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']

        # Move the pending request to the Student model
        pending_request = PendingRequest.objects.get(email=email)
        actEmail = pending_request.email
        actName = pending_request.name
        actmobile_numbe = pending_request.mobile_number
        actpassword = pending_request.password
        pending_request.delete()
        Student.objects.create(
            email=actEmail,
            name=actName,
            mobile_number=actmobile_numbe,
            password=actpassword
        )

        # Delete the PendingRequest instance

        return Response({'msg': 'Student approved and details moved to Student table.'}, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, *args, **kwargs):
    try:
        email = request.data.get('email')

        # Delete the PendingRequest instance
        pending_request = PendingRequest.objects.get(email=email)
        pending_request.delete()

        return Response({'msg': 'PendingRequest deleted.'}, status=status.HTTP_204_NO_CONTENT)
    except PendingRequest.DoesNotExist:
        return Response({'error': 'PendingRequest not found'}, status=status.HTTP_404_NOT_FOUND)

# student login view

class StudentloginView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = StudentloginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    password = serializer.data.get('password')
    student = authenticate(email=email, password=password)
    if student is not None:
      token = get_tokens_for_student(student)
      return Response({'token':token, 'msg':'Login Success'}, status=status.HTTP_200_OK)
    else:
      return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)


class AdminloginView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format = None):
    serializer = AdminloginSerializer(data = request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    password = serializer.data.get('password')
    admin = authenticate(email=email, password=password)
    if admin is not None:
      token = get_tokens_for_Admin(admin)
      return Response({'token':token, 'msg':'Login Success'}, status=status.HTTP_200_OK)
    else:
      return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)
  
class adminRegistrationView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = AdminRegistrationSerializer(data = request.data)
    serializer.is_valid(raise_exception=True)
    admin = serializer.save()
    token = get_tokens_for_Admin(admin)
    return Response({'token' : token, 'msg':'Registartion Successful'}, status = status.HTTP_201_CREATED)

# student password view

class StudentSendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    data = {
            'email': request.data.get('email'),
        }
    serializer = StudentSendPasswordResetEmailSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    reset_link = serializer.validated_data['link']
    
    return Response({'msg': 'Password Reset link send. Please check your Email', 'reset_link': reset_link},
                    status=status.HTTP_200_OK)

class StudentPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, sid, token, format=None):
    serializer = StudentPasswordResetSerializer(data=request.data, context={'sid':sid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)
  
  # admin password view
  
class AdminSendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):

    data = {
            'email': request.data.get('email'),
        }
    serializer = AdminSendPasswordResetEmailSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    reset_link = serializer.validated_data['link']
    
    return Response({'msg': 'Password Reset link send. Please check your Email', 'reset_link': reset_link},
                    status=status.HTTP_200_OK)
        

class AdminPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, aid, token, format=None):
    serializer = AdminPasswordResetSerializer(data=request.data, context={'aid':aid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)

#  view for student metrics:

class AdminDashboardMetricsView(APIView):
  permission_classes = [IsAuthenticated]

  def get(self, request, *args, **kwargs):
    try:
        total_students = Student.objects.count()
        present_students = Attendance.objects.filter(date=date.today(), status='Present').count()
        absent_students = Attendance.objects.filter(date=date.today(), status='Absent').count()
        admin_user = request.user
        obj = Admin.objects.filter(email = admin_user).first()

        metrics_data = {
            'admin_name': obj.name,  
            'admin_email': admin_user.email,
            'total_students': total_students,
            'present_students': present_students,
            'absent_students': absent_students,
        }

        return Response(metrics_data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  
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
  search_fields = ['name', 'roll_number', 'email', 'mobile_number']

  def list(self, request, *args, **kwargs):
      try:
          queryset = self.filter_queryset(self.get_queryset())
          serializer = self.get_serializer(queryset, many=True)
          return Response(serializer.data)
      except Exception as e:
          return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Attendence section management view

class AttendenceManageMentSectionView(ListCreateAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = AttendanceManagementSectionSerializer

  @method_decorator(cache_page(60 * 2))  # Cache the result for 2 minutes, adjust as needed
  def list(self, request, *args, **kwargs):
    try:
      selected_date = self.request.query_params.get('date', datetime.today().strftime('%Y-%m-%d'))
      selected_date = datetime.strptime(selected_date, '%Y-%m-%d')
      queryset = Attendance.objects.filter(date=selected_date)
      serializer = self.get_serializer(queryset, many=True)
      return Response(serializer.data)
    except Exception as e:
      return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Student 
