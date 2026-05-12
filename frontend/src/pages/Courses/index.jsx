import { useTranslation } from "react-i18next";
import { useContent } from "../../hooks/useContent";
import { fetchCourses } from "../../api/contentApi";
import { useLang } from "../../hooks/useLang";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import PageHero from "../../components/ui/PageHero";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const LEVEL_META = {
  N5: { bg: "#f0fdf4", border: "#22c55e", text: "#15803d", label: "Beginner" },
  N4: {
    bg: "#eff6ff",
    border: "#3b82f6",
    text: "#1d4ed8",
    label: "Elementary",
  },
  N3: {
    bg: "#fffbeb",
    border: "#f59e0b",
    text: "#92400e",
    label: "Intermediate",
  },
  N2: {
    bg: "#fef2f2",
    border: "#ef4444",
    text: "#991b1b",
    label: "Upper Int.",
  },
  N1: { bg: "#f5f3ff", border: "#8b5cf6", text: "#5b21b6", label: "Advanced" },
};

export default function CoursesPage() {
  const { t } = useTranslation();
  const { data: courses, loading } = useContent(fetchCourses);
  const tl = useLang();
  const listRef = useScrollAnimation();

  return (
    <div style={{ fontFamily: "var(--font-site)" }}>
      <PageHero
        badge="LANGUAGE COURSES"
        title={t("courses.page_title", "Japanese Language Courses")}
        subtitle={t(
          "courses.page_subtitle",
          "JLPT-aligned programs from complete beginner (N5) to advanced (N1)",
        )}
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div ref={listRef} className="scroll-fade-group space-y-5">
              {courses?.map((course) => {
                const m = LEVEL_META[course.level_code] || {
                  bg: "#f8f9ff",
                  border: "var(--color-primary)",
                  text: "var(--color-primary)",
                  label: "",
                };
                return (
                  <div
                    key={course.id}
                    className="rounded-2xl p-7 flex flex-col sm:flex-row gap-6 items-start hover:shadow-md transition-shadow"
                    style={{
                      background: m.bg,
                      border: `1.5px solid ${m.border}`,
                      borderLeftWidth: "5px",
                    }}
                  >
                    {/* Level badge */}
                    <div className="flex-shrink-0 text-center w-20">
                      <div
                        className="text-4xl font-black leading-none"
                        style={{ color: m.text }}
                      >
                        {course.level_code}
                      </div>
                      <div
                        className="text-xs font-semibold mt-1 px-2 py-0.5 rounded-full text-white"
                        style={{ background: m.border }}
                      >
                        {m.label}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h2
                        className="font-extrabold text-xl mb-2"
                        style={{ color: m.text }}
                      >
                        {tl(course, "title")}
                      </h2>
                      {tl(course, "description") && (
                        <p
                          className="text-sm leading-relaxed mb-4"
                          style={{ color: m.text, opacity: 0.75 }}
                        >
                          {tl(course, "description")}
                        </p>
                      )}
                      <div
                        className="flex flex-wrap gap-5 text-sm font-medium"
                        style={{ color: m.text }}
                      >
                        {course.duration_weeks && (
                          <span className="flex items-center gap-1.5">
                            ⏱ <span>{course.duration_weeks} weeks</span>
                          </span>
                        )}
                        {course.schedule && (
                          <span className="flex items-center gap-1.5">
                            📅 <span>{course.schedule}</span>
                          </span>
                        )}
                        {course.price && (
                          <span className="font-extrabold text-base">
                            ¥{Number(course.price).toLocaleString()}{" "}
                            <span className="font-normal text-xs">
                              {course.currency}
                            </span>
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
