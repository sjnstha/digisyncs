import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContent } from "../../../hooks/useContent";
import { fetchCourses } from "../../../api/contentApi";
import { useLang } from "../../../hooks/useLang";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import SectionTitle from "../../../components/ui/SectionTitle";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

const LEVEL_META = {
  N5: {
    bg: "#f0fdf4",
    border: "#22c55e",
    badge: "#22c55e",
    label: {
      en: "Beginner",
      ja: "初級",
      ne: "शुरुआती स्तर",
    },
  },
  N4: {
    bg: "#eff6ff",
    border: "#3b82f6",
    badge: "#3b82f6",
    label: {
      en: "Elementary",
      ja: "初級後半",
      ne: "आधारभूत स्तर",
    },
  },
  N3: {
    bg: "#fffbeb",
    border: "#f59e0b",
    badge: "#f59e0b",
    label: {
      en: "Intermediate",
      ja: "中級",
      ne: "मध्यम स्तर",
    },
  },
  N2: {
    bg: "#fef2f2",
    border: "#ef4444",
    badge: "#ef4444",
    label: {
      en: "Upper Intermediate",
      ja: "上級",
      ne: "उन्नत स्तर",
    },
  },
  N1: {
    bg: "#f5f3ff",
    border: "#8b5cf6",
    badge: "#8b5cf6",
    label: {
      en: "Advanced",
      ja: "最上級",
      ne: "विशेषज्ञ स्तर",
    },
  },
};

export default function CoursesPreview() {
  const { t } = useTranslation();
  const lang =
    t.language?.slice(0, 2) || localStorage.getItem("i18nextLng") || "en";

  const { data: courses, loading } = useContent(fetchCourses);
  const tl = useLang();
  const titleRef = useScrollAnimation();
  const gridRef = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="scroll-fade">
          <SectionTitle
            title={t("home.courses.section_title", "Language Courses")}
            subtitle={t(
              "home.courses.section_subtitle",
              "JLPT-aligned Japanese courses from N5 to N1",
            )}
          />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div
            ref={gridRef}
            className="scroll-fade-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {courses?.map((course) => {
              const meta = LEVEL_META[course.level_code] || {
                bg: "#f8f9ff",
                border: "var(--color-primary)",
                badge: "var(--color-primary)",
                label: "",
              };
              return (
                <div
                  key={course.id}
                  className="group rounded-2xl p-5 hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
                  style={{
                    background: meta.bg,
                    border: `1.5px solid ${meta.border}`,
                    borderTopWidth: "4px",
                  }}
                >
                  {/* Level badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-2xl font-black"
                      style={{ color: meta.badge }}
                    >
                      {course.level_code}
                    </span>
                    <span
                      // className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                      className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full text-white whitespace-nowrap"
                      style={{ background: meta.badge }}
                    >
                      {meta.label[lang]}
                    </span>
                  </div>

                  <h3
                    className="font-bold text-sm mb-3 leading-snug"
                    style={{ color: "#0f1940" }}
                  >
                    {tl(course, "title")}
                  </h3>

                  <div
                    className="space-y-1.5 text-xs"
                    style={{ color: "#64748b" }}
                  >
                    {course.duration_weeks && (
                      <div className="flex items-center gap-1.5">
                        <span>⏱</span> {course.duration_weeks}{" "}
                        {t("course.duration.weeks", "weeks")}
                      </div>
                    )}
                    {course.schedule && (
                      <div className="flex items-center gap-1.5">
                        <span>📅</span> {tl(course, "schedule")}
                      </div>
                    )}
                    {course.price && (
                      <div
                        className="font-bold text-sm mt-2"
                        style={{ color: meta.badge }}
                      >
                        {lang === "en" && (
                          <>Rs.{Number(course.price).toLocaleString()}</>
                        )}

                        {lang === "jp" && (
                          <>
                            ¥
                            {course.price_ja ||
                              Number(course.price_ja).toLocaleString()}
                          </>
                        )}

                        {lang === "ne" && (
                          <>
                            Rs.
                            {course.price_ne ||
                              Number(course.price_ne).toLocaleString()}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105"
            style={{
              background: "var(--color-accent)",
              boxShadow: "0 6px 20px rgba(232,150,10,0.35)",
            }}
          >
            {t("courses.view_all")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
