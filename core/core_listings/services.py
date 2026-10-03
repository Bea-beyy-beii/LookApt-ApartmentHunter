# core_listings/services.py
from core.models import Landlord   
from .models import Complex
from .forms import ComplexForm


def get_listings_context(user):
    landlord = user.landlord
    properties = Complex.objects.filter(landlord=landlord)

    return {
        "properties": properties,
        "form": ComplexForm(),
        "property": None,
        "current_step": 1,
    }