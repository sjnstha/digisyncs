from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from apps.sites_config.models import Country
from .models import GalleryItem
from .serializers import GalleryItemSerializer


@api_view(["GET"])
@permission_classes([AllowAny])
def gallery_list(request, country_code):
    """
    GET /api/gallery/JP/
    Optional filters: ?type=image|youtube|vimeo|video  ?tag=event
    """
    try:
        country = Country.objects.get(code=country_code.upper(), is_active=True)
    except Country.DoesNotExist:
        return Response({"error": "Country not found."}, status=status.HTTP_404_NOT_FOUND)

    qs = GalleryItem.objects.filter(country=country, is_active=True)

    type_filter = request.query_params.get("type")
    if type_filter:
        qs = qs.filter(type=type_filter)

    tag_filter = request.query_params.get("tag")
    if tag_filter:
        qs = qs.filter(tags__icontains=tag_filter)

    return Response(GalleryItemSerializer(qs, many=True).data)
