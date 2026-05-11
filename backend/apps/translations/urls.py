from django.urls import path
from . import views

urlpatterns = [
    path("translations/", views.translation_dict, name="translations"),
]
