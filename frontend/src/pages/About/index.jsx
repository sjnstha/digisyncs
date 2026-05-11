import { useTranslation } from "react-i18next";
import { useSite } from "../../context/SiteContext";
import { useContent } from "../../hooks/useContent";
import { fetchTeam } from "../../api/contentApi";
import { useLang } from "../../hooks/useLang";
import SectionTitle from "../../components/ui/SectionTitle";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

function Avatar({ name, photoUrl, size = "lg" }) {
  const dim = size === "lg" ? "w-32 h-32" : "w-20 h-20";
  const txt = size === "lg" ? "text-3xl" : "text-xl";
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  if (photoUrl) {
    return <img src={photoUrl} alt={name} className={`${dim} rounded-full object-cover mx-auto mb-4`} />;
  }
  return (
    <div className={`${dim} rounded-full mx-auto mb-4 flex items-center justify-center ${txt} font-bold text-white`}
      style={{ background: "var(--color-primary)" }}>
      {initials}
    </div>
  );
}

export default function AboutPage() {
  const { t } = useTranslation();
  const { config } = useSite();
  const { data: team, loading } = useContent(fetchTeam);
  const tl = useLang();

  return (
    <div style={{ fontFamily: "var(--font-site)" }}>

      {/* Page hero */}
      <section className="py-16" style={{ background: "var(--color-primary)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {t("about.title", "About Us")}
          </h1>
          <p className="text-blue-100 text-lg">
            {t("about.subtitle", "Connecting dreams to reality since 2010")}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--color-primary)" }}>
                {t("about.mission.title", "Our Mission")}
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--color-secondary)" }}>
                {t("about.mission.body", "We believe every student deserves access to world-class education. 3 Star Educational Consultant bridges the gap between aspiring students and top institutions in Japan, providing end-to-end guidance at every step of the journey.")}
              </p>
              <blockquote
                className="border-l-4 pl-4 italic text-base"
                style={{ borderColor: "var(--color-accent)", color: "var(--color-primary)" }}>
                "We Connect You to the World."
              </blockquote>
            </div>
            <div className="rounded-xl overflow-hidden">
              {config?.logo_url ? (
                <img src={config.logo_url} alt={config.site_name}
                  className="w-full max-w-sm mx-auto object-contain p-8"
                  style={{ background: "#f8f9ff", borderRadius: "1rem" }} />
              ) : (
                <div className="h-48 rounded-xl flex items-center justify-center"
                  style={{ background: "#f8f9ff" }}>
                  <span className="text-5xl">🎓</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16" style={{ background: "#f8f9ff" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionTitle title={t("about.values.title", "Our Values")} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "🌟", title: "Integrity",   desc: "Honest guidance with your best interests at heart." },
              { icon: "🤝", title: "Commitment",  desc: "We stay with you from application to arrival." },
              { icon: "🌏", title: "Excellence",  desc: "Only the best schools and opportunities for our students." },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-bold mb-2" style={{ color: "var(--color-primary)" }}>{v.title}</h3>
                <p className="text-sm" style={{ color: "var(--color-secondary)" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionTitle title={t("team.section_title", "Meet Our Team")} />
          {loading ? <LoadingSpinner /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team?.map((member) => (
                <div key={member.id} className="text-center rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <Avatar name={member.name} photoUrl={member.photo_url} />
                  <h3 className="font-bold text-lg" style={{ color: "var(--color-primary)" }}>{member.name}</h3>
                  <p className="text-sm font-medium mt-1 mb-3" style={{ color: "var(--color-accent)" }}>
                    {tl(member, "role")}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-secondary)" }}>
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
