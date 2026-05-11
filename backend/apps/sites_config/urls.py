from django.urls import path
from . import views

urlpatterns = [
    path("countries/", views.country_list, name="country-list"),
    path("site/<str:country_code>/", views.site_data, name="site-data"),
]
