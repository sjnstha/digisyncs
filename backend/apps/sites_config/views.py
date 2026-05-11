from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import Country, SiteConfig, NavItem
from .serializers import CountrySerializer, SiteDataSerializer


@api_view(["GET"])
@permission_classes([AllowAny])
def country_list(request):
    """
    List all active countries.
    Used by the frontend country switcher.
    """
    countries = Country.objects.filter(is_active=True)
    serializer = CountrySerializer(countries, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([AllowAny])
def site_data(request, country_code):
    """
    Return all site data for a given country code (e.g. JP).
    This is the main endpoint the React app calls on load.

    Response shape:
    {
        "country": { code, name, default_language, locale },
        "config":  { site_name, logo_url, colors, fonts, contact, maps, sns, footer },
        "nav":     [ { label_en, label_ja, label_ne, url, order }, ... ]
    }
    """
    try:
        country = Country.objects.get(code=country_code.upper(), is_active=True)
    except Country.DoesNotExist:
        return Response(
            {"error": f"Country '{country_code}' not found or inactive."},
            status=status.HTTP_404_NOT_FOUND,
        )

    try:
        config = country.config
    except SiteConfig.DoesNotExist:
        return Response(
            {"error": f"No site config found for '{country_code}'."},
            status=status.HTTP_404_NOT_FOUND,
        )

    nav_items = NavItem.objects.filter(country=country, is_active=True)

    data = {
        "country": country,
        "config": config,
        "nav": nav_items,
    }
    serializer = SiteDataSerializer(data, context={"request": request})
    return Response(serializer.data)
