from django.shortcuts import render

# Create your views here.

def login_view(request):
    return render(request, 'core/login.html')

def signup_view(request):
    return render(request, 'core/signup.html')

def otp_view(request):
    return render(request, 'core/otp.html')