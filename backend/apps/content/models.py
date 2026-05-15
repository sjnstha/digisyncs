from django.db import models
from apps.sites_config.models import Country


class Service(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="services")
    icon = models.CharField(max_length=100, default="globe",
        help_text="Icon name e.g. 'globe', 'book', 'file-text', 'star'")
    title_en = models.CharField(max_length=200)
    title_ja = models.CharField(max_length=200, blank=True)
    title_ne = models.CharField(max_length=200, blank=True)
    description_en = models.TextField()
    description_ja = models.TextField(blank=True)
    description_ne = models.TextField(blank=True)
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]
        verbose_name = "Service"
        verbose_name_plural = "Services"

    def __str__(self):
        return f"{self.title_en} ({self.country.code})"

    def get_title(self, lang="en"):
        return getattr(self, f"title_{lang}") or self.title_en

    def get_description(self, lang="en"):
        return getattr(self, f"description_{lang}") or self.description_en


class LanguageCourse(models.Model):
    LEVEL_CHOICES = [
        ("beginner", "Beginner"),
        ("elementary", "Elementary"),
        ("intermediate", "Intermediate"),
        ("upper_intermediate", "Upper Intermediate"),
        ("advanced", "Advanced"),
    ]

    LEVEL_CHOICES_JP = {
        "beginner": "初級",
        "elementary": "初級後半",
        "intermediate": "中級",
        "upper_intermediate": "上級",
        "advanced": "最上級",
    }

    LEVEL_CHOICES_NP = {
        "beginner": "शुरुआती",
        "elementary": "आधारभूत",
        "intermediate": "मध्यम",
        "upper_intermediate": "उन्नत",
        "advanced": "विशेषज्ञ",
    }

    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="courses")
    language = models.CharField(max_length=100, help_text="e.g. Japanese, English, Nepali")
    level = models.CharField(max_length=30, choices=LEVEL_CHOICES)
    level_code = models.CharField(max_length=20, blank=True,
        help_text="e.g. N5, N4, N3, N2, N1 for Japanese")
    title_en = models.CharField(max_length=200)
    title_ja = models.CharField(max_length=200, blank=True)
    title_ne = models.CharField(max_length=200, blank=True)
    description_en = models.TextField(blank=True)
    description_ja = models.TextField(blank=True)
    description_ne = models.TextField(blank=True)
    duration_weeks = models.PositiveIntegerField(null=True, blank=True)
    schedule = models.CharField(max_length=200, blank=True,
        help_text="e.g. Weekdays 9am–12pm")
    schedule_ja = models.CharField(max_length=200, blank=True,
        help_text="例: 平日 午前9時〜午後12時")
    schedule_ne = models.CharField(max_length=200, blank=True,
        help_text="उदाहरण: कार्यदिवस बिहान ९ बजे–१२ बजे")
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    price_ja = models.CharField(max_length=30, blank=True)
    price_ne = models.CharField(max_length=30, blank=True)
    currency = models.CharField(max_length=5, default="JPY")
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "level"]
        verbose_name = "Language Course"
        verbose_name_plural = "Language Courses"

    def __str__(self):
        return f"{self.language} {self.level_code or self.level} ({self.country.code})"
    
    @property
    def level_ja(self):
        return self.LEVEL_CHOICES_JP.get(self.level, self.get_level_display())

    @property
    def level_np(self):
        return self.LEVEL_CHOICES_NP.get(self.level, self.get_level_display())


class TeamMember(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="team_members")
    name = models.CharField(max_length=200)
    name_ja = models.CharField(max_length=200, blank=True)
    name_ne = models.CharField(max_length=200, blank=True)
    role_en = models.CharField(max_length=200)
    role_ja = models.CharField(max_length=200, blank=True)
    role_ne = models.CharField(max_length=200, blank=True)
    bio_en = models.TextField(blank=True)
    bio_ja = models.TextField(blank=True)
    bio_ne = models.TextField(blank=True)
    photo = models.ImageField(upload_to="team/", blank=True, null=True)
    email = models.EmailField(blank=True)
    linkedin = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]
        verbose_name = "Team Member"
        verbose_name_plural = "Team Members"

    def __str__(self):
        return f"{self.name} ({self.country.code})"


class Testimonial(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="testimonials")
    student_name = models.CharField(max_length=200)
    student_name_ja = models.CharField(max_length=200, blank=True)
    student_name_ne = models.CharField(max_length=200, blank=True)
    student_photo = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    origin_country = models.CharField(max_length=100, blank=True,
        help_text="Student's home country e.g. Nepal, Vietnam")
    origin_country_ja = models.CharField(max_length=100, blank=True,
        help_text="学生の母国（例：ネパール、ベトナム）")
    origin_country_ne = models.CharField(max_length=100, blank=True,
        help_text="विद्यार्थीको गृह देश (जस्तै: नेपाल, भियतनाम)")
    destination = models.CharField(max_length=200, blank=True,
        help_text="e.g. Waseda University, Japan")
    destination_ja = models.CharField(max_length=200, blank=True,
        help_text="例：早稲田大学（日本）")
    destination_ne = models.CharField(max_length=200, blank=True,
        help_text="उदाहरण: वासेदा विश्वविद्यालय, जापान")
    rating = models.PositiveSmallIntegerField(default=5,
        help_text="1–5 stars")
    quote_en = models.TextField()
    quote_ja = models.TextField(blank=True)
    quote_ne = models.TextField(blank=True)
    service_used = models.CharField(max_length=200, blank=True,
        help_text="e.g. Study Abroad, JLPT Preparation")
    service_used_ja = models.CharField(max_length=200, blank=True,
        help_text="例: 留学、JLPT対策")
    service_used_ne = models.CharField(max_length=200, blank=True,
        help_text="उदाहरण: विदेश अध्ययन, JLPT तयारी")
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-is_featured", "-created_at"]
        verbose_name = "Testimonial"
        verbose_name_plural = "Testimonials"

    def __str__(self):
        return f"{self.student_name} ★{self.rating} ({self.country.code})"


class NewsEvent(models.Model):
    TYPE_CHOICES = [
        ("news", "News"),
        ("event", "Event"),
    ]

    TYPE_CHOICES_JP = {
        "news": "ニュース",
        "event": "イベント",
    }

    TYPE_CHOICES_NP = {
        "news": "समाचार",
        "event": "कार्यक्रम",
    }

    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="news_events")
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default="news")
    title_en = models.CharField(max_length=300)
    title_ja = models.CharField(max_length=300, blank=True)
    title_ne = models.CharField(max_length=300, blank=True)
    excerpt_en = models.TextField(max_length=500, blank=True)
    excerpt_ja = models.TextField(max_length=500, blank=True)
    excerpt_ne = models.TextField(max_length=500, blank=True)
    body_en = models.TextField(blank=True)
    body_ja = models.TextField(blank=True)
    body_ne = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to="news/", blank=True, null=True)
    event_date = models.DateTimeField(null=True, blank=True,
        help_text="For events: when it takes place")
    event_location = models.CharField(max_length=300, blank=True)
    event_location_ja = models.CharField(max_length=300, blank=True)
    event_location_ne = models.CharField(max_length=300, blank=True)
    google_maps_url = models.URLField(blank=True)
    published_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    slug = models.SlugField(max_length=300, unique=True)

    class Meta:
        ordering = ["-published_at"]
        verbose_name = "News / Event"
        verbose_name_plural = "News & Events"

    def __str__(self):
        return f"[{self.type.upper()}] {self.title_en}"
    
    @property
    def type_ja(self):
        return self.TYPE_CHOICES_JP.get(self.type, self.get_type_display())

    @property
    def type_np(self):
        return self.TYPE_CHOICES_NP.get(self.type, self.get_type_display())


class SiteStat(models.Model):
    """Numbers shown in the stats bar e.g. '500+ Students', '10 Years'"""
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="stats")
    value = models.CharField(max_length=20, default="500+", help_text="e.g. 500+, 10, 98%")
    value_ja = models.CharField(max_length=20, default="500+", help_text="例: 500+, 10, 98%")
    value_ne = models.CharField(max_length=20, default="५००+", help_text="उदाहरण: ५००+, १०, ९८%")
    label_en = models.CharField(max_length=100)
    label_ja = models.CharField(max_length=100, blank=True)
    label_ne = models.CharField(max_length=100, blank=True)
    icon = models.CharField(max_length=100, default="users")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]
        verbose_name = "Site Stat"
        verbose_name_plural = "Site Stats"

    def __str__(self):
        return f"{self.value} {self.label_en} ({self.country.code})"
