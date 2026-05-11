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
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=5, default="JPY")
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "level"]
        verbose_name = "Language Course"
        verbose_name_plural = "Language Courses"

    def __str__(self):
        return f"{self.language} {self.level_code or self.level} ({self.country.code})"


class TeamMember(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="team_members")
    name = models.CharField(max_length=200)
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
    student_photo = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    origin_country = models.CharField(max_length=100, blank=True,
        help_text="Student's home country e.g. Nepal, Vietnam")
    destination = models.CharField(max_length=200, blank=True,
        help_text="e.g. Waseda University, Japan")
    rating = models.PositiveSmallIntegerField(default=5,
        help_text="1–5 stars")
    quote_en = models.TextField()
    quote_ja = models.TextField(blank=True)
    quote_ne = models.TextField(blank=True)
    service_used = models.CharField(max_length=200, blank=True,
        help_text="e.g. Study Abroad, JLPT Preparation")
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


class SiteStat(models.Model):
    """Numbers shown in the stats bar e.g. '500+ Students', '10 Years'"""
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="stats")
    value = models.CharField(max_length=20, help_text="e.g. 500+, 10, 98%")
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
