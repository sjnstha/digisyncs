from rest_framework import serializers
from .models import GalleryItem


class GalleryItemSerializer(serializers.ModelSerializer):
    file_url      = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()
    embed_url     = serializers.CharField(read_only=True)
    youtube_thumbnail = serializers.CharField(read_only=True)
    tag_list      = serializers.SerializerMethodField()

    class Meta:
        model = GalleryItem
        fields = [
            "id", "type",
            "file_url", "thumbnail_url",
            "video_url", "embed_url", "youtube_thumbnail",
            "title_en", "title_ja", "title_ne",
            "caption_en", "caption_ja", "caption_ne",
            "tags", "tag_list",
            "is_featured", "order",
        ]

    def get_file_url(self, obj):
        return obj.file.url if obj.file else None

    def get_thumbnail_url(self, obj):
        return obj.thumbnail.url if obj.thumbnail else None

    def get_tag_list(self, obj):
        return [t.strip() for t in obj.tags.split(",") if t.strip()] if obj.tags else []
