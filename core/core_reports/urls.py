from django.urls import path
from . import views

app_name = "core.core_reports"

urlpatterns = [
    path("create/", views.create_report, name="create"),
    path("<uuid:pk>/", views.report_detail, name="detail"),
]