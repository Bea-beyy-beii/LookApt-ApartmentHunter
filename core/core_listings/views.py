# core_listings/views.py
from django.shortcuts import render, redirect, get_object_or_404

from .models import Complex, ComplexPicture, Unit
from .forms import ComplexForm


def listings(request):
    properties = Complex.objects.all()

    status = request.GET.get("status")

    if status:
        properties = properties.filter(status=status)

    context = {
        "properties": properties,
        "current_filter": status,
    }

    return render(
        request,
        "core_listings/landlords/listings.html",
        context
    )


def property_create(request):
    if request.method == "POST":
        form = ComplexForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect("core_listings:listings")

    else:
        form = ComplexForm()

    return render(
        request,
        "core_listings/landlords/forms/property_form.html",
        {
            "property": None,
            "current_step": 1,
            "form": form,
        }
    )



def property_detail(request, pk):
    property_obj = get_object_or_404(
        Complex,
        pk=pk
    )

    active_tab = request.GET.get(
        "tab",
        "overview"
    )

    return render(
        request,
        "core_listings/landlords/property_detail.html",
        {
            "property": property_obj,
            "active_tab": active_tab,
        }
    )


def property_edit(request, pk):
    property_obj = get_object_or_404(Complex, pk=pk)

    if request.method == "POST":
        form = ComplexForm(request.POST, instance=property_obj)
        if form.is_valid():
            form.save()
            return redirect("core_listings:listings")
    else:
        form = ComplexForm(instance=property_obj)

    return render(
        request,
        "core_listings/landlords/forms/property_form.html",
        {
            "property": property_obj,
            "current_step": 1,
            "form": form,
        }
    )


def unit_detail(request, pk):
    unit = get_object_or_404(
        Unit,
        pk=pk
    )

    return render(
        request,
        "core_listings/landlords/unit_detail.html",
        {
            "unit": unit,
        }
    )