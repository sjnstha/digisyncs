from django.contrib import admin
from django.utils.html import format_html
from .models import GalleryItem


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display  = ["preview", "title_en", "type", "country", "is_featured", "order", "is_active"]
    list_editable = ["order", "is_featured", "is_active"]
    list_filter   = ["country", "type", "is_active", "is_featured"]
    search_fields = ["title_en", "tags"]
    ordering      = ["country", "order"]

    fieldsets = (
        ("Basic", {
            "fields": ("country", "type", "order", "is_featured", "is_active", "tags"),
        }),
        ("File / Video", {
            "fields": ("file", "thumbnail", "video_url"),
            "description": "For images: upload a file. For YouTube/Vimeo: paste the URL. For direct video: upload the file.",
        }),
        ("Title (per language)", {
            "fields": ("title_en", "title_ja", "title_ne"),
        }),
        ("Caption (per language)", {
            "fields": ("caption_en", "caption_ja", "caption_ne"),
            "classes": ("collapse",),
        }),
    )

    @admin.display(description="Preview")
    def preview(self, obj):
        thumb = None
        if obj.type == "image" and obj.file:
            thumb = obj.file.url
        elif obj.thumbnail:
            thumb = obj.thumbnail.url
        elif obj.type == "youtube":
            thumb = obj.youtube_thumbnail
        if thumb:
            return format_html(
                '<img src="{}" style="width:60px;height:40px;object-fit:cover;border-radius:4px">',
                thumb
            )
        icon = {"youtube": "▶️", "vimeo": "▶️", "video": "🎬"}.get(obj.type, "🖼️")
        return icon
