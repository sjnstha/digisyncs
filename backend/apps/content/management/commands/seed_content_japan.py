from django.core.management.base import BaseCommand
from apps.sites_config.models import Country
from apps.content.models import Service, LanguageCourse, TeamMember, Testimonial, NewsEvent, SiteStat


class Command(BaseCommand):
    help = "Seed content data for Japan (services, courses, team, testimonials, news, stats)"

    def handle(self, *args, **options):
        try:
            country = Country.objects.get(code="JP")
        except Country.DoesNotExist:
            self.stdout.write(self.style.ERROR("Japan country not found. Run seed_japan first."))
            return

        self._seed_stats(country)
        self._seed_services(country)
        self._seed_courses(country)
        self._seed_team(country)
        self._seed_testimonials(country)
        self._seed_news(country)
        self.stdout.write(self.style.SUCCESS("\nJapan content seed complete!"))

    def _seed_stats(self, country):
        stats = [
            {"value": "500+", "value_ja": "500+", "value_ne": "५००+","label_en": "Students Placed",  "label_ja": "留学生",      "icon": "users",          "order": 1},
            {"value": "10+",  "value_ja": "500+", "value_ne": "१०+","label_en": "Years Experience", "label_ja": "経験年数",     "icon": "calendar",       "order": 2},
            {"value": "50+",  "value_ja": "50+", "value_ne": "५०+","label_en": "Partner Schools",  "label_ja": "提携校",       "icon": "building",       "order": 3},
            {"value": "98%",  "value_ja": "98%", "value_ne": "९८%","label_en": "Visa Success Rate","label_ja": "ビザ成功率",   "icon": "certificate",    "order": 4},
        ]
        for s in stats:
            SiteStat.objects.get_or_create(country=country, label_en=s["label_en"], defaults=s)
        self.stdout.write("  ✓ Stats seeded")

    def _seed_services(self, country):
        services = [
            {
                "icon": "plane",
                "title_en": "Study Abroad Guidance",
                "title_ja": "留学サポート",
                "title_ne": "विदेश अध्ययन मार्गदर्शन",
                "description_en": "Complete support for studying in Japan — from school selection to enrollment.",
                "description_ja": "学校選びから入学手続きまで、日本留学を完全サポートします。",
                "description_ne": "जापानमा अध्ययनको लागि विद्यालय छनोटदेखि भर्तीसम्म पूर्ण सहयोग।",
                "is_featured": True, "order": 1,
            },
            {
                "icon": "file-text",
                "title_en": "Visa Assistance",
                "title_ja": "ビザ申請サポート",
                "title_ne": "भिसा सहायता",
                "description_en": "Expert guidance on student visa applications with a 98% success rate.",
                "description_ja": "98%の成功率を誇る留学ビザ申請サポートを提供します。",
                "description_ne": "९८% सफलता दरसहित विद्यार्थी भिसा आवेदनमा विशेषज्ञ मार्गदर्शन।",
                "is_featured": True, "order": 2,
            },
            {
                "icon": "book",
                "title_en": "JLPT Preparation",
                "title_ja": "JLPT対策",
                "title_ne": "JLPT तयारी",
                "description_en": "Structured Japanese Language Proficiency Test prep from N5 to N1.",
                "description_ja": "N5からN1まで体系的なJLPT対策コースを提供します。",
                "description_ne": "N5 देखि N1 सम्म संरचित जापानी भाषा प्रवीणता परीक्षा तयारी।",
                "is_featured": True, "order": 3,
            },
            {
                "icon": "award",
                "title_en": "Scholarship Guidance",
                "title_ja": "奨学金サポート",
                "title_ne": "छात्रवृत्ति मार्गदर्शन",
                "description_en": "Find and apply for scholarships suited to your academic profile.",
                "description_ja": "あなたの学歴に合った奨学金の検索と申請をサポートします。",
                "description_ne": "तपाईंको शैक्षिक प्रोफाइलअनुसार छात्रवृत्ति खोज्न र आवेदन गर्न सहायता।",
                "is_featured": False, "order": 4,
            },
            {
                "icon": "home",
                "title_en": "Accommodation Support",
                "title_ja": "住居サポート",
                "title_ne": "आवास सहायता",
                "description_en": "Help finding dormitories, apartments, or homestay options in Japan.",
                "description_ja": "寮・アパート・ホームステイなど住居探しをサポートします。",
                "description_ne": "जापानमा छात्रावास, अपार्टमेन्ट वा होमस्टे विकल्प खोज्न सहायता।",
                "is_featured": False, "order": 5,
            },
            {
                "icon": "briefcase",
                "title_en": "Part-time Job Support",
                "title_ja": "アルバイトサポート",
                "title_ne": "अंशकालीन काम सहायता",
                "description_en": "Guidance on part-time work permissions and job placement in Japan.",
                "description_ja": "アルバイト許可の取得方法と就職先の紹介をサポートします。",
                "description_ne": "जापानमा अंशकालीन काम अनुमति र नोकरी प्लेसमेन्टमा मार्गदर्शन।",
                "is_featured": False, "order": 6,
            },
        ]
        for s in services:
            Service.objects.get_or_create(country=country, title_en=s["title_en"], defaults={**s, "is_active": True})
        self.stdout.write("  ✓ Services seeded")

    def _seed_courses(self, country):
        courses = [
            {"language": "Japanese", "level": "beginner",      "level_code": "N5", "title_en": "Japanese N5 — Beginner",      "title_ja": "日本語N5 入門",   "duration_weeks": 12, "schedule": "Mon–Fri 9:00–12:00", "schedule_ja": "月〜金 9:00〜12:00", "schedule_ne": "सोम–शुक्र बिहान ९:०० – दिउँसो १२:००", "price": 80000,  "price_ja": "", "price_ne": "८०,०००", "currency": "JPY", "order": 1},
            {"language": "Japanese", "level": "elementary",    "level_code": "N4", "title_en": "Japanese N4 — Elementary",    "title_ja": "日本語N4 初級",   "duration_weeks": 16, "schedule": "Mon–Fri 9:00–12:00", "schedule_ja": "月〜金 9:00〜12:00", "schedule_ne": "सोम–शुक्र बिहान ९:०० – दिउँसो १२:००", "price": 90000,  "price_ja": "", "price_ne": "९०,०००", "currency": "JPY", "order": 2},
            {"language": "Japanese", "level": "intermediate",  "level_code": "N3", "title_en": "Japanese N3 — Intermediate",  "title_ja": "日本語N3 中級",   "duration_weeks": 20, "schedule": "Mon–Fri 9:00–13:00", "schedule_ja": "月〜金 9:00〜13:00", "schedule_ne": "सोम–शुक्र बिहान ९:०० – दिउँसो १:००", "price": 100000, "price_ja": "", "price_ne": "१,००,०००", "currency": "JPY", "order": 3},
            {"language": "Japanese", "level": "upper_intermediate", "level_code": "N2", "title_en": "Japanese N2 — Upper Intermediate", "title_ja": "日本語N2 上級", "duration_weeks": 24, "schedule": "Mon–Fri 9:00–13:00", "schedule_ja": "月〜金 9:00〜13:00", "schedule_ne": "सोम–शुक्र बिहान ९:०० – दिउँसो १:००", "price": 110000, "price_ja": "", "price_ne": "१,१०,०००", "currency": "JPY", "order": 4},
            {"language": "Japanese", "level": "advanced",      "level_code": "N1", "title_en": "Japanese N1 — Advanced",      "title_ja": "日本語N1 最上級", "duration_weeks": 28, "schedule": "Mon–Sat 9:00–14:00", "schedule_ja": "月〜金 9:00〜14:00", "schedule_ne": "सोम–शुक्र बिहान ९:०० – दिउँसो १:००", "price": 130000, "price_ja": "", "price_ne": "१,३०,०००", "currency": "JPY", "order": 5},
        ]
        for c in courses:
            LanguageCourse.objects.get_or_create(country=country, level_code=c["level_code"], defaults={**c, "is_active": True})
        self.stdout.write("  ✓ Courses seeded")

    def _seed_team(self, country):
        members = [
            {
                "name": "Rajesh Sharma",
                "name_ja": "ラジェシュ・シャルマ",
                "name_ne": "राजेश शर्मा",
                "role_en": "Founder & Chief Consultant",
                "role_ja": "創業者・チーフコンサルタント",
                "role_ne": "संस्थापक र मुख्य परामर्शदाता",
                "bio_en": "15+ years of experience in international education consulting. Helped 500+ students reach their dream schools in Japan.",
                "bio_ja": "国際教育コンサルティングで15年以上の経験。500人以上の学生が日本の夢の学校に進学するのをサポートしました。",
                "order": 1,
            },
            {
                "name": "Yuki Tanaka",
                "name_ja": "ユキ・タナカ",
                "name_ne": "युकी तनाका",
                "role_en": "Japan Education Specialist",
                "role_ja": "日本教育スペシャリスト",
                "role_ne": "जापान शिक्षा विशेषज्ञ",
                "bio_en": "Native Japanese specialist with deep knowledge of the Japanese university admission system.",
                "bio_ja": "日本の大学入試制度に精通したネイティブ日本語スペシャリスト。",
                "order": 2,
            },
            {
                "name": "Priya Adhikari",
                "name_ja": "プリヤ・アディカリ",
                "name_ne": "प्रिया अधिकारी",
                "role_en": "Visa & Documentation Expert",
                "role_ja": "ビザ・書類専門家",
                "role_ne": "भिसा र कागजात विशेषज्ञ",
                "bio_en": "Specialist in student visa applications with expertise in Japanese immigration procedures.",
                "bio_ja": "日本の入国管理手続きに精通した留学ビザ申請のスペシャリスト。",
                "order": 3,
            },
        ]
        for m in members:
            TeamMember.objects.get_or_create(country=country, name=m["name"], defaults={**m, "is_active": True})
        self.stdout.write("  ✓ Team seeded")

    def _seed_testimonials(self, country):
        testimonials = [
            {
                "student_name": "Anil Gurung",
                "student_name_ja": "アニル・グルン",
                "student_name_ne": "अनिल गुरुङ",
                "origin_country": "Nepal",
                "origin_country_ja": "ネパール",
                "origin_country_ne": "नेपाल",
                "destination": "Waseda University, Tokyo",
                "destination_ja": "早稲田大学（東京）",
                "destination_ne": "वासेदा विश्वविद्यालय, टोकियो",
                "rating": 5,
                "quote_en": "3 Star Educational Consultant made my dream of studying in Japan a reality. Their visa support was flawless.",
                "quote_ja": "3スターのサポートで日本留学の夢が叶いました。ビザサポートは完璧でした。",
                "quote_ne": "3 Star Educational Consultant ले मेरो जापानमा पढ्ने सपना साकार पार्यो।",
                "service_used": "Study Abroad + Visa",
                "service_used_ja": "留学＋ビザサポート",
                "service_used_ne": "विदेश अध्ययन + भिसा सहायता",
                "is_featured": True,
            },
            {
                "student_name": "Sita Rai",
                "student_name_ja": "シタ・ライ",
                "student_name_ne": "सिता राई",
                "origin_country": "Nepal",
                "origin_country_ja": "ネパール",
                "origin_country_ne": "नेपाल",
                "destination": "Osaka Language School",
                "destination_ja": "大阪日本語学校",
                "destination_ne": "ओसाका भाषा विद्यालय",
                "rating": 5,
                "quote_en": "I passed JLPT N3 on my first attempt thanks to the structured classes here.",
                "quote_ja": "ここの体系的なクラスのおかげで、初めてのJLPT N3に合格しました。",
                "quote_ne": "यहाँको व्यवस्थित कक्षाहरूको कारण मैले पहिलो प्रयासमा JLPT N3 पास गरें।",
                "service_used": "JLPT Preparation",
                "service_used_ja": "JLPT対策",
                "service_used_ne": "JLPT तयारी",
                "is_featured": True,
            },
            {
                "student_name": "Bibek Thapa",
                "student_name_ja": "ビベック・タパ",
                "student_name_ne": "बिबेक थापा",
                "origin_country": "Nepal",
                "origin_country_ja": "ネパール",
                "origin_country_ne": "नेपाल",
                "destination": "Tokyo Institute of Technology",
                "destination_ja": "東京工業大学",
                "destination_ne": "टोकियो प्रौद्योगिकी संस्थान",
                "rating": 5,
                "quote_en": "Got a full scholarship with their guidance. I highly recommend 3 Star to everyone.",
                "quote_ja": "彼らのサポートで全額奨学金を獲得しました。3スターを強くお勧めします。",
                "service_used": "Scholarship Guidance",
                "service_used_ja": "奨学金サポート",
                "service_used_ne": "छात्रवृत्ति मार्गदर्शन",
                "is_featured": True,
            },
        ]
        for t in testimonials:
            Testimonial.objects.get_or_create(
                country=country, student_name=t["student_name"],
                defaults={**t, "is_active": True}
            )
        self.stdout.write("  ✓ Testimonials seeded")

    def _seed_news(self, country):
        news = [
            {
                "type": "news", "slug": "jlpt-december-2024-registration",
                "title_en": "JLPT December 2024 Registration Now Open",
                "title_ja": "JLPT 2024年12月試験の申込受付開始",
                "excerpt_en": "Registration for the December 2024 JLPT examination is now open. Apply before the deadline.",
                "is_featured": True, "is_active": True,
            },
            {
                "type": "event", "slug": "japan-university-fair-2024",
                "title_en": "Japan University Fair 2024 — Kathmandu",
                "title_ja": "日本大学フェア2024 — カトマンズ",
                "excerpt_en": "Meet representatives from 20+ Japanese universities at our annual education fair.",
                "is_featured": True, "is_active": True,
            },
            {
                "type": "news", "slug": "new-scholarship-program-2024",
                "title_en": "New Monbukagakusho Scholarship Applications Open",
                "title_ja": "文部科学省奨学金の新規申請受付開始",
                "excerpt_en": "The Japanese government scholarship (MEXT) applications for 2024 are now open.",
                "is_featured": False, "is_active": True,
            },
        ]
        for n in news:
            NewsEvent.objects.get_or_create(slug=n["slug"], defaults={**n, "country": country})
        self.stdout.write("  ✓ News & Events seeded")
