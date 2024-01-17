from django.urls import path
from .views import *
urlpatterns = [
    path('register/student/', StudentRegistrationView.as_view(), name = 'StudentRegister'),
    path('register/admin/', adminRegistrationView.as_view(), name = 'AdminRegister'),
]

# http://127.0.0.1:8000/api/register/student/