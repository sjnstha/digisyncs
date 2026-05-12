import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContent } from "../../../hooks/useContent";
import { fetchCourses } from "../../../api/contentApi";
import { useLang } from "../../../hooks/useLang";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import SectionTitle from "../../../components/ui/SectionTitle";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

const LEVEL_META = {
  N5: { bg: "#f0fdf4", border: "#22c55e", badge: "#22c55e", label: "Beginner" },
  N4: {
    bg: "#eff6ff",
    border: "#3b82f6",
    badge: "#3b82f6",
    label: "Elementary",
  },
  N3: {
    bg: "#fffbeb",
    border: "#f59e0b",
    badge: "#f59e0b",
    label: "Intermediate",
  },
  N2: {
    bg: "#fef2f2",
    border: "#ef4444",
    badge: "#ef4444",
    label: "Upper Int.",
  },
  N1: { bg: "#f5f3ff", border: "#8b5cf6", badge: "#8b5cf6", label: "Advanced" },
};

export default function CoursesPreview() {
  const { t } = useTranslation();
  const { data: courses, loading } = useContent(fetchCourses);
  const tl = useLang();
  const titleRef = useScrollAnimation();
  const gridRef = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="scroll-fade">
          <SectionTitle
            title={t("courses.section_title", "Language Courses")}
            subtitle={t(
              "courses.section_subtitle",
              "JLPT-aligned Japanese courses from N5 to N1",
            )}
          />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div
            ref={gridRef}
            className="scroll-fade-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
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
                      className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                      style={{ background: meta.badge }}
                    >
                      {meta.label}
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
                        <span>⏱</span> {course.duration_weeks} weeks
                      </div>
                    )}
                    {course.schedule && (
                      <div className="flex items-center gap-1.5">
                        <span>📅</span> {course.schedule}
                      </div>
                    )}
                    {course.price && (
                      <div
                        className="font-bold text-sm mt-2"
                        style={{ color: meta.badge }}
                      >
                        ¥{Number(course.price).toLocaleString()}
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
            {t("courses.view_all", "View All Courses")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
