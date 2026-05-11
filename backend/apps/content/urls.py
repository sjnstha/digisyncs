from django.urls import path
from . import views

urlpatterns = [
    path("<str:country_code>/services/",    views.services,          name="services"),
    path("<str:country_code>/courses/",     views.courses,           name="courses"),
    path("<str:country_code>/team/",        views.team,              name="team"),
    path("<str:country_code>/testimonials/",views.testimonials,      name="testimonials"),
    path("<str:country_code>/news/",        views.news_events,       name="news-events"),
    path("<str:country_code>/news/<slug:slug>/", views.news_event_detail, name="news-detail"),
    path("<str:country_code>/stats/",       views.stats,             name="stats"),
]
