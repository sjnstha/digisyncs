from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(["GET"])
@permission_classes([AllowAny])
def health_check(request):
    """
    Simple health check endpoint.
    React frontend calls this on startup to confirm API is reachable.
    """
    return Response(
        {
            "status": "ok",
            "timestamp": timezone.now().isoformat(),
            "version": "1.0.0",
            "supported_languages": ["en", "ja", "ne"],
        }
    )
