from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from apps.sites_config.models import Country
from .models import Service, LanguageCourse, TeamMember, Testimonial, NewsEvent, SiteStat
from .serializers import (
    ServiceSerializer, LanguageCourseSerializer, TeamMemberSerializer,
    TestimonialSerializer, NewsEventSerializer, SiteStatSerializer,
)


def get_country_or_404(country_code):
    try:
        return Country.objects.get(code=country_code.upper(), is_active=True), None
    except Country.DoesNotExist:
        return None, Response(
            {"error": f"Country '{country_code}' not found."},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(["GET"])
@permission_classes([AllowAny])
def services(request, country_code):
    country, err = get_country_or_404(country_code)
    if err:
        return err
    qs = Service.objects.filter(country=country, is_active=True)
    return Response(ServiceSerializer(qs, many=True).data)


@api_view(["GET"])
@permission_classes([AllowAny])
def courses(request, country_code):
    country, err = get_country_or_404(country_code)
    if err:
        return err
    qs = LanguageCourse.objects.filter(country=country, is_active=True)
    return Response(LanguageCourseSerializer(qs, many=True).data)


@api_view(["GET"])
@permission_classes([AllowAny])
def team(request, country_code):
    country, err = get_country_or_404(country_code)
    if err:
        return err
    qs = TeamMember.objects.filter(country=country, is_active=True)
    return Response(TeamMemberSerializer(qs, many=True, context={"request": request}).data)


@api_view(["GET"])
@permission_classes([AllowAny])
def testimonials(request, country_code):
    country, err = get_country_or_404(country_code)
    if err:
        return err
    qs = Testimonial.objects.filter(country=country, is_active=True)
    return Response(TestimonialSerializer(qs, many=True, context={"request": request}).data)


@api_view(["GET"])
@permission_classes([AllowAny])
def news_events(request, country_code):
    """
    Optional query param: ?type=news or ?type=event
    """
    country, err = get_country_or_404(country_code)
    if err:
        return err
    qs = NewsEvent.objects.filter(country=country, is_active=True)
    type_filter = request.query_params.get("type")
    if type_filter in ("news", "event"):
        qs = qs.filter(type=type_filter)
    return Response(NewsEventSerializer(qs, many=True, context={"request": request}).data)


@api_view(["GET"])
@permission_classes([AllowAny])
def news_event_detail(request, country_code, slug):
    country, err = get_country_or_404(country_code)
    if err:
        return err
    try:
        obj = NewsEvent.objects.get(country=country, slug=slug, is_active=True)
    except NewsEvent.DoesNotExist:
        return Response({"error": "Not found."}, status=status.HTTP_404_NOT_FOUND)
    return Response(NewsEventSerializer(obj, context={"request": request}).data)


@api_view(["GET"])
@permission_classes([AllowAny])
def stats(request, country_code):
    country, err = get_country_or_404(country_code)
    if err:
        return err
    qs = SiteStat.objects.filter(country=country, is_active=True)
    return Response(SiteStatSerializer(qs, many=True).data)
