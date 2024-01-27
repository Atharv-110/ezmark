from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, email, name, mobile_number, password, **extra_fields):
        """
        Creates and saves a User with the given email, name, mobile_number, and hashed_password.
        """
        if not email:
            raise ValueError('User must have an email address')
        
        user = self.model(
            email=self.normalize_email(email),
            name=name,
            mobile_number=mobile_number,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, mobile_number, password):
        """
        Creates and saves a superuser with the given email, name, mobile_number, and hashed_password.
        """
        user = self.create_user(
            email,
            name=name,
            mobile_number=mobile_number,
            hashed_password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=200)
    mobile_number = models.CharField(max_length=15) 
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_student = models.BooleanField(default = True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'mobile_number']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin
    
class PendingRequest(User):
    STATUS_CHOICES = [
        ('Decline', 'Decline'),
        ('Approve', 'Approve'),
    ]
    status = models.CharField(max_length=7, choices=STATUS_CHOICES, default="decline")
    
class Admin(User):
    admin_id = models.AutoField(primary_key=True)

class Student(User):
    roll_number = models.AutoField(primary_key=True)

class Attendance(models.Model):
    attendance_id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField()
    STATUS_CHOICES = [
        ('Present', 'Present'),
        ('Absent', 'Absent'),
    ]
    status = models.CharField(max_length=7, choices=STATUS_CHOICES, default="Absent")
    created_at = models.DateTimeField(auto_now_add=True)
    
