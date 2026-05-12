from django.contrib import admin
from django.utils.html import format_html
from .models import Country, SiteConfig, NavItem


class NavItemInline(admin.TabularInline):
    model = NavItem
    extra = 1
    fields = ["label_en", "label_ja", "label_ne", "url", "order", "is_active", "open_in_new_tab"]


class SiteConfigInline(admin.StackedInline):
    model = SiteConfig
    extra = 0
    can_delete = False

    fieldsets = (
        ("Branding", {
            "fields": ("site_name", "tagline", "logo", "favicon", "hero_bg_image"),
        }),
        ("Colors", {
            "fields": (
                ("color_primary", "color_secondary", "color_accent"),
                ("color_bg", "color_text"),
                ("color_navbar_bg", "color_navbar_text"),
            ),
            "description": "Use hex color codes e.g. #0ea5e9",
        }),
        ("Fonts", {
            "fields": ("font_primary", "font_heading"),
            "description": "Use Google Fonts names e.g. 'Noto Sans JP', 'Inter'",
        }),
        ("Contact", {
            "fields": (
                "address_line1", "address_line2",
                ("city", "postal_code"),
                ("phone", "email"),
            ),
        }),
        ("Google Maps", {
            "fields": ("google_maps_embed_url", ("google_maps_lat", "google_maps_lng")),
        }),
        ("SNS Links", {
            "fields": (
                "sns_facebook", "sns_instagram", "sns_twitter",
                "sns_youtube", "sns_line", "sns_linkedin", "sns_tiktok","sns_whatsapp",
            ),
        }),
        ("Footer", {
            "fields": ("footer_text", "copyright_text"),
        }),
    )


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = [
        "code", "name", "default_language", "locale",
        "is_active", "order", "has_config",
    ]
    list_editable = ["order", "is_active"]
    list_filter = ["is_active", "default_language"]
    search_fields = ["code", "name"]
    ordering = ["order"]
    inlines = [SiteConfigInline, NavItemInline]

    @admin.display(boolean=True, description="Config set up")
    def has_config(self, obj):
        return hasattr(obj, "config")


@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ["country", "site_name", "color_preview", "updated_at"]
    list_filter = ["country"]
    readonly_fields = ["updated_at", "color_preview"]

    fieldsets = (
        (None, {
            "fields": ("country", "updated_at"),
        }),
        ("Branding", {
            "fields": ("site_name", "tagline", "logo", "favicon", "hero_bg_image"),
        }),
        ("Colors", {
            "fields": (
                ("color_primary", "color_secondary", "color_accent"),
                ("color_bg", "color_text"),
                ("color_navbar_bg", "color_navbar_text"),
                "color_preview",
            ),
        }),
        ("Fonts", {
            "fields": ("font_primary", "font_heading"),
        }),
        ("Contact", {
            "fields": (
                "address_line1", "address_line2",
                ("city", "postal_code"),
                ("phone", "email"),
            ),
        }),
        ("Google Maps", {
            "fields": ("google_maps_embed_url", ("google_maps_lat", "google_maps_lng")),
        }),
        ("SNS Links", {
            "fields": (
                "sns_facebook", "sns_instagram", "sns_twitter",
                "sns_youtube", "sns_line", "sns_linkedin", "sns_tiktok","sns_whatsapp",
            ),
        }),
        ("Footer", {
            "fields": ("footer_text", "copyright_text"),
        }),
    )

    @admin.display(description="Color preview")
    def color_preview(self, obj):
        return format_html(
            '<div style="display:flex;gap:6px;">'
            '<span style="background:{};width:24px;height:24px;border-radius:4px;border:1px solid #ccc" title="Primary"></span>'
            '<span style="background:{};width:24px;height:24px;border-radius:4px;border:1px solid #ccc" title="Secondary"></span>'
            '<span style="background:{};width:24px;height:24px;border-radius:4px;border:1px solid #ccc" title="Accent"></span>'
            '</div>',
            obj.color_primary, obj.color_secondary, obj.color_accent
        )


@admin.register(NavItem)
class NavItemAdmin(admin.ModelAdmin):
    list_display = ["label_en", "label_ja", "label_ne", "url", "country", "order", "is_active"]
    list_editable = ["order", "is_active"]
    list_filter = ["country", "is_active"]
    search_fields = ["label_en", "url"]
    ordering = ["country", "order"]
