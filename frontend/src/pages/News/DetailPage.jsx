import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSite } from "../../context/SiteContext";
import { useLang } from "../../hooks/useLang";
import { fetchNewsDetail, fetchNewsAll } from "../../api/contentApi";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

// ── Related card ─────────────────────────────────────────────────
function RelatedCard({ item, tl }) {
  const isEvent = item.type === "event";
  const date = new Date(
    item.event_date || item.published_at,
  ).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      to={`/news/${item.slug}`}
      className="group flex gap-4 p-4 rounded-xl border border-gray-100
                hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 bg-white"
    >
      {/* Thumb */}
      <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
        {item.cover_image_url ? (
          <img
            src={item.cover_image_url}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-2xl"
            style={{ background: isEvent ? "#fff4d6" : "#e8ecfa" }}
          >
            {isEvent ? "📅" : "📰"}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full text-white inline-block mb-1"
          style={{
            background: isEvent
              ? "var(--color-accent)"
              : "var(--color-primary)",
          }}
        >
          {isEvent ? "Event" : "News"}
        </span>
        <p
          className="text-sm font-semibold line-clamp-2 leading-snug"
          style={{ color: "var(--color-primary)" }}
        >
          {tl(item, "title")}
        </p>
        <p className="text-xs text-gray-400 mt-1">{date}</p>
      </div>
    </Link>
  );
}

// ── Main page ─────────────────────────────────────────────────────
export default function NewsDetailPage() {
  const { slug } = useParams();
  const { countryCode } = useSite();
  const { t } = useTranslation();
  const tl = useLang();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    window.scrollTo({ top: 0, behavior: "instant" });

    fetchNewsDetail(countryCode, slug)
      .then((data) => {
        setItem(data);
        // Fetch related items (same type, different slug)
        return fetchNewsAll(countryCode).then((all) => {
          setRelated(
            all
              .filter((n) => n.slug !== slug && n.type === data.type)
              .slice(0, 3),
          );
        });
      })
      .catch((err) => {
        setError(err?.response?.status === 404 ? "not_found" : err.message);
      })
      .finally(() => setLoading(false));
  }, [slug, countryCode]);

  if (loading) return <LoadingSpinner fullPage />;

  // 404 state
  if (error === "not_found" || !item) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-6xl">📭</div>
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          Article not found
        </h1>
        <p className="text-gray-500 text-sm">
          This article may have been removed or the URL is incorrect.
        </p>
        <Link
          to="/news"
          className="mt-2 px-6 py-2.5 rounded-xl font-bold text-white"
          style={{ background: "var(--color-primary)" }}
        >
          ← Back to News
        </Link>
      </div>
    );
  }

  const isEvent = item.type === "event";
  const publishDate = new Date(
    item.event_date || item.published_at,
  ).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const bodyText = tl(item, "body");

  return (
    <div style={{ fontFamily: "var(--font-site)" }}>
      {/* ── Hero banner ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(125deg, #0f1940 0%, #1e2d7d 60%, #2d3eb0 100%)",
        }}
      >
        {/* Cover image as background */}
        {item.cover_image_url && (
          <>
            <img
              src={item.cover_image_url}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(15,25,64,0.9) 40%, rgba(15,25,64,0.5) 100%)",
              }}
            />
          </>
        )}

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-blue-300 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>›</span>
            <Link to="/news" className="hover:text-white transition-colors">
              News & Events
            </Link>
            <span>›</span>
            <span className="text-white/60 truncate max-w-[200px]">
              {tl(item, "title")}
            </span>
          </div>

          {/* Type + date */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full text-white"
              style={{
                background: isEvent
                  ? "var(--color-accent)"
                  : "rgba(255,255,255,0.2)",
              }}
            >
              {isEvent ? "📅 Event" : "📰 News"}
            </span>
            <span className="text-sm text-blue-200">{publishDate}</span>
            {item.is_featured && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-900">
                ⭐ Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
            style={{ letterSpacing: "-0.5px", maxWidth: "800px" }}
          >
            {tl(item, "title")}
          </h1>

          {/* Excerpt */}
          {tl(item, "excerpt") && (
            <p className="text-lg text-blue-100 leading-relaxed max-w-2xl">
              {tl(item, "excerpt")}
            </p>
          )}

          {/* Event-specific info */}
          {isEvent && (item.event_location || item.event_date) && (
            <div className="mt-6 flex flex-wrap gap-4">
              {item.event_date && (
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5">
                  <span className="text-lg">📅</span>
                  <div>
                    <p className="text-xs text-blue-200 font-medium">Date</p>
                    <p className="text-sm text-white font-semibold">
                      {new Date(item.event_date).toLocaleString(undefined, {
                        dateStyle: "full",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                </div>
              )}
              {item.event_location && (
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5">
                  <span className="text-lg">📍</span>
                  <div>
                    <p className="text-xs text-blue-200 font-medium">
                      Location
                    </p>
                    <p className="text-sm text-white font-semibold">
                      {item.event_location}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Article body */}
            <article className="lg:col-span-2">
              {/* Cover image (repeated below hero for better reading) */}
              {item.cover_image_url && (
                <div className="mb-8 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={item.cover_image_url}
                    alt={tl(item, "title")}
                    className="w-full max-h-96 object-cover"
                  />
                </div>
              )}

              {/* Body text */}
              {bodyText ? (
                <div
                  className="prose prose-lg max-w-none"
                  style={{
                    color: "var(--color-text)",
                    lineHeight: 1.85,
                    fontSize: "1.05rem",
                  }}
                >
                  {/* Render body as plain text with paragraph breaks */}
                  {bodyText.split("\n\n").map((para, i) =>
                    para.trim() ? (
                      <p
                        key={i}
                        className="mb-5 leading-relaxed"
                        style={{ color: "#374151" }}
                      >
                        {para.trim()}
                      </p>
                    ) : null,
                  )}
                </div>
              ) : (
                /* No body — show excerpt as main content */
                tl(item, "excerpt") && (
                  <p
                    className="text-lg leading-relaxed"
                    style={{ color: "#374151" }}
                  >
                    {tl(item, "excerpt")}
                  </p>
                )
              )}

              {/* CTA for events */}
              {isEvent && (
                <div
                  className="mt-10 p-6 rounded-2xl text-center"
                  style={{ background: "#fff4d6", border: "1px solid #f5b832" }}
                >
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ color: "#92400e" }}
                  >
                    Interested in attending?
                  </h3>
                  <p className="text-sm text-amber-800 mb-4">
                    Contact us to register or find out more about this event.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white"
                    style={{ background: "var(--color-accent)" }}
                  >
                    Register Now →
                  </Link>
                </div>
              )}

              {/* Back button */}
              <div className="mt-12 pt-6 border-t border-gray-100">
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:gap-3 duration-200"
                  style={{ color: "var(--color-primary)" }}
                >
                  ← {t("news.back", "Back to News")}
                </button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Share */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3
                  className="font-bold text-sm mb-4 uppercase tracking-wide"
                  style={{ color: "var(--color-primary)" }}
                >
                  Share
                </h3>
                <div className="flex gap-2">
                  {[
                    {
                      label: "Facebook",
                      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                      color: "#1877f2",
                      icon: "f",
                    },
                    {
                      label: "X",
                      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(tl(item, "title"))}`,
                      color: "#000",
                      icon: "𝕏",
                    },
                    {
                      label: "LINE",
                      href: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`,
                      color: "#06c755",
                      icon: "L",
                    },
                  ].map(({ label, href, color, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Share on ${label}`}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold
                                hover:scale-110 transition-transform duration-200"
                      style={{ background: color }}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Related articles */}
              {related.length > 0 && (
                <div>
                  <h3
                    className="font-bold text-sm mb-4 uppercase tracking-wide"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {isEvent ? "More Events" : "Related News"}
                  </h3>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <RelatedCard key={r.id} item={r} tl={tl} />
                    ))}
                  </div>
                </div>
              )}

              {/* Contact CTA */}
              <div
                className="rounded-2xl p-6 text-white text-center"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary), #4a5bcf)",
                }}
              >
                <div className="text-3xl mb-3">🎓</div>
                <h3 className="font-bold mb-2">Ready to start?</h3>
                <p className="text-sm opacity-80 mb-4">
                  Get a free consultation with our experts today.
                </p>
                <Link
                  to="/contact"
                  className="inline-block px-5 py-2 rounded-xl font-bold text-sm"
                  style={{ background: "var(--color-accent)", color: "#fff" }}
                >
                  Free Consultation →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
