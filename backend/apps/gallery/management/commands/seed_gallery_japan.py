from django.core.management.base import BaseCommand
from apps.sites_config.models import Country
from apps.gallery.models import GalleryItem


class Command(BaseCommand):
    help = "Seed test gallery content for Japan (YouTube videos + image placeholders)"

    def handle(self, *args, **options):
        try:
            country = Country.objects.get(code="JP")
        except Country.DoesNotExist:
            self.stdout.write(self.style.ERROR("Japan country not found. Run seed_japan first."))
            return

        items = [
            # ── YouTube Videos ──────────────────────────────────────
            {
                "type": "youtube",
                "video_url": "https://www.youtube.com/watch?v=8ldB3zGnUvI",
                "title_en": "Tokyo City Guide — Study Life in Japan",
                "title_ja": "東京シティガイド — 日本での留学生活",
                "title_ne": "टोक्यो सिटी गाइड — जापानमा अध्ययन जीवन",
                "caption_en": "Explore what life looks like for international students in Tokyo.",
                "tags": "tokyo,student-life,japan",
                "is_featured": True,
                "order": 1,
            },
            {
                "type": "youtube",
                "video_url": "https://www.youtube.com/watch?v=RMumFniMkAM",
                "title_en": "JLPT Exam — What to Expect",
                "title_ja": "JLPT試験 — 当日の流れ",
                "title_ne": "JLPT परीक्षा — के अपेक्षा गर्ने",
                "caption_en": "A complete walkthrough of the Japanese Language Proficiency Test.",
                "tags": "jlpt,japanese,exam",
                "is_featured": True,
                "order": 2,
            },
            {
                "type": "youtube",
                "video_url": "https://www.youtube.com/watch?v=AEuKSh1GIAo",
                "title_en": "Sakura Season in Japan",
                "title_ja": "日本の桜シーズン",
                "title_ne": "जापानमा सकुरा सिजन",
                "caption_en": "Experience the magical cherry blossom season across Japan.",
                "tags": "sakura,japan,culture",
                "is_featured": False,
                "order": 3,
            },
            {
                "type": "youtube",
                "video_url": "https://www.youtube.com/watch?v=sUStdzuKKL8",
                "title_en": "Japanese University Campus Tour",
                "title_ja": "日本の大学キャンパスツアー",
                "title_ne": "जापानी विश्वविद्यालय क्याम्पस भ्रमण",
                "caption_en": "Inside look at a top Japanese university campus.",
                "tags": "university,campus,education",
                "is_featured": False,
                "order": 4,
            },
            {
                "type": "youtube",
                "video_url": "https://www.youtube.com/watch?v=OxKCPMCPGiQ",
                "title_en": "Osaka Food & Culture Guide",
                "title_ja": "大阪のグルメと文化",
                "title_ne": "ओसाका खाना र संस्कृति गाइड",
                "caption_en": "Discover the food, culture and student life in Osaka.",
                "tags": "osaka,food,culture",
                "is_featured": False,
                "order": 5,
            },
            {
                "type": "youtube",
                "video_url": "https://www.youtube.com/watch?v=KH4mMoNIgFw",
                "title_en": "How to Apply for a Japan Student Visa",
                "title_ja": "日本の留学ビザ申請方法",
                "title_ne": "जापान विद्यार्थी भिसाको लागि कसरी आवेदन गर्ने",
                "caption_en": "Step-by-step guide to the Japan student visa application process.",
                "tags": "visa,application,guide",
                "is_featured": True,
                "order": 6,
            },
            # ── Image placeholders (will show placeholder until real photos uploaded) ──
            {
                "type": "image",
                "video_url": "",
                "title_en": "Orientation Day 2024",
                "title_ja": "2024年オリエンテーションデー",
                "title_ne": "अभिमुखीकरण दिवस २०२४",
                "caption_en": "Welcome ceremony for new students joining our program.",
                "tags": "event,2024,orientation",
                "is_featured": True,
                "order": 7,
            },
            {
                "type": "image",
                "video_url": "",
                "title_en": "Japan University Fair — Kathmandu",
                "title_ja": "日本大学フェア — カトマンズ",
                "title_ne": "जापान विश्वविद्यालय मेला — काठमाडौं",
                "caption_en": "Students meeting representatives from top Japanese universities.",
                "tags": "event,fair,university",
                "is_featured": False,
                "order": 8,
            },
            {
                "type": "image",
                "video_url": "",
                "title_en": "JLPT Success — Class of 2024",
                "title_ja": "JLPT合格 — 2024年クラス",
                "title_ne": "JLPT सफलता — २०२४ को वर्ग",
                "caption_en": "Celebrating our students who passed JLPT N3 and above.",
                "tags": "jlpt,success,students",
                "is_featured": False,
                "order": 9,
            },
        ]

        count = 0
        for data in items:
            obj, created = GalleryItem.objects.get_or_create(
                country=country,
                title_en=data["title_en"],
                defaults={**data, "is_active": True},
            )
            status = "Created" if created else "Already exists"
            self.stdout.write(f"  {status}: [{data['type'].upper()}] {data['title_en']}")
            if created:
                count += 1

        self.stdout.write(self.style.SUCCESS(
            f"\nGallery seed complete! {count} new items created.\n"
            f"→ Visit http://localhost:8000/api/gallery/JP/ to verify\n"
            f"→ For image items: upload photos in Admin → Gallery\n"
            f"→ YouTube videos show automatically — no upload needed"
        ))
