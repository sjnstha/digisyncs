from rest_framework import serializers
from .models import Service, LanguageCourse, TeamMember, Testimonial, NewsEvent, SiteStat


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            "id", "icon",
            "title_en", "title_ja", "title_ne",
            "description_en", "description_ja", "description_ne",
            "is_featured", "order",
        ]


class LanguageCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = LanguageCourse
        fields = [
            "id", "language", "level", "level_code",
            "title_en", "title_ja", "title_ne",
            "description_en", "description_ja", "description_ne",
            "duration_weeks", "schedule", "price", "currency", "order",
        ]


class TeamMemberSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = TeamMember
        fields = [
            "id", "name",
            "role_en", "role_ja", "role_ne",
            "bio_en", "bio_ja", "bio_ne",
            "photo_url", "email", "linkedin", "order",
        ]

    def get_photo_url(self, obj):
        if obj.photo:
            return obj.photo.url
        return None


class TestimonialSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = [
            "id", "student_name", "photo_url",
            "origin_country", "destination", "rating",
            "quote_en", "quote_ja", "quote_ne",
            "service_used", "is_featured",
        ]

    def get_photo_url(self, obj):
        if obj.student_photo:
            return obj.student_photo.url
        return None


class NewsEventSerializer(serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = NewsEvent
        fields = [
            "id", "type", "slug",
            "title_en", "title_ja", "title_ne",
            "excerpt_en", "excerpt_ja", "excerpt_ne",
            "body_en", "body_ja", "body_ne",
            "cover_image_url",
            "event_date", "event_location",
            "published_at", "is_featured",
        ]

    def get_cover_image_url(self, obj):
        if obj.cover_image:
            return obj.cover_image.url
        return None


class SiteStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteStat
        fields = ["id", "value", "label_en", "label_ja", "label_ne", "icon", "order"]
