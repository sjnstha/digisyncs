import { useTranslation } from "react-i18next";
import { useContent } from "../../../hooks/useContent";
import { fetchTeam } from "../../../api/contentApi";
import { useLang } from "../../../hooks/useLang";
import SectionTitle from "../../../components/ui/SectionTitle";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

function Avatar({ name, photoUrl }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  if (photoUrl) {
    return <img src={photoUrl} alt={name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />;
  }
  return (
    <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white"
      style={{ background: "var(--color-primary)" }}>
      {initials}
    </div>
  );
}

export default function TeamPreview() {
  const { t } = useTranslation();
  const { data: team, loading } = useContent(fetchTeam);
  const tl = useLang();

  return (
    <section className="py-16 md:py-20" style={{ background: "#f8f9ff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t("team.section_title", "Our Team")}
          subtitle={t("team.section_subtitle", "Meet the experts behind your success")}
        />

        {loading ? <LoadingSpinner /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team?.map((member) => (
              <div key={member.id} className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <Avatar name={member.name} photoUrl={member.photo_url} />
                <h3 className="font-bold text-lg mb-1" style={{ color: "var(--color-primary)" }}>
                  {member.name}
                </h3>
                <p className="text-sm font-medium mb-3" style={{ color: "var(--color-accent)" }}>
                  {tl(member, "role")}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-secondary)" }}>
                  {tl(member, "bio")}
                </p>
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                    className="inline-block mt-4 text-xs font-medium px-4 py-1 rounded-full"
                    style={{ background: "var(--color-primary)", color: "#fff" }}>
                    LinkedIn
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
