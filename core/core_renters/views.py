from django.views.generic import TemplateView


class HomeView(TemplateView):
    template_name = "core_renters/home.html"

class RentalsView(TemplateView):
    template_name = "core_renters/rentals.html"

class SavedView(TemplateView):
    template_name = "core_renters/saved.html"

class TransactionsView(TemplateView):
    template_name = "core_renters/transactions.html"