import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSite } from "../../context/SiteContext";
import { useLang } from "../../hooks/useLang";
import { fetchGallery } from "../../api/galleryApi";
import PageHero from "../../components/ui/PageHero";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import SEO from "../../components/seo/SEO";

// ── Filter tabs ──────────────────────────────────────────────────
const FILTERS = [
  { key: "all", label: "All" },
  { key: "image", label: "📷 Photos" },
  { key: "youtube", label: "▶️ YouTube" },
  { key: "vimeo", label: "▶️ Vimeo" },
  { key: "video", label: "🎬 Videos" },
];

// ── Thumbnail for any item type ──────────────────────────────────
function getThumb(item) {
  if (item.type === "image") return item.file_url;
  if (item.type === "youtube")
    return item.youtube_thumbnail || item.thumbnail_url;
  if (item.type === "vimeo") return item.thumbnail_url;
  if (item.type === "video") return item.thumbnail_url;
  return null;
}

function isVideo(item) {
  return ["youtube", "vimeo", "video"].includes(item.type);
}

// ── Lightbox ─────────────────────────────────────────────────────
function Lightbox({ item, tl, onClose, onPrev, onNext }) {
  // Close on Escape, navigate with arrow keys
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(5,10,35,0.96)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      {/* Content box — stop propagation so clicking inside doesn't close */}
      <div
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white opacity-70 hover:opacity-100 text-2xl font-bold"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Media */}
        <div
          className="rounded-2xl overflow-hidden bg-black flex items-center justify-center"
          style={{ maxHeight: "75vh" }}
        >
          {item.type === "image" && item.file_url && (
            <img
              src={item.file_url}
              alt={tl(item, "title")}
              className="max-w-full max-h-[75vh] object-contain"
            />
          )}

          {(item.type === "youtube" || item.type === "vimeo") &&
            item.embed_url && (
              <iframe
                src={`${item.embed_url}?autoplay=1`}
                className="w-full aspect-video"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={tl(item, "title")}
                style={{ minHeight: "320px" }}
              />
            )}

          {item.type === "video" && item.file_url && (
            <video
              src={item.file_url}
              controls
              autoPlay
              className="max-w-full max-h-[75vh]"
            />
          )}
        </div>

        {/* Caption */}
        {(tl(item, "title") || tl(item, "caption")) && (
          <div className="mt-4 text-center">
            {tl(item, "title") && (
              <p className="text-white font-semibold text-lg">
                {tl(item, "title")}
              </p>
            )}
            {tl(item, "caption") && (
              <p className="text-slate-300 text-sm mt-1">
                {tl(item, "caption")}
              </p>
            )}
          </div>
        )}

        {/* Tags */}
        {item.tag_list?.length > 0 && (
          <div className="flex gap-2 justify-center mt-3 flex-wrap">
            {item.tag_list.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "#e2e8f0",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Arrow navigation */}
      {["prev", "next"].map((dir) => (
        <button
          key={dir}
          onClick={(e) => {
            e.stopPropagation();
            dir === "prev" ? onPrev() : onNext();
          }}
          className="absolute top-1/2 -translate-y-1/2 p-3 rounded-full text-white text-xl
                    opacity-60 hover:opacity-100 transition-all hover:scale-110"
          style={{
            [dir === "prev" ? "left" : "right"]: "16px",
            background: "rgba(255,255,255,0.1)",
          }}
          aria-label={dir === "prev" ? "Previous" : "Next"}
        >
          {dir === "prev" ? "←" : "→"}
        </button>
      ))}
    </div>
  );
}

// ── Grid card ────────────────────────────────────────────────────
function GalleryCard({ item, tl, t, onClick }) {
  const thumb = getThumb(item);
  const video = isVideo(item);

  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer
                shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      style={{ background: "#1a2060", aspectRatio: "4/3" }}
    >
      {/* Thumbnail */}
      {thumb ? (
        <img
          src={thumb}
          alt={tl(item, "title") || ""}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center text-4xl"
          style={{ background: "#1e2d7d" }}
        >
          {video ? "🎬" : "🖼️"}
        </div>
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(15,25,64,0.9) 0%, transparent 60%)",
        }}
      />

      {/* Video play button */}
      {video && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center
                          group-hover:scale-110 transition-transform duration-200"
            style={{
              background: "rgba(232,150,10,0.9)",
              backdropFilter: "blur(4px)",
            }}
          >
            <span className="text-white text-xl ml-1">▶</span>
          </div>
        </div>
      )}

      {/* Type badge */}
      <div className="absolute top-3 left-3">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full text-white uppercase tracking-wide"
          style={{
            background:
              item.type === "image"
                ? "var(--color-primary)"
                : "var(--color-accent)",
          }}
        >
          {item.type === "youtube"
            ? t("gallery.badge.youtube", "Youtube")
            : item.type === "vimeo"
              ? t("gallery.badge.vimeo", "Vimeo")
              : t("gallery.badge.image", item.type)}
        </span>
      </div>

      {/* Featured badge */}
      {item.is_featured && (
        <div className="absolute top-3 right-3">
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-900">
            ⭐
          </span>
        </div>
      )}

      {/* Title on hover */}
      {tl(item, "title") && (
        <div
          className="absolute bottom-0 left-0 right-0 p-4 translate-y-2
                        opacity-0 group-hover:opacity-100 group-hover:translate-y-0
                        transition-all duration-300"
        >
          <p className="text-white text-sm font-semibold line-clamp-2">
            {tl(item, "title")}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────
export default function GalleryPage() {
  const { t } = useTranslation();
  const { countryCode } = useSite();
  const tl = useLang();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null); // index of open item

  useEffect(() => {
    setLoading(true);
    fetchGallery(countryCode)
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [countryCode]);

  const filtered =
    filter === "all" ? items : items.filter((i) => i.type === filter);

  const openLightbox = useCallback((idx) => setLightbox(idx), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevItem = useCallback(
    () => setLightbox((i) => (i > 0 ? i - 1 : filtered.length - 1)),
    [filtered.length],
  );
  const nextItem = useCallback(
    () => setLightbox((i) => (i < filtered.length - 1 ? i + 1 : 0)),
    [filtered.length],
  );

  // Only show filter tabs that have at least one item
  const availableTypes = new Set(items.map((i) => i.type));
  const activeTabs = FILTERS.filter(
    (f) => f.key === "all" || availableTypes.has(f.key),
  );

  return (
    <div style={{ fontFamily: "var(--font-site)" }}>
      <SEO
        title={t("gallery.title", "Gallery")}
        description="Photos and videos from 3 Star Educational Consultant events and student life in Japan."
      />

      <PageHero
        badge="PHOTOS & VIDEOS"
        title={t("gallery.title", "Gallery")}
        subtitle={t(
          "gallery.subtitle",
          "Moments from our students' journey to Japan",
        )}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          {activeTabs.length > 1 && (
            <div className="flex flex-wrap gap-3 mb-10">
              {activeTabs.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                  style={{
                    background:
                      filter === key ? "var(--color-primary)" : "#f8f9ff",
                    color: filter === key ? "#fff" : "var(--color-primary)",
                    boxShadow:
                      filter === key
                        ? "0 4px 14px rgba(45,62,176,0.25)"
                        : "none",
                  }}
                >
                  {t(`gallery.tabs.${key}`, label)}
                  <span className="ml-2 text-xs opacity-70">
                    (
                    {key === "all"
                      ? items.length
                      : items.filter((i) => i.type === key).length}
                    )
                  </span>
                </button>
              ))}
            </div>
          )}

          {loading && <LoadingSpinner />}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-500">{error}</p>
              <p className="text-sm text-gray-400 mt-2">
                {t(
                  "gallery.noitems.error",
                  "Add gallery items in Django Admin → Gallery",
                )}
              </p>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🖼️</div>
              <p className="text-gray-400 text-sm">
                {t(
                  "gallery.noitems",
                  "No gallery items yet. Add them in Django Admin → Gallery.",
                )}
              </p>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((item, idx) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  tl={tl}
                  t={t}
                  onClick={() => openLightbox(idx)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <Lightbox
          item={filtered[lightbox]}
          tl={tl}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </div>
  );
}
