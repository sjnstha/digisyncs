from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Translation
from apps.sites_config.models import Country


@api_view(["GET"])
@permission_classes([AllowAny])
def translation_dict(request):

    language = request.query_params.get(
        "language",
        "en"
    ).lower()

    country_code = request.query_params.get(
        "country",
        ""
    ).upper()

    country = None

    if country_code:
        country = Country.objects.filter(
            code=country_code,
            is_active=True
        ).first()

    result = {}

    # -----------------------------------------
    # English global fallback
    # -----------------------------------------

    english_qs = Translation.objects.filter(
        language="en",
        country__isnull=True
    ).only("key", "value")

    for item in english_qs:
        result[item.key] = item.value

    # -----------------------------------------
    # Requested language global
    # -----------------------------------------

    global_qs = Translation.objects.filter(
        language=language,
        country__isnull=True
    ).only("key", "value")

    for item in global_qs:
        result[item.key] = item.value

    # -----------------------------------------
    # Country-specific override
    # -----------------------------------------

    if country:

        country_qs = Translation.objects.filter(
            language=language,
            country=country
        ).only("key", "value")

        for item in country_qs:
            result[item.key] = item.value

    return Response({
        "language": language,
        "country": country_code or None,
        "translations": result
    })