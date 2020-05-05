from django.contrib import admin

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import GetTogetherUser

admin.site.register(GetTogetherUser, UserAdmin)
