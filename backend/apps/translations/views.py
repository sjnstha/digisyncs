from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db.models import Q

from .models import Translation
from apps.sites_config.models import Country


@api_view(["GET"])
@permission_classes([AllowAny])
def translation_dict(request):
    """
    Returns a flat key:value dict for a given language + country.

    Query params:
      language  — en | ja | ne  (required)
      country   — JP | NP | ... (optional; if omitted, returns global only)

    Priority: country-specific overrides global.

    Example response:
    {
        "nav.home": "ホーム",
        "nav.about": "会社概要",
        "home.hero.title": "ようこそ"
    }
    """
    language = request.query_params.get("language", "en")
    country_code = request.query_params.get("country", "").upper()

    country = None
    if country_code:
        try:
            country = Country.objects.get(code=country_code, is_active=True)
        except Country.DoesNotExist:
            pass

    # Fetch global translations for this language
    qs = Translation.objects.filter(language=language, country__isnull=True)
    result = {t.key: t.value for t in qs}

    # Overlay country-specific translations (these win)
    if country:
        country_qs = Translation.objects.filter(language=language, country=country)
        for t in country_qs:
            result[t.key] = t.value

    return Response(result)
