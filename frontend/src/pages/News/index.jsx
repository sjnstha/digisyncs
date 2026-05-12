import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContent } from "../../hooks/useContent";
import { fetchNewsAll } from "../../api/contentApi";
import { useLang } from "../../hooks/useLang";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import PageHero from "../../components/ui/PageHero";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

function NewsCard({ item, tl }) {
  const isEvent = item.type === "event";
  const date = new Date(
    item.event_date || item.published_at,
  ).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
      {/* Image / placeholder */}
      {item.cover_image_url ? (
        <div className="overflow-hidden h-48">
          <img
            src={item.cover_image_url}
            alt={tl(item, "title")}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div
          className="h-48 flex items-center justify-center text-5xl"
          style={{ background: isEvent ? "#fff4d6" : "#e8ecfa" }}
        >
          {isEvent ? "📅" : "📰"}
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white"
            style={{
              background: isEvent
                ? "var(--color-accent)"
                : "var(--color-primary)",
            }}
          >
            {isEvent ? "Event" : "News"}
          </span>
          <span className="text-xs text-gray-400">{date}</span>
          {item.is_featured && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
              ⭐ Featured
            </span>
          )}
        </div>

        <h3
          className="font-extrabold text-base mb-2 leading-snug line-clamp-2"
          style={{ color: "var(--color-primary)" }}
        >
          {tl(item, "title")}
        </h3>

        {tl(item, "excerpt") && (
          <p
            className="text-sm leading-relaxed line-clamp-3 mb-4"
            style={{ color: "var(--color-secondary)" }}
          >
            {tl(item, "excerpt")}
          </p>
        )}

        {isEvent && item.event_location && (
          <p className="text-xs text-gray-400 mb-3">📍 {item.event_location}</p>
        )}

        <Link
          to={`/news/${item.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors hover:gap-3 duration-200"
          style={{ color: "var(--color-primary)" }}
        >
          Read more <span>→</span>
        </Link>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const { t } = useTranslation();
  const { data, loading } = useContent(fetchNewsAll);
  const tl = useLang();
  const gridRef = useScrollAnimation();
  const [filter, setFilter] = useState("all");

  const TABS = [
    { key: "all", label: "All" },
    { key: "news", label: "📰 News" },
    { key: "event", label: "📅 Events" },
  ];

  const filtered =
    data?.filter((item) => filter === "all" || item.type === filter) || [];

  return (
    <div style={{ fontFamily: "var(--font-site)" }}>
      <PageHero
        badge="LATEST UPDATES"
        title={t("news.title", "News & Events")}
        subtitle={t(
          "news.subtitle",
          "Stay updated with scholarships, events, and announcements",
        )}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex gap-3 mb-10">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  background:
                    filter === key ? "var(--color-primary)" : "#f8f9ff",
                  color: filter === key ? "#fff" : "var(--color-primary)",
                  boxShadow:
                    filter === key ? "0 4px 14px rgba(45,62,176,0.25)" : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              <div className="text-5xl mb-3">📭</div>
              <p className="text-sm">No items found.</p>
            </div>
          ) : (
            <div
              ref={gridRef}
              className="scroll-fade-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {filtered.map((item) => (
                <NewsCard key={item.id} item={item} tl={tl} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
