from django.core.exceptions import ValidationError
from django.db import transaction
from core.models import User, Renter, Landlord

class AccountService:
    ROLE_PROFILES = {'renter': Renter, 'landlord': Landlord}

    @classmethod
    @transaction.atomic
    def register(cls, first_name, last_name, phone_number, email, sex, role, password):
        if role not in cls.ROLE_PROFILES:
            raise ValidationError("Invalid role.")
        if not password or len(password) < 8:
            raise ValidationError("Password must be at least 8 characters.")
        email = (email or '').strip().lower()
        if User.objects.filter(email__iexact=email).exists():
            raise ValidationError("That email is already registered.")

        user = User(first_name=first_name, last_name=last_name,
                    phone_number=phone_number, email=email, sex=sex, role=role)
        user.full_clean(exclude=['username', 'password'])
        user.set_password(password)
        user.save()
        cls.ROLE_PROFILES[role].objects.create(user=user)
        return user