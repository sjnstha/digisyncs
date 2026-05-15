import { useTranslation } from "react-i18next";
import { useSite } from "../../context/SiteContext";
import { useContent } from "../../hooks/useContent";
import { fetchTeam } from "../../api/contentApi";
import { useLang } from "../../hooks/useLang";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import PageHero from "../../components/ui/PageHero";
import SectionTitle from "../../components/ui/SectionTitle";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

function Avatar({ name, photoUrl }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  if (photoUrl)
    return (
      <img
        src={photoUrl}
        alt={name}
        className="w-32 h-32 rounded-full object-contain object-top bg-white mx-auto mb-4 ring-4 ring-white shadow-md p-1"
      />
    );
  return (
    <div
      className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black text-white shadow-lg"
      style={{
        background: "linear-gradient(135deg, var(--color-primary), #4a5bcf)",
      }}
    >
      {initials}
    </div>
  );
}

export default function AboutPage() {
  const { t } = useTranslation();
  const { config, stats } = useSite();
  const { data: team, loading } = useContent(fetchTeam);
  const tl = useLang();
  const missionRef = useScrollAnimation();
  const valuesRef = useScrollAnimation();
  const teamRef = useScrollAnimation();

  const CONTENT = {
    integrity: {
      icon: "🌟",
      title: "Integrity",
      desc: "Honest, transparent guidance with your best interests always at heart.",
      color: "var(--color-primary)",
    },

    commitment: {
      icon: "🤝",
      title: "Commitment",
      desc: "We stay with you from your very first inquiry to post-arrival settlement.",
      color: "var(--color-accent)",
    },

    excellence: {
      icon: "🌏",
      title: "Excellence",
      desc: "Only the best schools, opportunities, and outcomes for every student.",
      color: "var(--color-primary)",
    },
  };

  return (
    <div style={{ fontFamily: "var(--font-site)" }}>
      <PageHero
        badge="OUR STORY"
        title={t("about.title", "About Us")}
        subtitle={t(
          "about.subtitle",
          "Connecting ambitious students to world-class education in Japan since 2020",
        )}
      />

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={missionRef}
            className="scroll-fade grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <span
                className="inline-block text-xs font-bold tracking-widest px-3 py-1 rounded-full mb-5"
                style={{ background: "#fff4d6", color: "var(--color-accent)" }}
              >
                {t("about.ourmission", "OUR MISSION")}
              </span>
              <h2
                className="text-3xl font-extrabold mb-5 leading-tight"
                style={{
                  color: "var(--color-primary)",
                  letterSpacing: "-0.5px",
                }}
              >
                {t(
                  "about.mission.title",
                  "We Believe Every Student Deserves World-Class Education",
                )}
              </h2>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "var(--color-secondary)" }}
              >
                {t(
                  "about.mission.body",
                  "3 Star Educational Consultant bridges the gap between aspiring students and top institutions in Japan, providing end-to-end guidance at every step — from school selection and language preparation to visa processing and post-arrival support.",
                )}
              </p>
              <blockquote
                className="border-l-4 pl-5 py-2 italic text-base font-semibold"
                style={{
                  borderColor: "var(--color-accent)",
                  color: "var(--color-primary)",
                }}
              >
                {config?.tagline && tl(config, "tagline")}
              </blockquote>
            </div>

            <div className="relative">
              <div
                className="rounded-2xl overflow-hidden shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #e8ecfa, #f8f9ff)",
                }}
              >
                {config?.logo_url ? (
                  <img
                    src={config.logo_url}
                    alt={config.site_name}
                    className="w-full max-w-sm mx-auto object-contain p-12"
                  />
                ) : (
                  <div className="h-56 flex items-center justify-center text-6xl">
                    🎓
                  </div>
                )}
              </div>
              {/* Floating stats badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-5 py-3 border border-gray-100">
                <div
                  className="font-black text-2xl"
                  style={{ color: "var(--color-accent)" }}
                >
                  {stats && stats.length > 0 && tl(stats[0], "value")}
                </div>
                <div className="text-xs font-semibold text-gray-500">
                  {stats && stats.length > 0 && tl(stats[0], "label")}
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg px-5 py-3 border border-gray-100">
                <div
                  className="font-black text-2xl"
                  style={{ color: "var(--color-primary)" }}
                >
                  {stats &&
                    stats.length > 0 &&
                    tl(stats[stats.length - 1], "value")}
                </div>
                <div className="text-xs font-semibold text-gray-500">
                  {stats &&
                    stats.length > 0 &&
                    tl(stats[stats.length - 1], "label")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: "#f8f9ff" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t("about.values.title", "Our Core Values")} />
          <div
            ref={valuesRef}
            className="scroll-fade-group grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {Object.keys(CONTENT).map((key) => {
              const v = CONTENT[key];
              return (
                <div
                  key={key}
                  className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm"
                    style={{
                      background:
                        v.color === "var(--color-accent)"
                          ? "#fff4d6"
                          : "#e8ecfa",
                    }}
                  >
                    {v.icon}
                  </div>

                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {t(`about.content.${key}.title`, v.title)}
                  </h3>

                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    {t(`about.content.${key}.desc`, v.desc)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t("home.team.section_title", "Meet Our Team")} />
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div
              ref={teamRef}
              className="scroll-fade-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {team?.map((member, i) => (
                <div
                  key={member.id}
                  className="text-center rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 relative overflow-hidden border border-gray-100"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{
                      background:
                        i % 2 === 0
                          ? "var(--color-primary)"
                          : "var(--color-accent)",
                    }}
                  />
                  <Avatar name={member.name} photoUrl={member.photo_url} />
                  <h3
                    className="font-bold text-lg"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {tl(member, "name")}
                  </h3>
                  <p
                    className="text-xs font-bold mt-1 mb-4 px-3 py-1 rounded-full inline-block"
                    style={{ background: "#fff4d6", color: "#92400e" }}
                  >
                    {tl(member, "role")}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    {tl(member, "bio")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
