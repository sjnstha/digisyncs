import { useSite } from "../../../context/SiteContext";
import { useLang } from "../../../hooks/useLang";

export default function StatsBar() {
  const { stats } = useSite();
  const t = useLang();

  if (!stats.length) return null;

  return (
    <section style={{ background: "var(--color-accent)" }} className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-medium opacity-90">{t(stat, "label")}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
