from django.db import models


LANGUAGE_CHOICES = [
    ("en", "English"),
    ("ja", "Japanese"),
    ("ne", "Nepali"),
]


class Country(models.Model):
    code = models.CharField(max_length=4, unique=True, help_text="e.g. JP, NP, AU")
    name = models.CharField(max_length=100, help_text="e.g. Japan")
    is_active = models.BooleanField(default=True)
    default_language = models.CharField(
        max_length=5, choices=LANGUAGE_CHOICES, default="en"
    )
    locale = models.CharField(
        max_length=10, default="en-US",
        help_text="BCP-47 locale used for date/number formatting, e.g. ja-JP"
    )
    order = models.PositiveIntegerField(
        default=0, help_text="Display order in country switcher"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Country"
        verbose_name_plural = "Countries"

    def __str__(self):
        return f"{self.name} ({self.code})"


class SiteConfig(models.Model):
    country = models.OneToOneField(
        Country, on_delete=models.CASCADE, related_name="config"
    )

    # ── Branding ──────────────────────────────────────────
    site_name = models.CharField(max_length=200)
    tagline = models.CharField(max_length=300, blank=True)
    site_name_ja = models.CharField(max_length=200, blank=True)
    tagline_ja = models.CharField(max_length=300, blank=True)
    site_name_ne = models.CharField(max_length=200, blank=True)
    tagline_ne = models.CharField(max_length=300, blank=True)
    logo = models.ImageField(upload_to="logos/", blank=True, null=True)
    favicon = models.ImageField(upload_to="favicons/", blank=True, null=True)
    hero_bg_image = models.ImageField(upload_to="hero/", blank=True, null=True) 

    # ── Colors ────────────────────────────────────────────
    color_primary = models.CharField(max_length=7, default="#0ea5e9",
        help_text="Hex color, e.g. #0ea5e9")
    color_secondary = models.CharField(max_length=7, default="#64748b")
    color_accent = models.CharField(max_length=7, default="#f59e0b")
    color_bg = models.CharField(max_length=7, default="#ffffff",
        verbose_name="Background color")
    color_text = models.CharField(max_length=7, default="#1e293b",
        verbose_name="Text color")
    color_navbar_bg = models.CharField(max_length=7, default="#ffffff",
        verbose_name="Navbar background")
    color_navbar_text = models.CharField(max_length=7, default="#1e293b",
        verbose_name="Navbar text")

    # ── Fonts ─────────────────────────────────────────────
    font_primary = models.CharField(
        max_length=100, default="Noto Sans JP",
        help_text="Google Fonts name, e.g. Noto Sans JP"
    )
    font_heading = models.CharField(max_length=100, default="Noto Sans JP")

    # ── Contact EN ───────────────────────────────────────────
    address_line1 = models.CharField(max_length=200, blank=True)
    address_line2 = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=100, blank=True)

    address_line1_ja = models.CharField(max_length=200, blank=True)
    address_line2_ja = models.CharField(max_length=200, blank=True)
    city_ja = models.CharField(max_length=100, blank=True)

    address_line1_ne = models.CharField(max_length=200, blank=True)
    address_line2_ne = models.CharField(max_length=200, blank=True)
    city_ne = models.CharField(max_length=100, blank=True)

    postal_code = models.CharField(max_length=20, blank=True)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)

    # ── Google Maps ───────────────────────────────────────
    google_maps_embed_url = models.TextField(
        blank=True,
        help_text="Paste the full Google Maps embed iframe src URL"
    )
    google_maps_lat = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    google_maps_lng = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )

    # ── SNS Links ─────────────────────────────────────────
    sns_facebook = models.URLField(blank=True)
    sns_instagram = models.URLField(blank=True)
    sns_twitter = models.URLField(blank=True, verbose_name="Twitter / X")
    sns_youtube = models.URLField(blank=True)
    sns_line = models.URLField(blank=True, verbose_name="LINE (Japan)")
    sns_linkedin = models.URLField(blank=True)
    sns_tiktok = models.URLField(blank=True)
    sns_whatsapp = models.CharField(max_length=50, blank=True)

    # ── Footer ────────────────────────────────────────────
    footer_text = models.TextField(blank=True)
    copyright_text = models.CharField(max_length=200, blank=True)

    footer_text_ja = models.TextField(blank=True)
    copyright_text_ja = models.CharField(max_length=200, blank=True)

    footer_text_ne = models.TextField(blank=True)
    copyright_text_ne = models.CharField(max_length=200, blank=True)

    meta_title       = models.CharField(max_length=70,  blank=True, help_text="Browser tab title / Google title (max 60 chars recommended)")
    meta_description = models.TextField(max_length=160, blank=True, help_text="Google search snippet (max 155 chars recommended)")
    og_image         = models.ImageField(upload_to="seo/", blank=True, null=True, help_text="Open Graph image shown when sharing on social media (1200×630px recommended)")
    canonical_url    = models.URLField(blank=True, help_text="Canonical domain e.g. https://www.3staredu.jp")
    google_analytics_id = models.CharField(max_length=30, blank=True, help_text="Google Analytics 4 Measurement ID e.g. G-XXXXXXXXXX")

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site Configuration"
        verbose_name_plural = "Site Configurations"

    def __str__(self):
        return f"Config — {self.country.name}"


class NavItem(models.Model):
    country = models.ForeignKey(
        Country, on_delete=models.CASCADE, related_name="nav_items"
    )
    label_en = models.CharField(max_length=100, verbose_name="Label (English)")
    label_ja = models.CharField(max_length=100, blank=True, verbose_name="Label (Japanese)")
    label_ne = models.CharField(max_length=100, blank=True, verbose_name="Label (Nepali)")
    url = models.CharField(max_length=200, help_text="e.g. / or /about or https://...")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    open_in_new_tab = models.BooleanField(default=False)

    class Meta:
        ordering = ["order"]
        verbose_name = "Nav Item"
        verbose_name_plural = "Nav Items"

    def __str__(self):
        return f"{self.label_en} ({self.country.code})"

    def get_label(self, language="en"):
        mapping = {"en": self.label_en, "ja": self.label_ja, "ne": self.label_ne}
        return mapping.get(language) or self.label_en
