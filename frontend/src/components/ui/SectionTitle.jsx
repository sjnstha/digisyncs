export default function SectionTitle({ title, subtitle, center = true }) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      <h2 className="text-3xl font-bold mb-3" style={{ color: "var(--color-primary)", fontFamily: "var(--font-site)" }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-base max-w-2xl mx-auto" style={{ color: "var(--color-secondary)" }}>
          {subtitle}
        </p>
      )}
      <div className="mt-3 flex justify-center gap-1" aria-hidden>
        <span className="inline-block h-1 w-12 rounded-full" style={{ background: "var(--color-primary)" }} />
        <span className="inline-block h-1 w-4 rounded-full" style={{ background: "var(--color-accent)" }} />
      </div>
    </div>
  );
}
