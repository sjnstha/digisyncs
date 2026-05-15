from django.db import models
from apps.sites_config.models import Country


class ContactSubmission(models.Model):
    STATUS_CHOICES = [
        ("new",         "New"),
        ("in_progress", "In Progress"),
        ("resolved",    "Resolved"),
        ("spam",        "Spam"),
    ]

    country = models.ForeignKey(
        Country, on_delete=models.SET_NULL,
        null=True, blank=True, related_name="contact_submissions"
    )
    name        = models.CharField(max_length=200)
    email       = models.EmailField()
    phone       = models.CharField(max_length=50, blank=True)
    service     = models.CharField(max_length=200, blank=True)
    message     = models.TextField()
    status      = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    admin_notes = models.TextField(blank=True, help_text="Internal notes — not shown to user")
    ip_address  = models.GenericIPAddressField(null=True, blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-submitted_at"]
        verbose_name = "Contact Submission"
        verbose_name_plural = "Contact Submissions"

    def __str__(self):
        return f"{self.name} <{self.email}> — {self.submitted_at:%Y-%m-%d %H:%M}"
