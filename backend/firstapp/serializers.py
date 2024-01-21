from rest_framework import serializers
from .models import Admin, Student, Attendance, User, PendingRequest
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import Util

class StudentRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    
    class Meta:
        model = PendingRequest 
        fields = ['email', 'name', 'mobile_number', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password don't match")
        return attrs

    def create(self, validated_data):
      validated_data.pop('password2', None)
      return PendingRequest.objects.create_user(**validated_data)

class PendingRequestSerializer(serializers.Serializer):
  email = serializers.EmailField()

  def validate(self, data):
      email = data.get('email')

      if not PendingRequest.objects.filter(email=email).exists():
          raise serializers.ValidationError('PendingRequest not found for the given email.')

      return data

  def create(self, validated_data):
      # Create a new Student instance with the data from PendingRequest
      student_serializer = StudentRegistrationSerializer(data=validated_data)
      if student_serializer.is_valid():
          student = student_serializer.save()

          # Delete the PendingRequest instance
          self.instance.delete()

          return student
      else:
          raise serializers.ValidationError(student_serializer.errors)
        
class StudentloginSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(max_length = 255)
  class Meta:
    model = Student
    fields = ['email', 'password']
  
class AdminloginSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(max_length = 255)
  class Meta:
    model = Admin 
    fields = ['email', 'password']
  

class AdminRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    
    class Meta:
        model = Admin
        fields = ['email', 'name', 'mobile_number', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password don't match")
        return attrs

    def create(self, validated_data):
      validated_data.pop("password2", None)
      return Admin.objects.create_user(**validated_data)
    
class StudentSendPasswordResetEmailSerializer(serializers.Serializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    model = Student
    fields = ['email']

  def validate(self, attrs):
    email = attrs.get('email')
    if Student.objects.filter(email=email).exists():    
      student = Student.objects.get(email = email)
      
      sid = urlsafe_base64_encode(force_bytes(student.roll_number))
      # print(sid)
      token = PasswordResetTokenGenerator().make_token(student)
      link = 'http://localhost:5173/reset-password/'+sid+'/'+token
      body = 'Click Following Link to Reset Your Password '+link
      data = {
        'subject':'Reset Your Password',
        'body':body,
        'to_email':student.email
      }
      Util.send_email(data)
      attrs['link'] = link
      return attrs
    else:
      raise serializers.ValidationError('You are not a Registered User')

class StudentPasswordResetSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    model = Student
    fields = ['password', 'password2']

  def validate(self, attrs):
    try:
      password = attrs.get('password')
      password2 = attrs.get('password2')
      sid = self.context.get('sid')
      # print("sid: ",sid, type(sid))
      token = self.context.get('token')
      # print("token:", token, type(token))
      if password != password2:
        raise serializers.ValidationError("Password and Confirm Password doesn't match")
      
      roll_number = smart_str(urlsafe_base64_decode(sid))
      print("roll no : ",roll_number)
      # for i in id:
      #   print("id is:", id)
      # print("id after decoded: ",id)
      student = Student.objects.get(roll_number=roll_number)
      if not PasswordResetTokenGenerator().check_token(student, token):
        raise serializers.ValidationError('Token is not Valid or Expired')
      student.set_password(password)
      student.save()
      return attrs
    except DjangoUnicodeDecodeError as identifier:
      PasswordResetTokenGenerator().check_token(student, token)
      raise serializers.ValidationError('Token is not Valid or Expired')


# ADMIN CHECK PASSWORD VALIDITY
   
class AdminSendPasswordResetEmailSerializer(serializers.Serializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    model = Admin
    fields = ['email']

  def validate(self, attrs):
    email = attrs.get('email')
    if Admin.objects.filter(email=email).exists():    
      admin = Admin.objects.get(email = email)
      
      aid = urlsafe_base64_encode(force_bytes(admin.admin_id))
      # print(sid)
      token = PasswordResetTokenGenerator().make_token(admin)
      link = 'http://localhost:5173/reset-password/'+aid+'/'+token
      body = 'Click Following Link to Reset Your Password '+link
      data = {
        'subject':'Reset Your Password',
        'body':body,
        'to_email':admin.email
      }
      Util.send_email(data)
      attrs['link'] = link
      return attrs
    else:
      raise serializers.ValidationError('You are not a Registered User')

class AdminPasswordResetSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    model = Admin
    fields = ['password', 'password2']

  def validate(self, attrs):
    try:
      password = attrs.get('password')
      password2 = attrs.get('password2')
      aid = self.context.get('aid')
      # print("aid: ",aid, type(aid))
      token = self.context.get('token')
      # print("token:", token, type(token))
      if password != password2:
        raise serializers.ValidationError("Password and Confirm Password doesn't match")
      
      admin_id = smart_str(urlsafe_base64_decode(aid))
      print("admin id : ",admin_id)
      # for i in id:
      #   print("id is:", id)
      # print("id after decoded: ",id)
      admin = Admin.objects.get(admin_id = admin_id)
      if not PasswordResetTokenGenerator().check_token(admin, token):
        raise serializers.ValidationError('Token is not Valid or Expired')
      admin.set_password(password)
      admin.save()
      return attrs
    except DjangoUnicodeDecodeError as identifier:
      PasswordResetTokenGenerator().check_token(admin, token)
      raise serializers.ValidationError('Token is not Valid or Expired')
    
# pending-req management section
class PendingRequestManagementSectionSerializer(serializers.ModelSerializer):
  class Meta:
    model = PendingRequest
    fields = ["name", "email", "mobile_number", "created_at"]
    

# student management section
class StudentMangementSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['roll_number', 'email', 'name', 'mobile_number']
        
# Attendence management section
class AttendanceManagementSectionSerializer(serializers.ModelSerializer):
  roll_number = serializers.ReadOnlyField(source='student.roll_number')
  name = serializers.ReadOnlyField(source='student.name')

  class Meta:
      model = Attendance
      fields = ['roll_number', 'name', 'date', 'status']
