from django.urls import path
from . import views

app_name = "renters"

urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),
    path("rentals/", views.RentalsView.as_view(), name="rentals"),
    path("saved/", views.SavedView.as_view(), name="saved"),
    path("transactions/", views.TransactionsView.as_view(), name="transactions"),
]