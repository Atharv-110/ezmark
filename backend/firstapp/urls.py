from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
    path('register/student/', StudentRegistrationView.as_view(), name = 'StudentRegister'),
    path('register/admin/', adminRegistrationView.as_view(), name = 'AdminRegister'),
    path('login/student/',StudentloginView.as_view(), name = "Studentlogin"),
    path('login/admin/',AdminloginView.as_view(), name = "Adminlogin"),
    path('student/pending-requests/', PendingRequestView.as_view(), name='pending-requests'),
    path('student/request-management-section/',PendingRequestManagementSectionView.as_view(), name = "request-management-section"),
    path('reset/password/student/',StudentSendPasswordResetEmailView.as_view(), name = "StudentSendEmail"),
    path('reset-password-student/<sid>/<token>/', StudentPasswordResetView.as_view(), name='Student-reset-password'),
    path('reset/password/admin/',AdminSendPasswordResetEmailView.as_view(), name = "AdminSendEmail"),
    path('reset-password-admin/<aid>/<token>/', AdminPasswordResetView.as_view(), name='Admin-reset-password'),
    path('dashboard/admin/metrics/', AdminDashboardMetricsView.as_view(), name='admin-dashboard-metrics'),
    path('dashboard/admin/student-section/', StudentManagementSectionView.as_view(), name = "Student-management-section"),
    path('dashboard/admin/attendance-management/', AttendenceManageMentSectionView.as_view(), name='attendance-management-section'),
    
]


# http://127.0.0.1:8000/api/register/student/