import { useTranslation } from "react-i18next";
import { useContent } from "../../../hooks/useContent";
import { fetchTeam } from "../../../api/contentApi";
import { useLang } from "../../../hooks/useLang";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import SectionTitle from "../../../components/ui/SectionTitle";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

function Avatar({ name, photoUrl }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={name}
        className="w-32 h-32 rounded-full object-contain object-top bg-white mx-auto mb-4 ring-4 ring-white shadow-md p-1"
      />
    );
  }
  return (
    <div
      className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black text-white shadow-md ring-4 ring-white"
      style={{
        background: "linear-gradient(135deg, var(--color-primary), #4a5bcf)",
      }}
    >
      {initials}
    </div>
  );
}

export default function TeamPreview() {
  const { t } = useTranslation();
  const { data: team, loading } = useContent(fetchTeam);
  const tl = useLang();
  const titleRef = useScrollAnimation();
  const gridRef = useScrollAnimation();

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "#f8f9ff" }}
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="scroll-fade">
          <SectionTitle
            title={t("home.team.section_title", "Meet Our Team")}
            subtitle={t(
              "home.team.section_subtitle",
              "The experts behind your success story",
            )}
          />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div
            ref={gridRef}
            className="scroll-fade-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {team?.map((member, i) => (
              <div
                key={member.id}
                className="group bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Top color bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{
                    background:
                      i % 2 === 0
                        ? "var(--color-primary)"
                        : "var(--color-accent)",
                  }}
                />

                <Avatar name={tl(member, "name")} photoUrl={member.photo_url} />

                <h3
                  className="font-bold text-lg mb-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  {tl(member, "name")}
                </h3>
                <p
                  className="text-sm font-semibold mb-4 inline-block px-3 py-0.5 rounded-full"
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

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-5 text-xs font-bold px-4 py-1.5 rounded-full text-white transition-all hover:scale-105"
                    style={{ background: "var(--color-primary)" }}
                  >
                    LinkedIn ↗
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
