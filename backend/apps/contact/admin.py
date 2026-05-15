from django.contrib import admin
from .models import ContactSubmission


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display  = ["name", "email", "phone", "service", "country", "status", "submitted_at"]
    list_filter   = ["status", "country", "submitted_at"]
    search_fields = ["name", "email", "message"]
    readonly_fields = ["name", "email", "phone", "service", "message",
                    "country", "ip_address", "submitted_at"]
    list_editable = ["status"]
    ordering      = ["-submitted_at"]
    date_hierarchy = "submitted_at"

    fieldsets = (
        ("Submission", {
            "fields": ("name", "email", "phone", "service", "country", "submitted_at", "ip_address"),
        }),
        ("Message", {
            "fields": ("message",),
        }),
        ("Admin", {
            "fields": ("status", "admin_notes"),
        }),
    )
