from django.db import models
from apps.sites_config.models import Country, LANGUAGE_CHOICES


class Translation(models.Model):
    """
    Stores all UI text strings per language and optionally per country.

    key      — dot-notation key, e.g. "home.hero.title", "nav.contact"
    language — en / ja / ne
    country  — NULL means global default; set to override for a specific country
    value    — the translated string

    Lookup priority in the frontend:
      1. country-specific + language match
      2. global (country=NULL) + language match
      3. fallback to English global
    """
    key = models.CharField(max_length=255, db_index=True)
    language = models.CharField(max_length=5, choices=LANGUAGE_CHOICES, db_index=True)
    country = models.ForeignKey(
        Country,
        on_delete=models.CASCADE,
        null=True, blank=True,
        related_name="translations",
        help_text="Leave blank for a global/default translation",
    )
    value = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = [("key", "language", "country")]
        ordering = ["key", "language"]
        verbose_name = "Translation"
        verbose_name_plural = "Translations"

    def __str__(self):
        country_label = self.country.code if self.country else "global"
        return f"[{country_label}] [{self.language}] {self.key}"
