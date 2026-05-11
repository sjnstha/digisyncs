import { useTranslation } from "react-i18next";
import { useContent } from "../../../hooks/useContent";
import { fetchTestimonials } from "../../../api/contentApi";
import { useLang } from "../../../hooks/useLang";
import StarRating from "../../../components/ui/StarRating";
import SectionTitle from "../../../components/ui/SectionTitle";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

export default function TestimonialsSection() {
  const { t } = useTranslation();
  const { data, loading } = useContent(fetchTestimonials);
  const tl = useLang();

  const featured = data?.filter((t) => t.is_featured) || [];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t("testimonials.section_title", "Student Stories")}
          subtitle={t("testimonials.section_subtitle", "What our students say about us")}
        />

        {loading ? <LoadingSpinner /> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((item) => (
              <div key={item.id}
                className="rounded-xl p-6 border hover:shadow-md transition-shadow"
                style={{ borderColor: "var(--color-primary)", borderTopWidth: "4px" }}>

                <StarRating rating={item.rating} />

                <blockquote className="mt-4 text-sm leading-relaxed italic"
                  style={{ color: "var(--color-text, #0f1940)" }}>
                  "{tl(item, "quote")}"
                </blockquote>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                  {item.photo_url ? (
                    <img src={item.photo_url} alt={item.student_name}
                      className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: "var(--color-primary)" }}>
                      {item.student_name[0]}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--color-primary)" }}>
                      {item.student_name}
                    </p>
                    {item.destination && (
                      <p className="text-xs" style={{ color: "var(--color-secondary)" }}>
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
