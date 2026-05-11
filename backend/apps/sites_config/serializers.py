from rest_framework import serializers
from .models import Country, SiteConfig, NavItem


class NavItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavItem
        fields = [
            "id", "label_en", "label_ja", "label_ne",
            "url", "order", "open_in_new_tab",
        ]


class SiteConfigSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()
    favicon_url = serializers.SerializerMethodField()

    class Meta:
        model = SiteConfig
        exclude = ["id", "country", "logo", "favicon"]

    def get_logo_url(self, obj):
        request = self.context.get("request")
        if obj.logo and request:
            return request.build_absolute_uri(obj.logo.url)
        return None

    def get_favicon_url(self, obj):
        request = self.context.get("request")
        if obj.favicon and request:
            return request.build_absolute_uri(obj.favicon.url)
        return None


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ["id", "code", "name", "default_language", "locale", "order"]


class SiteDataSerializer(serializers.Serializer):
    """
    Single endpoint that returns everything the frontend needs:
    country info + site config + nav items.
    """
    country = CountrySerializer()
    config = SiteConfigSerializer()
    nav = NavItemSerializer(many=True)
