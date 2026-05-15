from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone

from apps.sites_config.models import Country
from .models import ContactSubmission


@api_view(["POST"])
@permission_classes([AllowAny])
def submit_contact(request):
    """
    Save contact form submission to DB and send email notification to admin.
    Body: { name, email, phone, service, message, country_code }
    """
    data = request.data

    # Validate required fields
    errors = {}
    for field in ("name", "email", "message"):
        if not data.get(field, "").strip():
            errors[field] = "This field is required."
    if errors:
        return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

    # Resolve country
    country = None
    if data.get("country_code"):
        try:
            country = Country.objects.get(code=data["country_code"].upper(), is_active=True)
        except Country.DoesNotExist:
            pass

    # Get IP
    ip = (
        request.META.get("HTTP_X_FORWARDED_FOR", "").split(",")[0].strip()
        or request.META.get("REMOTE_ADDR")
    )

    # Save submission
    submission = ContactSubmission.objects.create(
        country     = country,
        name        = data["name"].strip(),
        email       = data["email"].strip(),
        phone       = data.get("phone", "").strip(),
        service     = data.get("service", "").strip(),
        message     = data["message"].strip(),
        ip_address  = ip or None,
    )

    # Send email notification to admin (won't crash if email not configured)
    try:
        admin_email = getattr(settings, "ADMIN_EMAIL", None) or settings.EMAIL_HOST_USER
        if admin_email:
            send_mail(
                subject=f"[3 Star] New enquiry from {submission.name}",
                message=(
                    f"Name:    {submission.name}\n"
                    f"Email:   {submission.email}\n"
                    f"Phone:   {submission.phone or '—'}\n"
                    f"Service: {submission.service or '—'}\n"
                    f"Country: {country.name if country else '—'}\n"
                    f"Date:    {submission.submitted_at:%Y-%m-%d %H:%M}\n\n"
                    f"Message:\n{submission.message}"
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[admin_email],
                fail_silently=True,
            )
    except Exception:
        pass  # Never crash the API because of email issues

    return Response(
        {
            "success": True,
            "message": "Your message has been received. We will get back to you within 24 hours.",
            "id": submission.id,
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(["GET"])
@permission_classes([AllowAny])
def contact_health(request):
    return Response({"status": "ok"})
