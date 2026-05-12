import { useTranslation } from "react-i18next";
import { useContent } from "../../hooks/useContent";
import { fetchCourses } from "../../api/contentApi";
import { useLang } from "../../hooks/useLang";
import SectionTitle from "../../components/ui/SectionTitle";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import PageHero from "../../components/ui/PageHero";

const LEVEL_COLORS = {
  N5: { bg: "#dcfce7", text: "#15803d", border: "#22c55e" },
  N4: { bg: "#dbeafe", text: "#1d4ed8", border: "#3b82f6" },
  N3: { bg: "#fef3c7", text: "#92400e", border: "#f59e0b" },
  N2: { bg: "#fee2e2", text: "#991b1b", border: "#ef4444" },
  N1: { bg: "#ede9fe", text: "#5b21b6", border: "#8b5cf6" },
};

export default function CoursesPage() {
  const { t } = useTranslation();
  const { data: courses, loading } = useContent(fetchCourses);
  const tl = useLang();

  return (
    <div style={{ fontFamily: "var(--font-site)" }}>
      {/* <section className="py-14" style={{ background: "var(--color-primary)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {t("courses.page_title", "Language Courses")}
          </h1>
          <p className="text-blue-100">
            {t("courses.page_subtitle", "JLPT preparation from N5 to N1")}
          </p>
        </div>
      </section> */}
      <PageHero
        title={t("about.title", "Language Courses")}
        subtitle={t("about.subtitle", "JLPT preparation from N5 to N1")}
      />
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-6">
              {courses?.map((course) => {
                const colors = LEVEL_COLORS[course.level_code] || {
                  bg: "#f8f9ff",
                  text: "#1e2d7d",
                  border: "#2d3eb0",
                };
                return (
                  <div
                    key={course.id}
                    className="rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-start"
                    style={{
                      background: colors.bg,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <div className="flex-shrink-0 text-center">
                      <div
                        className="text-3xl font-black"
                        style={{ color: colors.text }}
                      >
                        {course.level_code}
                      </div>
                      <div
                        className="text-xs font-medium mt-1"
                        style={{ color: colors.text }}
                      >
                        {course.language}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2
                        className="font-bold text-lg mb-2"
                        style={{ color: colors.text }}
                      >
                        {tl(course, "title")}
                      </h2>
                      {tl(course, "description") && (
                        <p
                          className="text-sm leading-relaxed mb-3"
                          style={{ color: colors.text, opacity: 0.8 }}
                        >
                          {tl(course, "description")}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm">
                        {course.duration_weeks && (
                          <span style={{ color: colors.text }}>
                            ⏱ {course.duration_weeks} weeks
                          </span>
                        )}
                        {course.schedule && (
                          <span style={{ color: colors.text }}>
                            📅 {course.schedule}
                          </span>
                        )}
                        {course.price && (
                          <span
                            className="font-bold"
                            style={{ color: colors.text }}
                          >
                            ¥{Number(course.price).toLocaleString()}{" "}
                            {course.currency}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
