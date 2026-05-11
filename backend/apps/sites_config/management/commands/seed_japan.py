from django.core.management.base import BaseCommand
from apps.sites_config.models import Country, SiteConfig, NavItem
from apps.translations.models import Translation


class Command(BaseCommand):
    help = "Seed initial data for Japan (Country + SiteConfig + NavItems + Translations)"

    def handle(self, *args, **options):
        self.stdout.write("Seeding Japan data...")

        # ── Country ───────────────────────────────────────
        country, created = Country.objects.get_or_create(
            code="JP",
            defaults={
                "name": "Japan",
                "is_active": True,
                "default_language": "ja",
                "locale": "ja-JP",
                "order": 1,
            },
        )
        self.stdout.write(f"  {'Created' if created else 'Already exists'}: Country JP")

        # ── SiteConfig ────────────────────────────────────
        config, created = SiteConfig.objects.get_or_create(
            country=country,
            defaults={
                "site_name": "DigiSync Japan",
                "tagline": "デジタルの未来をともに",
                "color_primary": "#0ea5e9",
                "color_secondary": "#64748b",
                "color_accent": "#f59e0b",
                "color_bg": "#ffffff",
                "color_text": "#1e293b",
                "color_navbar_bg": "#ffffff",
                "color_navbar_text": "#1e293b",
                "font_primary": "Noto Sans JP",
                "font_heading": "Noto Sans JP",
                "address_line1": "〒100-0001",
                "address_line2": "東京都千代田区千代田1-1",
                "city": "東京都",
                "postal_code": "100-0001",
                "phone": "+81-3-0000-0000",
                "email": "info@digisyncs.jp",
                "google_maps_embed_url": "",
                "google_maps_lat": 35.681236,
                "google_maps_lng": 139.767125,
                "sns_facebook": "",
                "sns_instagram": "",
                "sns_twitter": "",
                "sns_line": "",
                "footer_text": "デジタルソリューションを提供するDigiSyncへようこそ。",
                "copyright_text": "© 2024 DigiSync Japan. All rights reserved.",
            },
        )
        self.stdout.write(f"  {'Created' if created else 'Already exists'}: SiteConfig for JP")

        # ── NavItems ──────────────────────────────────────
        nav_items = [
            {"label_en": "Home",     "label_ja": "ホーム",     "label_ne": "गृहपृष्ठ", "url": "/",        "order": 1},
            {"label_en": "About",    "label_ja": "会社概要",   "label_ne": "हाम्रोबारे", "url": "/about",   "order": 2},
            {"label_en": "Services", "label_ja": "サービス",   "label_ne": "सेवाहरू",   "url": "/services", "order": 3},
            {"label_en": "Contact",  "label_ja": "お問い合わせ", "label_ne": "सम्पर्क",  "url": "/contact", "order": 4},
        ]
        for item in nav_items:
            obj, created = NavItem.objects.get_or_create(
                country=country,
                url=item["url"],
                defaults=item,
            )
            self.stdout.write(f"  {'Created' if created else 'Already exists'}: NavItem {item['url']}")

        # ── Translations ──────────────────────────────────
        translations = [
            # English — global
            ("nav.home",             "en", None, "Home"),
            ("nav.about",            "en", None, "About"),
            ("nav.services",         "en", None, "Services"),
            ("nav.contact",          "en", None, "Contact"),
            ("home.hero.title",      "en", None, "Welcome to DigiSync"),
            ("home.hero.subtitle",   "en", None, "Digital solutions for the modern world"),
            ("footer.rights",        "en", None, "All rights reserved"),
            # Japanese — global
            ("nav.home",             "ja", None, "ホーム"),
            ("nav.about",            "ja", None, "会社概要"),
            ("nav.services",         "ja", None, "サービス"),
            ("nav.contact",          "ja", None, "お問い合わせ"),
            ("home.hero.title",      "ja", None, "DigiSyncへようこそ"),
            ("home.hero.subtitle",   "ja", None, "現代社会のためのデジタルソリューション"),
            ("footer.rights",        "ja", None, "全著作権所有"),
            # Nepali — global
            ("nav.home",             "ne", None, "गृहपृष्ठ"),
            ("nav.about",            "ne", None, "हाम्रोबारे"),
            ("nav.services",         "ne", None, "सेवाहरू"),
            ("nav.contact",          "ne", None, "सम्पर्क"),
            ("home.hero.title",      "ne", None, "DigiSync मा स्वागत छ"),
            ("home.hero.subtitle",   "ne", None, "आधुनिक विश्वका लागि डिजिटल समाधान"),
            ("footer.rights",        "ne", None, "सर्वाधिकार सुरक्षित"),
            # Japan-specific overrides (example)
            ("home.hero.title",      "ja", country, "DigiSync Japanへようこそ"),
        ]
        for key, lang, ctry, value in translations:
            obj, created = Translation.objects.get_or_create(
                key=key, language=lang, country=ctry,
                defaults={"value": value},
            )
            label = ctry.code if ctry else "global"
            self.stdout.write(f"  {'Created' if created else 'Exists'}: [{label}][{lang}] {key}")

        self.stdout.write(self.style.SUCCESS("\nJapan seed data complete!"))
        self.stdout.write("  → Visit http://localhost:8000/api/site/JP/ to see the config")
        self.stdout.write("  → Visit http://localhost:8000/api/translations/?language=ja&country=JP")
