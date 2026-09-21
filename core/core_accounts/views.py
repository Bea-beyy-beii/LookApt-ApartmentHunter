from django.shortcuts import render

# Create your views here.

def login_view(request):
    return render(request, 'core_accounts/login.html')

def signup_view(request):
    return render(request, 'core_accounts/signup.html')

def otp_view(request):
    return render(request, 'core_accounts/otp.html')