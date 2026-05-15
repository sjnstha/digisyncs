import { Helmet } from "react-helmet-async";
import { useSite } from "../../context/SiteContext";

/**
 * Drop this into any page to set dynamic SEO meta tags.
 * Falls back to SiteConfig values if page-specific ones aren't provided.
 *
 * Usage:
 *   <SEO title="About Us" description="Learn about 3 Star..." />
 */
export default function SEO({ title, description, image, noIndex = false }) {
  const { config, siteData } = useSite();

  const siteName = config?.site_name || "3 Star Educational Consultant";
  const pageTitle = title
    ? `${title} | ${siteName}`
    : config?.meta_title || siteName;
  const pageDesc =
    description || config?.meta_description || config?.tagline || "";
  const pageImage = image || config?.og_image_url || "";
  const canonical = config?.canonical_url || "";

  return (
    <Helmet>
      <title>{pageTitle}</title>
      {pageDesc && <meta name="description" content={pageDesc} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      {pageDesc && <meta property="og:description" content={pageDesc} />}
      {pageImage && <meta property="og:image" content={pageImage} />}
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      {pageDesc && <meta name="twitter:description" content={pageDesc} />}
      {pageImage && <meta name="twitter:image" content={pageImage} />}

      {/* Google Analytics */}
      {config?.google_analytics_id && (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${config.google_analytics_id}`}
        />
      )}
      {config?.google_analytics_id && (
        <script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${config.google_analytics_id}');
        `}</script>
      )}
    </Helmet>
  );
}
