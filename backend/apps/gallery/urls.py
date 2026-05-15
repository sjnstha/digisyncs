from django.urls import path
from . import views

urlpatterns = [
    path("gallery/<str:country_code>/", views.gallery_list, name="gallery-list"),
]
