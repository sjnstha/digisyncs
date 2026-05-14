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
            "id", "language", "level", "level_ja", "level_np", "level_code",
            "title_en", "title_ja", "title_ne",
            "description_en", "description_ja", "description_ne",
            "duration_weeks", "schedule", "schedule_ja", "schedule_ne",
            "price", "price_ja", "price_ne", "currency", "order",
        ]


class TeamMemberSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = TeamMember
        fields = [
            "id", "name", "name_ja", "name_ne",
            "role_en", "role_ja", "role_ne",
            "bio_en", "bio_ja", "bio_ne",
            "photo_url", "email", "linkedin", "order",
        ]

    def get_photo_url(self, obj):
        return obj.photo.url if obj.photo else None


class TestimonialSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = [
            "id", "student_name", "student_name_ja", "student_name_ne", "photo_url",
            "origin_country", "origin_country_ja", "origin_country_ne",
            "destination", "destination_ja", "destination_ne", "rating",
            "quote_en", "quote_ja", "quote_ne",
            "service_used", "service_used_ja", "service_used_ne", "is_featured",
        ]

    def get_photo_url(self, obj):
        return obj.student_photo.url if obj.student_photo else None


class NewsEventSerializer(serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = NewsEvent
        fields = [
            "id", "type", "type_ja", "type_np", "slug",
            "title_en", "title_ja", "title_ne",
            "excerpt_en", "excerpt_ja", "excerpt_ne",
            "body_en", "body_ja", "body_ne",
            "cover_image_url",
            "event_date", "event_location", "event_location_ja", "event_location_ne",
            "published_at", "is_featured",
        ]

    def get_cover_image_url(self, obj):
        return obj.cover_image.url if obj.cover_image else None


class SiteStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteStat
        fields = ["id", "value", "value_ja", "value_ne", "label_en", "label_ja", "label_ne", "icon", "order"]
