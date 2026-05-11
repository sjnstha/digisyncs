from django.contrib import admin
from .models import Translation


@admin.register(Translation)
class TranslationAdmin(admin.ModelAdmin):
    list_display = ["key", "language", "country", "short_value", "updated_at"]
    list_filter = ["language", "country"]
    search_fields = ["key", "value"]
    ordering = ["key", "language"]
    list_per_page = 50

    @admin.display(description="Value")
    def short_value(self, obj):
        return obj.value[:80] + "…" if len(obj.value) > 80 else obj.value
