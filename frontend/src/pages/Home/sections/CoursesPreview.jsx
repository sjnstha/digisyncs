// CoursesPreview.jsx
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContent } from "../../../hooks/useContent";
import { fetchCourses } from "../../../api/contentApi";
import { useLang } from "../../../hooks/useLang";
import SectionTitle from "../../../components/ui/SectionTitle";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

export default function CoursesPreview() {
  const { t } = useTranslation();
  const { data: courses, loading } = useContent(fetchCourses);
  const tl = useLang();

  const LEVEL_COLORS = {
    N5: "#22c55e",
    N4: "#3b82f6",
    N3: "#f59e0b",
    N2: "#ef4444",
    N1: "#8b5cf6",
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t("courses.section_title", "Language Courses")}
          subtitle={t(
            "courses.section_subtitle",
            "JLPT-aligned courses from beginner to advanced",
          )}
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {courses?.map((course) => (
              <div
                key={course.id}
                className="rounded-xl border p-5 hover:shadow-md transition-all hover:-translate-y-1"
                style={{
                  borderColor:
                    LEVEL_COLORS[course.level_code] || "var(--color-primary)",
                  borderTopWidth: "4px",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-sm font-bold px-2 py-0.5 rounded text-white"
                    style={{
                      background:
                        LEVEL_COLORS[course.level_code] ||
                        "var(--color-primary)",
                    }}
                  >
                    {course.level_code}
                  </span>
                  <span className="text-xs text-gray-400">
                    {course.language}
                  </span>
                </div>
                <h3
                  className="font-semibold text-sm mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  {tl(course, "title")}
                </h3>
                {course.duration_weeks && (
                  <p className="text-xs text-gray-500 mb-1">
                    ⏱ {course.duration_weeks} weeks
                  </p>
                )}
                {course.schedule && (
                  <p className="text-xs text-gray-500 mb-3">
                    {course.schedule}
                  </p>
                )}
                {course.price && (
                  <p
                    className="text-sm font-bold"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Rs.{Number(course.price).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            to="/courses"
            className="inline-block px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            style={{ background: "var(--color-accent)", color: "#fff" }}
          >
            {t("courses.view_all", "View All Courses")}
          </Link>
        </div>
      </div>
    </section>
  );
}
