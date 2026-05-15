import { useTranslation } from "react-i18next";
import { useContent } from "../../hooks/useContent";
import { fetchCourses } from "../../api/contentApi";
import { useLang } from "../../hooks/useLang";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import PageHero from "../../components/ui/PageHero";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const LEVEL_META = {
  N5: {
    bg: "#f0fdf4",
    border: "#22c55e",
    text: "#15803d",
    label: {
      en: "Beginner",
      ja: "初級",
      ne: "शुरुआती स्तर",
    },
  },
  N4: {
    bg: "#eff6ff",
    border: "#3b82f6",
    text: "#1d4ed8",
    label: {
      en: "Elementary",
      ja: "初級後半",
      ne: "आधारभूत स्तर",
    },
  },
  N3: {
    bg: "#fffbeb",
    border: "#f59e0b",
    text: "#92400e",
    label: {
      en: "Intermediate",
      ja: "中級",
      ne: "मध्यम स्तर",
    },
  },
  N2: {
    bg: "#fef2f2",
    border: "#ef4444",
    text: "#991b1b",
    label: {
      en: "Upper Intermediate",
      ja: "上級",
      ne: "उन्नत स्तर",
    },
  },
  N1: {
    bg: "#f5f3ff",
    border: "#8b5cf6",
    text: "#5b21b6",
    label: {
      en: "Advanced",
      ja: "最上級",
      ne: "विशेषज्ञ स्तर",
    },
  },
};

export default function CoursesPage() {
  const { t } = useTranslation();
  const lang =
    t.language?.slice(0, 2) || localStorage.getItem("i18nextLng") || "en";
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
          "JLPT-aligned programs from complete beginner (N5) to advanced (N2)",
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
                    <div className="flex-shrink-0 text-center w-32">
                      <div
                        className="text-4xl font-black leading-none"
                        style={{ color: m.text }}
                      >
                        {course.level_code}
                      </div>

                      <div
                        className="inline-block text-[11px] font-bold mt-2 px-4 py-1.5 rounded-full text-white leading-tight whitespace-nowrap"
                        style={{ background: m.border }}
                      >
                        {m.label[lang]}
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
                            ⏱{" "}
                            <span>
                              {course.duration_weeks}{" "}
                              {t("course.duration.weeks", "weeks")}
                            </span>
                          </span>
                        )}
                        {course.schedule && (
                          <span className="flex items-center gap-1.5">
                            📅 <span>{tl(course, "schedule")}</span>
                          </span>
                        )}
                        {course.price && (
                          <span className="font-extrabold text-base">
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
