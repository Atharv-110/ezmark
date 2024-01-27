from rest_framework import serializers
from .models import Admin, Student, Attendance, User, PendingRequest
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import Util

msg = "Token is not Valid or Expired"

class StudentRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = PendingRequest
        fields = ["email", "name", "mobile_number", "password", "password2"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")
        if password != password2:
            raise serializers.ValidationError(
                "Password and Confirm Password don't match"
            )
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2", None)
        return PendingRequest.objects.create_user(**validated_data)


class PendingRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, data):
        email = data.get("email")
        if not PendingRequest.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                "PendingRequest not found for the given email."
            )
        return data

    def create(self, validated_data):
        student_serializer = StudentRegistrationSerializer(data=validated_data)
        if student_serializer.is_valid():
            student = student_serializer.save()
            self.instance.delete()
            return student
        else:
            raise serializers.ValidationError(student_serializer.errors)


class StudentloginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = Student
        fields = ["email", "password"]


class AdminloginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = Admin
        fields = ["email", "password"]


class AdminRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = Admin
        fields = ["email", "name", "mobile_number", "password", "password2"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")
        if password != password2:
            raise serializers.ValidationError(
                "Password and Confirm Password don't match"
            )
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2", None)
        return Admin.objects.create_user(**validated_data)


class StudentSendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = Student
        fields = ["email"]

    def validate(self, attrs):
        email = attrs.get("email")
        if Student.objects.filter(email=email).exists():
            student = Student.objects.get(email=email)

            sid = urlsafe_base64_encode(force_bytes(student.roll_number))
            # print(sid)
            token = PasswordResetTokenGenerator().make_token(student)
            link = "https://ezmark.vercel.app/reset-password-student/" + sid + "/" + token
            body = "Click Following Link to Reset Your Password " + link
            data = {
                "subject": "Reset Your Password",
                "body": body,
                "to_email": student.email,
            }
            Util.send_email(data)
            attrs["link"] = link
            return attrs
        else:
            raise serializers.ValidationError("You are not a Registered User")


class StudentPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=255, style={"input_type": "password"}, write_only=True
    )
    password2 = serializers.CharField(
        max_length=255, style={"input_type": "password"}, write_only=True
    )

    class Meta:
        model = Student
        fields = ["password", "password2"]

    def validate(self, attrs):
        try:
            password = attrs.get("password")
            password2 = attrs.get("password2")
            sid = self.context.get("sid")
            # print("sid: ",sid, type(sid))
            token = self.context.get("token")
            # print("token:", token, type(token))
            if password != password2:
                raise serializers.ValidationError(
                    "Password and Confirm Password doesn't match"
                )

            roll_number = smart_str(urlsafe_base64_decode(sid))
            print("roll no : ", roll_number)
            student = Student.objects.get(roll_number=roll_number)
            if not PasswordResetTokenGenerator().check_token(student, token):
                raise serializers.ValidationError(msg)
            student.set_password(password)
            student.save()
            return attrs
        except DjangoUnicodeDecodeError:
            PasswordResetTokenGenerator().check_token(student, token)
            raise serializers.ValidationError(msg)


# ADMIN CHECK PASSWORD VALIDITY


class AdminSendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = Admin
        fields = ["email"]

    def validate(self, attrs):
        email = attrs.get("email")
        if Admin.objects.filter(email=email).exists():
            admin = Admin.objects.get(email=email)

            aid = urlsafe_base64_encode(force_bytes(admin.admin_id))
            # print(sid)
            token = PasswordResetTokenGenerator().make_token(admin)
            link = "https://ezmark.vercel.app/reset-password/" + aid + "/" + token
            body = "Click Following Link to Reset Your Password " + link
            data = {
                "subject": "Reset Your Password",
                "body": body,
                "to_email": admin.email,
            }
            Util.send_email(data)
            attrs["link"] = link
            return attrs
        else:
            raise serializers.ValidationError("You are not a Registered User")


class AdminPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=255, style={"input_type": "password"}, write_only=True
    )
    password2 = serializers.CharField(
        max_length=255, style={"input_type": "password"}, write_only=True
    )

    class Meta:
        model = Admin
        fields = ["password", "password2"]

    def validate(self, attrs):
        try:
            password = attrs.get("password")
            password2 = attrs.get("password2")
            aid = self.context.get("aid")
            token = self.context.get("token")
            if password != password2:
                raise serializers.ValidationError(
                    "Password and Confirm Password doesn't match"
                )

            admin_id = smart_str(urlsafe_base64_decode(aid))
            admin = Admin.objects.get(admin_id=admin_id)
            if not PasswordResetTokenGenerator().check_token(admin, token):
                raise serializers.ValidationError(msg)
            admin.set_password(password)
            admin.save()
            return attrs
        except DjangoUnicodeDecodeError:
            PasswordResetTokenGenerator().check_token(admin, token)
            raise serializers.ValidationError(msg)


# pending-req management section
class PendingRequestManagementSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PendingRequest
        fields = ["name", "email", "mobile_number", "created_at"]


# student management section
class StudentMangementSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["roll_number", "email", "name", "mobile_number"]


# Attendence management section
class AttendanceManagementSectionSerializer(serializers.ModelSerializer):
    roll_number = serializers.IntegerField()
    name = serializers.CharField()
    email = serializers.CharField()

    class Meta:
        model = Attendance
        fields = ["roll_number", "name", "email", "status", "date"]


# StudentAfterLoginPanelView
class StudentAfterLoginPanelSerializer(serializers.Serializer):
    Roll_Number = serializers.IntegerField()
    student_name = serializers.CharField()
    student_email = serializers.EmailField()
    total_days = serializers.IntegerField()
    present_days = serializers.IntegerField()
    absent_days = serializers.IntegerField()
    attendenceRecord = serializers.DictField()

    def to_representation(self, instance):
        return {
            "Roll_Number": instance["Roll_Number"],
            "student_name": instance["student_name"],
            "student_email": instance["student_email"],
            "total_days": instance["total_days"],
            "present_days": instance["present_days"],
            "absent_days": instance["absent_days"],
            "attendenceRecord": instance["attendenceRecord"],
        }


class StudentAttendenceByDateSerializer(serializers.Serializer):
    requested_date = serializers.DateField()
    attendance_status = serializers.CharField()

    def to_representation(self, instance):
        return {
            "requested_date": instance["requested_date"],
            "attendance_status": instance["attendance_status"],
        }
