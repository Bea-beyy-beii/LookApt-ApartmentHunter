# core/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    readonly_fields = ('user_id',)
    list_display = ('username', 'user_id', 'role', 'is_verified')
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('user_id', 'phone_number', 'sex', 'role', 'is_verified')}),
    )

admin.site.register(User, CustomUserAdmin)