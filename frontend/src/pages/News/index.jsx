import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContent } from "../../hooks/useContent";
import { fetchNewsAll } from "../../api/contentApi";
import { useLang } from "../../hooks/useLang";
import SectionTitle from "../../components/ui/SectionTitle";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

function NewsCard({ item, tl }) {
  const date = new Date(item.event_date || item.published_at).toLocaleDateString();
  const isEvent = item.type === "event";

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100">
      {item.cover_image_url ? (
        <img src={item.cover_image_url} alt={tl(item, "title")}
          className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 flex items-center justify-center text-4xl"
          style={{ background: isEvent ? "#fff4d6" : "#e8ecfa" }}>
          {isEvent ? "📅" : "📰"}
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: isEvent ? "var(--color-accent)" : "var(--color-primary)",
              color: "#fff"
            }}>
            {isEvent ? "Event" : "News"}
          </span>
          <span className="text-xs text-gray-400">{date}</span>
          {item.is_featured && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
              Featured
            </span>
          )}
        </div>
        <h3 className="font-bold text-base mb-2 line-clamp-2" style={{ color: "var(--color-primary)" }}>
          {tl(item, "title")}
        </h3>
        <p className="text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: "var(--color-secondary)" }}>
          {tl(item, "excerpt")}
        </p>
        {isEvent && item.event_location && (
          <p className="text-xs text-gray-400 mb-3">📍 {item.event_location}</p>
        )}
        <Link to={`/news/${item.slug}`}
          className="inline-block text-sm font-semibold hover:underline"
          style={{ color: "var(--color-primary)" }}>
          Read more →
        </Link>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const { t } = useTranslation();
  const { data, loading } = useContent(fetchNewsAll);
  const tl = useLang();
  const [filter, setFilter] = useState("all");

  const filtered = data?.filter((item) => filter === "all" || item.type === filter) || [];

  return (
    <div style={{ fontFamily: "var(--font-site)" }}>
      <section className="py-14" style={{ background: "var(--color-primary)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {t("news.title", "News & Events")}
          </h1>
          <p className="text-blue-100">{t("news.subtitle", "Stay updated with the latest from 3 Star")}</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex gap-3 mb-8">
            {["all", "news", "event"].map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-colors capitalize"
                style={{
                  background: filter === f ? "var(--color-primary)" : "#f8f9ff",
                  color: filter === f ? "#fff" : "var(--color-primary)",
                }}>
                {f === "all" ? "All" : f === "news" ? "News" : "Events"}
              </button>
            ))}
          </div>

          {loading ? <LoadingSpinner /> : (
            filtered.length === 0 ? (
              <p className="text-center py-16 text-gray-400">No items found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((item) => (
                  <NewsCard key={item.id} item={item} tl={tl} />
                ))}
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}
