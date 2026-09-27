from django.urls import path
from . import views

app_name = "core_inquiries"

urlpatterns = [
    path("inquiries/", views.inquiries, name="inquiries"),
]