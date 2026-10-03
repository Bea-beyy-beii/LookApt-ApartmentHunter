from django.http import Http404

class HideAdminMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith('/lookapt-manage/'):
            user = request.user
            if not (user.is_authenticated and user.is_staff):
                raise Http404
        return self.get_response(request)