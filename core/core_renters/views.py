# core_renters/views.py
from django.shortcuts import render

def dashboard(request):
    active_tab = request.GET.get('tab', 'home')
    return render(request, 'core_renters/renter_dashboard.html', {'active_tab': active_tab})