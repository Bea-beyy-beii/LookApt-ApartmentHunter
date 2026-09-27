# core_landlords/urls.py
from django.urls import path
from . import views

app_name = 'core_landlords'   

urlpatterns = [
    path('dashboard/', views.dashboard, name='dashboard'),
]