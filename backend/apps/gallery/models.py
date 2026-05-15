from django.db import models
from apps.sites_config.models import Country


class GalleryItem(models.Model):
    TYPE_CHOICES = [
        ("image",   "Image"),
        ("youtube", "YouTube Video"),
        ("vimeo",   "Vimeo Video"),
        ("video",   "Direct Video File"),
    ]

    country     = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="gallery_items")
    type        = models.CharField(max_length=10, choices=TYPE_CHOICES, default="image")

    # For images and direct video
    file        = models.FileField(
        upload_to="gallery/", blank=True, null=True,
        help_text="Upload image or video file"
    )
    thumbnail   = models.ImageField(
        upload_to="gallery/thumbnails/", blank=True, null=True,
        help_text="Thumbnail for video items (optional — auto-generated for YouTube)"
    )

    # For YouTube / Vimeo — paste the full URL
    video_url   = models.URLField(
        blank=True,
        help_text="YouTube or Vimeo URL e.g. https://www.youtube.com/watch?v=XXXX"
    )

    title_en    = models.CharField(max_length=300, blank=True)
    title_ja    = models.CharField(max_length=300, blank=True)
    title_ne    = models.CharField(max_length=300, blank=True)
    caption_en  = models.TextField(blank=True)
    caption_ja  = models.TextField(blank=True)
    caption_ne  = models.TextField(blank=True)

    tags        = models.CharField(
        max_length=200, blank=True,
        help_text="Comma-separated tags e.g. 'event,2024,tokyo'"
    )
    is_featured = models.BooleanField(default=False)
    is_active   = models.BooleanField(default=True)
    order       = models.PositiveIntegerField(default=0)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Gallery Item"
        verbose_name_plural = "Gallery Items"

    def __str__(self):
        return f"[{self.type.upper()}] {self.title_en or 'Untitled'} ({self.country.code})"

    @property
    def embed_url(self):
        """Returns the embeddable URL for YouTube/Vimeo."""
        if self.type == "youtube" and self.video_url:
            vid_id = self._extract_youtube_id(self.video_url)
            return f"https://www.youtube.com/embed/{vid_id}" if vid_id else ""
        if self.type == "vimeo" and self.video_url:
            vid_id = self.video_url.rstrip("/").split("/")[-1]
            return f"https://player.vimeo.com/video/{vid_id}"
        return ""

    @property
    def youtube_thumbnail(self):
        """Auto-generates thumbnail URL from YouTube video ID."""
        if self.type == "youtube" and self.video_url:
            vid_id = self._extract_youtube_id(self.video_url)
            return f"https://img.youtube.com/vi/{vid_id}/hqdefault.jpg" if vid_id else ""
        return ""

    @staticmethod
    def _extract_youtube_id(url):
        import re
        patterns = [
            r"(?:v=|\/)([0-9A-Za-z_-]{11}).*",
            r"youtu\.be\/([0-9A-Za-z_-]{11})",
        ]
        for p in patterns:
            m = re.search(p, url)
            if m:
                return m.group(1)
        return None
