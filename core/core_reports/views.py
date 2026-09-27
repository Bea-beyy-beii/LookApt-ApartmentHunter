from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse

from .forms import ReportForm
from .models import Report, ReportEvidence

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB, matches your UI text
ALLOWED_TYPES = {"image/png", "image/jpeg", "application/pdf"}


def get_reports_context(user):
    """Called by the renters/landlords dashboard view when tab == 'reports'.
    Keeps the query in one place so both roles share it."""
    reports = (
        Report.objects.filter(reporter=user)   # only THEIR reports
        .select_related("reported_user")       # avoids one query per card
        .order_by("-created_at")
    )
    return {
        "reports": reports,
        "report_form": ReportForm(user=user),
        # picks renters/step1.html or landlords/step1.html
        "step1_template": f"core_reports/{user.role}s/step1.html",
    }


def _validate_files(files):
    """Server-side check; never trust the JS check alone."""
    errors = []
    for f in files:
        if f.size > MAX_FILE_SIZE:
            errors.append(f"{f.name} is larger than 10 MB.")
        if f.content_type not in ALLOWED_TYPES:
            errors.append(f"{f.name} must be PNG, JPG, or PDF.")
    return errors


@login_required
def create_report(request):
    dashboard_url = reverse(f"{request.user.role}s:dashboard")  # adjust to your url names
    back = f"{dashboard_url}?tab=reports"

    if request.method != "POST":
        return redirect(back)

    form = ReportForm(request.POST, user=request.user)
    files = request.FILES.getlist("evidence")
    file_errors = _validate_files(files)

    if form.is_valid() and not file_errors:
        # atomic: if saving a file fails, the report isn't left half-created
        with transaction.atomic():
            report = form.save(commit=False)
            report.reporter = request.user   # set here, never from the form
            report.save()
            for f in files:
                ReportEvidence.objects.create(report=report, file=f)
        messages.success(request, "Your report has been submitted.")
    else:
        for e in file_errors:
            messages.error(request, e)
        for field_errors in form.errors.values():
            for e in field_errors:
                messages.error(request, e)

    return redirect(back)


@login_required
def report_detail(request, pk):
    # Filtering by reporter means someone else's report returns 404,
    # so you don't leak that the id exists.
    report = get_object_or_404(Report, pk=pk, reporter=request.user)
    return render(request, "core_reports/shared/report_detail.html", {"report": report})