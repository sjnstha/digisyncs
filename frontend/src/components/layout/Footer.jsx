import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSite } from "../../context/SiteContext";

const SNS_ICONS = {
  sns_facebook:  { icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z", label: "Facebook" },
  sns_instagram: { icon: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z", label: "Instagram" },
  sns_twitter:   { icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z", label: "Twitter" },
  sns_youtube:   { icon: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V9l5.75 3-5.75 3.02z", label: "YouTube" },
  sns_line:      { icon: "M12 2C6.48 2 2 6.02 2 11c0 4.17 2.85 7.68 6.84 8.71l.56.15v2.86l3.42-1.91c.36.05.73.08 1.18.08 5.52 0 10-4.02 10-9C22 6.02 17.52 2 12 2z", label: "LINE" },
  sns_linkedin:  { icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z", label: "LinkedIn" },
};

export default function Footer() {
  const { config, nav } = useSite();
  const { i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) || "en";

  const getLabel = (item) => item[`label_${lang}`] || item.label_en;

  const snsList = Object.entries(SNS_ICONS)
    .filter(([key]) => config?.[key])
    .map(([key, meta]) => ({ url: config[key], ...meta }));

  return (
    <footer
      style={{ backgroundColor: "#0f1940", color: "#e2e8f0", fontFamily: "var(--font-site)" }}
    >
      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Column 1 — Brand */}
          <div>
            {config?.logo_url
              ? <img src={config.logo_url} alt={config.site_name} className="h-14 mb-4 object-contain" />
              : <p className="text-xl font-bold mb-2" style={{ color: "var(--color-accent)" }}>{config?.site_name}</p>
            }
            {config?.tagline && (
              <p className="text-sm text-slate-400 mb-4">{config.tagline}</p>
            )}
            {/* SNS icons */}
            <div className="flex gap-3 mt-2">
              {snsList.map(({ url, icon, label }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-full transition-colors"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
                    strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Nav links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.id}>
                  <Link to={item.url}
                    className="text-sm text-slate-400 hover:text-white transition-colors">
                    {getLabel(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {config?.address_line1 && <li>{config.address_line1}</li>}
              {config?.address_line2 && <li>{config.address_line2}</li>}
              {config?.city && <li>{config.city} {config.postal_code}</li>}
              {config?.phone && (
                <li>
                  <a href={`tel:${config.phone}`} className="hover:text-white transition-colors">
                    {config.phone}
                  </a>
                </li>
              )}
              {config?.email && (
                <li>
                  <a href={`mailto:${config.email}`} className="hover:text-white transition-colors">
                    {config.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-slate-500">
          {config?.copyright_text || `© ${new Date().getFullYear()} ${config?.site_name}. All rights reserved.`}
        </div>
      </div>
    </footer>
  );
}
