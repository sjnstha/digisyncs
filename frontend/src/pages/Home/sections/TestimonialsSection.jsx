import { useTranslation } from "react-i18next";
import { useContent } from "../../../hooks/useContent";
import { fetchTestimonials } from "../../../api/contentApi";
import { useLang } from "../../../hooks/useLang";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import StarRating from "../../../components/ui/StarRating";
import SectionTitle from "../../../components/ui/SectionTitle";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

export default function TestimonialsSection() {
  const { t } = useTranslation();
  const { data, loading } = useContent(fetchTestimonials);
  const tl = useLang();
  const titleRef = useScrollAnimation();
  const gridRef = useScrollAnimation();
  const featured = data?.filter((d) => d.is_featured) || [];

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="scroll-fade">
          <SectionTitle
            title={t("testimonials.section_title", "Student Stories")}
            subtitle={t(
              "testimonials.section_subtitle",
              "Real results from real students — their words, not ours",
            )}
          />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div
            ref={gridRef}
            className="scroll-fade-group grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {featured.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{
                  border: "1px solid #f0f0f0",
                  borderTop: "4px solid var(--color-primary)",
                }}
              >
                {/* Quote mark decoration */}
                <div
                  className="absolute top-5 right-6 text-6xl font-serif leading-none pointer-events-none select-none"
                  style={{ color: "var(--color-primary)", opacity: 0.07 }}
                >
                  "
                </div>

                <StarRating rating={item.rating} size="sm" />

                <blockquote
                  className="mt-4 text-sm leading-relaxed italic relative z-10"
                  style={{ color: "#374151" }}
                >
                  "{tl(item, "quote")}"
                </blockquote>

                {item.service_used && (
                  <span
                    className="inline-block mt-3 text-xs px-2.5 py-0.5 rounded-full font-medium"
                    style={{ background: "#fff4d6", color: "#92400e" }}
                  >
                    {item.service_used}
                  </span>
                )}

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3">
                  {item.photo_url ? (
                    <img
                      src={item.photo_url}
                      alt={item.student_name}
                      className="w-11 h-11 rounded-full object-cover ring-2"
                      style={{ ringColor: "var(--color-accent)" }}
                    />
                  ) : (
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: "var(--color-primary)" }}
                    >
                      {item.student_name[0]}
                    </div>
                  )}
                  <div>
                    <p
                      className="font-bold text-sm"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {item.student_name}
                    </p>
                    {item.destination && (
                      <p className="text-xs text-gray-500">
                        → {item.destination}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
