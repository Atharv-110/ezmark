from django.urls import path
from .views import (
    StudentRegistrationView,
    adminRegistrationView,
    StudentloginView,
    AdminloginView,   
    PendingRequestView,
    PendingRequestManagementSectionView,
    StudentSendPasswordResetEmailView,
    StudentPasswordResetView,
    AdminSendPasswordResetEmailView,
    AdminPasswordResetView,
    AdminDashboardMetricsView,
    StudentManagementSectionView,
    AttendenceManageMentSectionView,
    StudentAfterLoginPanelView,
    GenerateQRCodeView,
    MarkAttendanceDynamicQRView,
    GetAttendenceByDateView
)
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

"""
Base url = "http://127.0.0.1:8000/api/" means in order to hit the API u have a base url followed
by bellow url

1) The first end point takes refersh token as in the form of json and i will send 
    access token which will valid for 20 min
    method -> POST 
    Data look-like which Come from front-end in json format = {
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNTczNzU3NiwiaWF0IjoxNzA1NjUxMTc2LCJqdGkiOiJkZWJlNDVkOGRiNDg0MzA5OWM4NDVjYjVhMTc4MTAyMCIsInVzZXJfaWQiOjl9.Vn-gYVc8HF9VKhg9cFQkYzqgBQKaBSKreL_mg4Fq_t4"
    }
    response look-like = {
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA1NjUyOTc1LCJpYXQiOjE3MDU2NTExNzYsImp0aSI6IjcwMzUzMzg0NDhkZTRjNmY4YjkzNDVjY2ViZDIzOTk0IiwidXNlcl9pZCI6OX0.x2gHnBc4mAAkvO0k5_d67j80MPpKLfv4ywDiAY82oos"
    }
    end-points = http://127.0.0.1:8000/api/token/refresh/

2) The second end point is use to register Student-data it will take json data
    i will send a response of success or error
    method -> POST
    data look-like which comes from front-end in json fromat = {
    "email":"abhishek8649@gmail.com",
    "name":"abhishek",
    "mobile_number":"8888888888",
    "password":"abc",
    "password2":"abc"
    }
    response look-like = {
    "msg": "Registration Successful"
    end-points = http://127.0.0.1:8000/api/register/student/
    
3) The third end point is use to register Admin-data it will take json data
    i will send a response of success or error
    method -> POST
    data look-like which comes from front-end in json fromat = {
    "email":"abhishek8649@gmail.com",
    "name":"abhishek",
    "mobile_number":"8888888888",
    "password":"abc",
    "password2":"abc"
    }
    response look-like = {
    "msg": "Registration Successful"
    end-points = http://127.0.0.1:8000/api/register/admin/
    
4) The fourth api used for login student t will take json data
    i will send a response of success or error
    method -> POST
    data look-like which comes from front-end in json fromat = {
    "email":"abhishek8649@gmail.com",
    "password":"abc"
    }
    response look-like = {
    "token": {
        "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNTgxNDI3MiwiaWF0IjoxNzA1NzI3ODcyLCJqdGkiOiJkMzIxZDgzYTAyNjE0NDkwOTliMTBkNjdiYjU4OTAwYyIsInVzZXJfaWQiOjE3fQ.MOeOKY5E8__1TvAJaDRFHANAKzsIGm3yZXwYxKdplA8",
        "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA1NzM1MDcyLCJpYXQiOjE3MDU3Mjc4NzIsImp0aSI6ImRhMjE2ZGM4ODdkZjRiY2M5NzE4OWFiN2NlY2M2ZjQ4IiwidXNlcl9pZCI6MTd9.aW3VKNxY_mSzHlJYTcZ8sBEyzqOChDwaqxoyBVofVUc"
    },
    "msg": "Login Success"
    }
    so in this i will send two token refersh and access which u need to store in local stroage 
    and access token will expire in every 20 min u will send a post request on first api, which
    i already mentioned in first point fand urther sended from frontend for any access of internal
    thing.
    End-point : http://127.0.0.1:8000/api/login/student/

5) The Fifth api used for login Admin it will take json data
    i will send a response of success or error
    method -> POST
    
    data look-like which comes from front-end in json fromat = {
    "email":"abhishek8649@gmail.com",
    "password":"abc"
    }
    
    response look-like = {
    "token": {
        "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNTgxNDI3MiwiaWF0IjoxNzA1NzI3ODcyLCJqdGkiOiJkMzIxZDgzYTAyNjE0NDkwOTliMTBkNjdiYjU4OTAwYyIsInVzZXJfaWQiOjE3fQ.MOeOKY5E8__1TvAJaDRFHANAKzsIGm3yZXwYxKdplA8",
        "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA1NzM1MDcyLCJpYXQiOjE3MDU3Mjc4NzIsImp0aSI6ImRhMjE2ZGM4ODdkZjRiY2M5NzE4OWFiN2NlY2M2ZjQ4IiwidXNlcl9pZCI6MTd9.aW3VKNxY_mSzHlJYTcZ8sBEyzqOChDwaqxoyBVofVUc"
    },
    "msg": "Login Success"
    }
    
    so in this i will send two token refersh and access which u need to store in local stroage 
    and access token will expire in every 20 min u will send a post request on first api, which
    i already mentioned in first point access further sended from frontend for any access of internal
    thing.
    
    End-point: http://127.0.0.1:8000/api/login/admin/
    
6) THe Sixth Api is used to get the details of pending student it does't require any json data
    but in order to get the this restricted data u must need to send the access token which u will 
    get at the time of login 
    method -> Get
    
    response look-like : [
    {
        "name": "abhishek",
        "email": "fjdfj@gmail.com",
        "mobile_number": "8888888888",
        "created_at": "2024-01-19T19:28:19.792421Z"
    }
    ]
    
    if no any pending req:
    response look-like : []
    End-point : http://127.0.0.1:8000/api/student/request-management-section/

7) The Seventh APi is used to Approve or decline the request of pending student so it will take 
   email of that partical student and if admin approve u have to send post along with email and else
   delete request along with email. it also need access token to varify admin so also have to send
   access token. 
   
   method -> POST/DELETE
   data look-like which comes from front-end in json fromat = {
   "email":"abhishek8649@gmail.com",
   }
   
   if sended email found and u have sended DELETE REQ
   respone look-like {
    "msg": "PendingRequest deleted."
   }
   
   if sended email not found u have sended DELETE REQ
   respone look-like {
    "msg": "PendingRequest deleted."
   }
   
   if sended email found and u have send POST REQ
   respone look-like {
    "msg": "Student approved and details moved to Student table."
    }
    
   if sended email not not found u have sended POST REQ
   {
    "errors": {
        "non_field_errors": [
            "PendingRequest not found for the given email."
        ]
    }
    }
    End-point : http://127.0.0.1:8000/api/student/pending-requests/

8) The Eighth Api is used to send reset password link it will take email in json and send 
    u the reset link as response and reset link will also sended to user email
    
    Method -> POST
    data look-like which comes from front-end in json fromat = {
    "email":"abhishek8649@gmail.com",
    }
    
    response look-like if email already registered: {
    "msg": "Password Reset link send. Please check your Email",
    "reset_link": "http://localhost:3000/api/user/reset/OA/c1375y-e1a48e9e3ab2667bf5dcd27e8a60f4b4"
    }
    
    response look-like if email not found : {
    "errors": {
        "non_field_errors": [
            "You are not a Registered User"
        ]
    }
    }

    End-point : http://127.0.0.1:8000/api/reset/password/student/
    
9)  The Ninth Api it will take json Data Passowrd and confirm Passwod and the base
    url followed by tokens

    Method -> POST
    
    data look-like which comes from front-end in json fromat = {
    "msg": "Password Reset Successfully"
    }                                                           
                                                                 ----------------------token----------------
    End-point : http://127.0.0.1:8000/api/reset-password-student/MTA/c137vg-e0d3b0a16bdf34e4ca2d08f29c69249b/
    
10) Follow same process as 8

11) Follow Same process as 9

12) The  Tweleve api is used to get the panel data when a admin login and date which need just
    after login can retrived from this api. it require access to authenticate 
    
    Method -> GET
    
    data look-like which comes from front-end in json fromat = {
    "admin_name": "ak",
    "admin_email": "bhish8649@gmail.com",
    "total_students": 4,
    "present_students": 0,
    "absent_students": 0
    }
    End-point : http://127.0.0.1:8000/api/dashboard/admin/metrics/

13) The Thirteen Api is used to use to retrive data of students it also require to validate the admin
    
    Method -> GET
    data look-like which comes from front-end in json fromat = [
    {
        "roll_number": 1,
        "email": "sinha6031!@gmail.com",
        "name": "A. K. Sinha",
        "mobile_number": "1122334455"
    },
    {
        "roll_number": 8,
        "email": "abhishek8649@gmail.com",
        "name": "abhishek",
        "mobile_number": "8888888888"
    }]                  
                                                                         --optional for seraching--
    End-point : http://127.0.0.1:8000/api/dashboard/admin/student-section/ + ?search=abhishek

14) The Fourteen APi is used to get the attendence status of student it also need access in header
    method -> GET
    response Look-like = [
    {
        "roll_number": 1,
        "name": "A. K. Sinha",
        "date": "2024-01-18",
        "status": "Present"
    }
    ]         
                                                                               ---not optional--
    End-point : http://127.0.0.1:8000/api/dashboard/admin/attendance-management/?date=2024-01-18   
    -> if u have to know today status then u have to send todays date 

15)  
    
16) This is Sixteen Api's where a u have to send where u have to send a get request
    with jwt token i will send u a token which specifically for that student u have to set
    token behind the qr u have to send the get req in every minute i will send u token
    
    Method -> GET
    
    response look-like = {
        "data": "abhishek8649@gmail.com_1705816414.263241"
    }
    u have to set this token behind qr.
    
    end-points - http://127.0.0.1:8000/api/student/generate-qr-code/

17) This is Seventeen Apis where u have to send logitude latitude and data which is student will get
    from qr code. u have to send access token
    -> i will check three thing whether both id is same
    -> i will check the time limit 
    -> i will check geofence location
    
    Method -> Post
    
    data look-like which comes from front-end in json fromat = {
    "qr_code_data":"abhishek8649@gmail.com_1705816414.263241",
    "latitude":"22.6045241",
    "longitude":"75.6855326"
    }
    
    response look-like if all ok={
    {
    "msg": "Attendance marked successfully."
    }
    
    response look like if its different user= {
    "error": "Device Error"
    }

    response look like if it is not in geofence = {
    "error": "Device is outside from geofence location"
    }
    
    response look -like if attendence already marked = {
    "error": "Attendance already marked for today."
    }
    
18)  
"""

urlpatterns = [
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), #1
    path('register/student/', StudentRegistrationView.as_view(), name = 'StudentRegister'), #2
    path('register/admin/', adminRegistrationView.as_view(), name = 'AdminRegister'),   #3
    path('login/student/',StudentloginView.as_view(), name = "Studentlogin"),      #4
    path('login/admin/',AdminloginView.as_view(), name = "Adminlogin"),      #5
    path('student/pending-requests/', PendingRequestView.as_view(), name='pending-requests'),  #6
    path('student/request-management-section/',PendingRequestManagementSectionView.as_view(), name = "request-management-section"),  #7
    path('reset/password/student/',StudentSendPasswordResetEmailView.as_view(), name = "StudentSendEmail"),  #8
    path('reset-password-student/<sid>/<token>/', StudentPasswordResetView.as_view(), name='Student-reset-password'),   #9
    path('reset/password/admin/',AdminSendPasswordResetEmailView.as_view(), name = "AdminSendEmail"),  #10
    path('reset-password-admin/<aid>/<token>/', AdminPasswordResetView.as_view(), name='Admin-reset-password'),  #11
    path('dashboard/admin/metrics/', AdminDashboardMetricsView.as_view(), name='admin-dashboard-metrics'),  #12
    path('dashboard/admin/student-section/', StudentManagementSectionView.as_view(), name = "Student-management-section"),  #13
    path('dashboard/admin/attendance-management/', AttendenceManageMentSectionView.as_view(), name='attendance-management-section'),  #14
    path('student/dashboard/', StudentAfterLoginPanelView.as_view(), name = "student-login-view"),    #15
    path('student/generate-qr-code/', GenerateQRCodeView.as_view(), name='generate-qr-code'),     #16
    path('student/MarkAttendanceDynamicQRView/',MarkAttendanceDynamicQRView.as_view(), name = "Mark-Attendance-Dynamic"),  #17
    path('student/get-attendence-by-date/',GetAttendenceByDateView.as_view(), name="get_attendence_by_date")  #18
]
