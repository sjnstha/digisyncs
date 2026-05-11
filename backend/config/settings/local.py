from .base import *  # noqa
from dotenv import load_dotenv

load_dotenv()

DEBUG = True
ALLOWED_HOSTS = ["*"]  # ← add this line

# DRF: allow browsable API in dev
REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"] = [  # noqa: F405
    "rest_framework.renderers.JSONRenderer",
    "rest_framework.renderers.BrowsableAPIRenderer",
]

# Relax CORS in development
CORS_ALLOW_ALL_ORIGINS = True