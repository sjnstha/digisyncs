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
    hero_bg_image_url = serializers.SerializerMethodField()

    class Meta:
        model = SiteConfig
        exclude = ["id", "country", "logo", "favicon", "hero_bg_image"]

    def get_logo_url(self, obj):
        if obj.logo:
            return obj.logo.url   # returns /media/logos/filename.png
        return None

    def get_favicon_url(self, obj):
        if obj.favicon:
            return obj.favicon.url
        return None
    def get_hero_bg_image_url(self, obj):
        return obj.hero_bg_image.url if obj.hero_bg_image else None


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
