from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Admin, Student, Attendance, PendingRequest

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'name', 'mobile_number', 'is_admin', 'created_at', 'updated_at')
    search_fields = ('email', 'name')
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('name', 'mobile_number')}),
        ('Permissions', {'fields': ('is_admin', 'is_active')}),
        ('Important dates', {'fields': ('created_at', 'updated_at')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'mobile_number', 'password1', 'password2'),
        }),
    )

    filter_horizontal = ()
    list_filter = ('is_admin', 'is_active')
    ordering = ('email',)

admin.site.register(User, CustomUserAdmin)
admin.site.register(PendingRequest)
admin.site.register(Admin)
admin.site.register(Student)
admin.site.register(Attendance)
