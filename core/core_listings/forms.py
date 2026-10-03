# core_listings/forms.py

from django import forms
from .models import Complex


class ComplexForm(forms.ModelForm):

    class Meta:
        model = Complex

        fields = [
            "complex_name",
            "complex_description",
            "lease_term",
            "sex_restriction",
            "pet_friendly",
            "has_parking_space",
            "min_price",
            "max_price",
        ]

        widgets = {
            "complex_name": forms.TextInput(
                attrs={
                    "placeholder": "e.g. The Grand Residences"
                }
            ),

            "complex_description": forms.Textarea(
                attrs={
                    "placeholder": "Tell renters about your property...",
                    "rows": 4
                }
            ),

            "lease_term": forms.Select(),

            "sex_restriction": forms.Select(),

            "pet_friendly": forms.CheckboxInput(),

            "has_parking_space": forms.CheckboxInput(),

            "min_price": forms.NumberInput(
                attrs={
                    "placeholder": "0",
                    "min": "1",
                    "step": "0.01"
                }
            ),

            "max_price": forms.NumberInput(
                attrs={
                    "placeholder": "0",
                    "min": "1",
                    "step": "0.01"
                }
            ),
        }