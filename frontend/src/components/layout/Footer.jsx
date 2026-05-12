import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail } from "lucide-react";
import { useSite } from "../../context/SiteContext";

// SVG path data for each social platform
const SNS_ICONS = {
  sns_facebook: {
    path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    label: "Facebook",
  },
  sns_instagram: {
    path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z",
    label: "Instagram",
  },
  sns_twitter: {
    path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
    label: "X / Twitter",
  },
  sns_youtube: {
    path: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V9l5.75 3-5.75 3.02z",
    label: "YouTube",
  },
  sns_line: {
    path: "M12 2C6.48 2 2 6.02 2 11c0 4.17 2.85 7.68 6.84 8.71l.56.15v2.86l3.42-1.91c.36.05.73.08 1.18.08 5.52 0 10-4.02 10-9C22 6.02 17.52 2 12 2z",
    label: "LINE",
  },
  sns_linkedin: {
    path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
    label: "LinkedIn",
  },
  sns_tiktok: {
    path: "M16 2h3a5 5 0 005 5v3a8 8 0 01-8-8v11a5 5 0 11-5-5",
    label: "TikTok",
  },
  sns_whatsapp: {
    path: "M20.52 3.48A11.82 11.82 0 0012.07 0C5.5 0 .16 5.34.16 11.91c0 2.1.55 4.15 1.6 5.96L0 24l6.33-1.66a11.84 11.84 0 005.74 1.47c6.57 0 11.91-5.34 11.91-11.91 0-3.18-1.24-6.17-3.47-8.42z",
    label: "WhatsApp",
    link: (number) => `https://wa.me/${number.replace(/\D/g, "")}`,
  },
};

export default function Footer() {
  const { config, nav } = useSite();
  const { i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) || "en";

  const getLabel = (item) => item[`label_${lang}`] || item.label_en;

  // Only show SNS icons where the URL is actually set in DB
  const activeSns = Object.entries(SNS_ICONS)
    .filter(([key]) => config?.[key])
    .map(([key, meta]) => ({
      url: meta.link ? meta.link(config[key]) : config[key],
      ...meta,
    }));

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0b1437 0%, #101b4d 45%, #17245f 100%)",
        color: "#e2e8f0",
        fontFamily: "var(--font-site)",
      }}
    >
      {/* Top orange accent line */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-accent), transparent)",
        }}
      />

      {/* Background glow */}
      <div
        className="absolute -top-32 right-0 w-[450px] h-[450px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "var(--color-accent)" }}
      />

      {/* Logo watermark */}
      {config?.logo_url && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <img
            src={config.logo_url}
            alt=""
            aria-hidden
            className="w-[420px] max-w-[70%] object-contain opacity-[0.03]"
            style={{ filter: "brightness(10)" }}
          />
        </div>
      )}

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 — Brand + SNS */}
          <div>
            {config?.logo_url ? (
              <img
                src={config.logo_url}
                alt={config.site_name}
                className="h-16 mb-5 object-contain"
              />
            ) : (
              <h2
                className="text-2xl font-extrabold mb-4"
                style={{ color: "var(--color-accent)" }}
              >
                {config?.site_name}
              </h2>
            )}

            {config?.tagline && (
              <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-xs">
                {config.tagline}
              </p>
            )}

            {/* SNS icons — only shown when URLs are set in DB */}
            {activeSns.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {activeSns.map(({ url, path, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="p-2.5 rounded-xl transition-all duration-200 hover:scale-110 hover:brightness-125"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={path}
                      />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2 — Quick links */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span
                className="w-4 h-0.5 rounded-full inline-block"
                style={{ background: "var(--color-accent)" }}
              />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.url}
                    className="text-slate-300 hover:text-white text-sm transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group"
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "var(--color-accent)" }}
                    />
                    {getLabel(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span
                className="w-4 h-0.5 rounded-full inline-block"
                style={{ background: "var(--color-accent)" }}
              />
              Contact
            </h3>
            <ul className="space-y-4 text-sm text-slate-300">
              {config?.address_line1 && (
                <li className="flex items-start gap-3">
                  <MapPin
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "var(--color-accent)" }}
                  />
                  <span>
                    {config.address_line1}
                    {config.address_line2 && (
                      <>
                        <br />
                        {config.address_line2}
                      </>
                    )}
                    {config.city && (
                      <>
                        <br />
                        {config.city} {config.postal_code}
                      </>
                    )}
                  </span>
                </li>
              )}
              {config?.phone && (
                <li className="flex items-center gap-3">
                  <Phone
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "var(--color-accent)" }}
                  />
                  <a
                    href={`tel:${config.phone}`}
                    className="hover:text-white transition-colors"
                  >
                    {config.phone}
                  </a>
                </li>
              )}
              {config?.email && (
                <li className="flex items-center gap-3">
                  <Mail
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "var(--color-accent)" }}
                  />
                  <a
                    href={`mailto:${config.email}`}
                    className="hover:text-white transition-colors break-all"
                  >
                    {config.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* ── CTA banner ── */}
        <div
          className="mt-14 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Ready to Study in Japan?
            </h3>
            <p className="text-slate-300 text-sm">
              Start your journey with a free professional consultation today.
            </p>
          </div>
          {/* ✅ Fixed: was /#contact — now /contact */}
          <Link
            to="/contact"
            className="flex-shrink-0 px-7 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 hover:brightness-110"
            style={{
              background: "var(--color-accent)",
              boxShadow: "0 4px 16px rgba(232,150,10,0.4)",
            }}
          >
            Apply Now →
          </Link>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            {config?.copyright_text ||
              `© ${new Date().getFullYear()} ${config?.site_name}. All rights reserved.`}
          </p>
          <div className="flex gap-5">
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <Link to="/news" className="hover:text-white transition-colors">
              News
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
