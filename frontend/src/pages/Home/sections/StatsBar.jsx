import { useSite } from "../../../context/SiteContext";
import { useLang } from "../../../hooks/useLang";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";

export default function StatsBar() {
  const { stats } = useSite();
  const tl = useLang();
  const ref = useScrollAnimation();
  if (!stats.length) return null;

  return (
    <section
      style={{ background: "var(--color-accent)" }}
      className="py-10 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",
          backgroundSize: "60px 100%",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="scroll-fade-group grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat) => (
            <div key={stat.id} className="text-white">
              <div
                className="font-black mb-1"
                style={{
                  fontSize: "clamp(28px,3.5vw,46px)",
                  lineHeight: 1,
                  letterSpacing: "-1px",
                }}
              >
                {tl(stat, "value")} {/* 500+ */}
              </div>
              <div className="text-sm font-semibold opacity-90 tracking-wide">
                {tl(stat, "label")} {/* Students Placed or 留学生 */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
