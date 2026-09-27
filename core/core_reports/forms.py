from django import forms
from django.contrib.auth import get_user_model

from .models import Report, RENTER_CATEGORIES, LANDLORD_CATEGORIES

User = get_user_model()


class ReportForm(forms.ModelForm):
    class Meta:
        model = Report
        fields = ["category", "other_category_text", "reported_user", "description"]
        widgets = {
            "description": forms.Textarea(attrs={"maxlength": 500}),
        }

    def __init__(self, *args, user=None, **kwargs):
        super().__init__(*args, **kwargs)

        if user is None:
            raise ValueError("ReportForm requires a user to know which role's choices to use.")

        if user.role == "renter":
            self.fields["category"].choices = RENTER_CATEGORIES
            self.fields["reported_user"].queryset = User.objects.filter(role="landlord")
            self.fields["reported_user"].label = "Select the landlord"
        else:
            self.fields["category"].choices = LANDLORD_CATEGORIES
            self.fields["reported_user"].queryset = User.objects.filter(role="renter")
            self.fields["reported_user"].label = "Select the renter"

    def clean(self):
        cleaned_data = super().clean()
        category = cleaned_data.get("category")
        other_text = cleaned_data.get("other_category_text")

        if category == "others" and not other_text:
            self.add_error("other_category_text", "Please specify your reason.")

        return cleaned_data