from django.http import HttpResponse
from django.utils import timezone
from apps.sites_config.models import Country
from apps.content.models import NewsEvent


def sitemap_xml(request):
    """
    Generates a dynamic sitemap.xml for all active countries and pages.
    """
    countries = Country.objects.filter(is_active=True)
    now = timezone.now().strftime("%Y-%m-%d")

    urls = []

    for country in countries:
        try:
            base = country.config.canonical_url.rstrip("/") if hasattr(country, "config") and country.config.canonical_url else ""
        except Exception:
            base = ""

        if not base:
            continue

        # Static pages
        static_pages = [
            ("", "1.0", "weekly"),
            ("/about", "0.8", "monthly"),
            ("/services", "0.9", "weekly"),
            ("/courses", "0.9", "weekly"),
            ("/gallery", "0.7", "weekly"),
            ("/news", "0.8", "daily"),
            ("/contact", "0.7", "monthly"),
        ]
        for path, priority, changefreq in static_pages:
            urls.append(f"""  <url>
    <loc>{base}{path}</loc>
    <lastmod>{now}</lastmod>
    <changefreq>{changefreq}</changefreq>
    <priority>{priority}</priority>
  </url>""")

        # News/Events detail pages
        news = NewsEvent.objects.filter(country=country, is_active=True)
        for item in news:
            date = item.published_at.strftime("%Y-%m-%d")
            urls.append(f"""  <url>
    <loc>{base}/news/{item.slug}</loc>
    <lastmod>{date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>""")

    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    xml += "\n".join(urls)
    xml += "\n</urlset>"

    return HttpResponse(xml, content_type="application/xml")
