from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
# from apps.core.sitemap import sitemap_xml

urlpatterns = [
    path("admin/",      admin.site.urls),
    path("api/",        include("apps.core.urls")),
    path("api/",        include("apps.sites_config.urls")),
    path("api/",        include("apps.translations.urls")),
    path("api/content/",include("apps.content.urls")),
    path("api/",        include("apps.contact.urls")),    # POST /api/contact/
    path("api/",        include("apps.gallery.urls")),    # GET  /api/gallery/JP/
    # path("sitemap.xml", sitemap_xml, name="sitemap"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
