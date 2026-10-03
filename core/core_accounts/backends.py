from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q

class PhoneOrUsernameBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        if not username or not password:
            return None
        User = get_user_model()
        identifier = username.strip()
        user = User.objects.filter(
            Q(username__iexact=identifier)
            | Q(phone_number=identifier)
            | Q(email__iexact=identifier)
        ).first()
        if user is None:
            User().set_password(password)
            return None
        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None