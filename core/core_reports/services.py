from .forms import ReportForm
from .models import Report


def get_reports_context(user):
    reports = (
        Report.objects.filter(reporter=user)
        .select_related("reported_user")
        .order_by("-created_at")
    )

    return {
        "reports": reports,
        "report_form": ReportForm(user=user),
        # picks core_reports/renters/step1.html or core_reports/landlords/step1.html
        "step1_template": f"core_reports/{user.role}s/step1.html",
    }