from .base import *  # noqa
import os

DEBUG = False

ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "").split(",")

# ─── Override Static & Media paths for Docker ──────────────
# base.py uses BASE_DIR/staticfiles — in Docker we need /app/
STATIC_ROOT = "/app/staticfiles"
MEDIA_ROOT = "/app/media"

# ─── Security (Cloudflare handles SSL) ─────────────────────
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
CSRF_TRUSTED_ORIGINS = [
    "https://3stargrp.com",
    "https://www.3stargrp.com",
]