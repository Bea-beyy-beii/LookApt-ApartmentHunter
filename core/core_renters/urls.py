# core_renters/urls.py
from django.urls import path
from . import views

app_name = 'core_renters'   

urlpatterns = [
    path('dashboard/', views.dashboard, name='dashboard'),
]