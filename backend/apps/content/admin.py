from django.contrib import admin
from django.utils.html import format_html
from .models import Service, LanguageCourse, TeamMember, Testimonial, NewsEvent, SiteStat


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ["title_en", "country", "icon", "is_featured", "order", "is_active"]
    list_editable = ["order", "is_featured", "is_active"]
    list_filter = ["country", "is_active", "is_featured"]
    search_fields = ["title_en", "title_ja"]
    ordering = ["country", "order"]


@admin.register(LanguageCourse)
class LanguageCourseAdmin(admin.ModelAdmin):
    list_display = ["title_en", "language", "level_code", "country", "duration_weeks", "price", "currency", "is_active"]
    list_editable = ["is_active"]
    list_filter = ["country", "language", "level", "is_active"]
    search_fields = ["title_en", "level_code"]
    ordering = ["country", "order"]


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ["name", "role_en", "country", "order", "is_active", "photo_preview"]
    list_editable = ["order", "is_active"]
    list_filter = ["country", "is_active"]
    search_fields = ["name", "role_en"]

    @admin.display(description="Photo")
    def photo_preview(self, obj):
        if obj.photo:
            return format_html('<img src="{}" style="width:40px;height:40px;border-radius:50%;object-fit:cover">', obj.photo.url)
        return "—"


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ["student_name", "rating", "country", "service_used", "is_featured", "is_active"]
    list_editable = ["is_featured", "is_active"]
    list_filter = ["country", "rating", "is_active", "is_featured"]
    search_fields = ["student_name", "quote_en"]


@admin.register(NewsEvent)
class NewsEventAdmin(admin.ModelAdmin):
    list_display = ["title_en", "type", "country", "is_featured", "published_at", "is_active"]
    list_editable = ["is_featured", "is_active"]
    list_filter = ["country", "type", "is_active", "is_featured"]
    search_fields = ["title_en", "slug"]
    prepopulated_fields = {"slug": ("title_en",)}
    fieldsets = (
        (None, {
            "fields": ("country", "type", "slug", "is_featured", "is_active"),
        }),
        ("Title", {
            "fields": ("title_en", "title_ja", "title_ne"),
        }),
        ("Excerpt", {
            "fields": ("excerpt_en", "excerpt_ja", "excerpt_ne"),
        }),
        ("Body", {
            "fields": ("body_en", "body_ja", "body_ne"),
            "classes": ("collapse",),
        }),
        ("Media & Event details", {
            "fields": ("cover_image", "event_date", "event_location", "event_location_ja", "event_location_ne", "google_maps_url"),
        }),
    )


@admin.register(SiteStat)
class SiteStatAdmin(admin.ModelAdmin):
    list_display = ["value", "value_ja", "value_ne", "label_en", "country", "icon", "order", "is_active"]
    list_editable = ["order", "is_active"]
    list_filter = ["country", "is_active"]
