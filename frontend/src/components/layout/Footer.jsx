import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaLine,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";
import { useSite } from "../../context/SiteContext";
import { useLang } from "../../hooks/useLang";

const SNS_ICONS = {
  sns_facebook: {
    icon: FaFacebookF,
    label: "Facebook",
    bg: "#1877F2",
  },

  sns_instagram: {
    icon: FaInstagram,
    label: "Instagram",
    bg: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF,#515BD4)",
  },

  sns_twitter: {
    icon: FaXTwitter,
    label: "X / Twitter",
    bg: "#000000",
  },

  sns_youtube: {
    icon: FaYoutube,
    label: "YouTube",
    bg: "#FF0000",
  },

  sns_line: {
    icon: FaLine,
    label: "LINE",
    bg: "#06C755",
  },

  sns_linkedin: {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    bg: "#0A66C2",
  },

  sns_tiktok: {
    icon: FaTiktok,
    label: "TikTok",
    bg: "#111111",
  },

  sns_whatsapp: {
    icon: FaWhatsapp,
    label: "WhatsApp",
    bg: "#25D366",
    link: (number) => `https://wa.me/${number.replace(/\D/g, "")}`,
  },
};

export default function Footer() {
  const { config, nav } = useSite();
  const tl = useLang();
  const { t, i18n } = useTranslation();
  const lang =
    i18n.language?.slice(0, 2) || localStorage.getItem("i18nextLng") || "en";

  const getLabel = (item) => item[`label_${lang}`] || item.label_en;

  const findKeyObj = (key) =>
    nav.find((item) => {
      return item.label_en === key;
    });

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
                alt={tl(config, "site_name") || ""}
                className="h-16 mb-5 object-contain"
              />
            ) : (
              <h2
                className="text-2xl font-extrabold mb-4"
                style={{ color: "var(--color-accent)" }}
              >
                {tl(config, "site_name")}
              </h2>
            )}

            {config?.tagline && (
              <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-xs">
                {tl(config, "tagline")}
              </p>
            )}

            {/* SNS icons — only shown when URLs are set in DB */}
            <div className="flex items-center gap-3 flex-wrap">
              {activeSns.map(({ url, icon: Icon, label, bg }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:brightness-110 shadow-md flex-shrink-0"
                  style={{
                    background: bg,
                    color: "#fff",
                  }}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick links */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span
                className="w-4 h-0.5 rounded-full inline-block"
                style={{ background: "var(--color-accent)" }}
              />
              {t("footer.title.quicklink")}
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
              {tl(findKeyObj("Contact") || {}, "label")}
            </h3>
            <ul className="space-y-4 text-sm text-slate-300">
              {config?.address_line1 && (
                <li className="flex items-start gap-3">
                  <MapPin
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "var(--color-accent)" }}
                  />
                  <span>
                    {tl(config, "address_line1")}
                    {config.address_line2 && (
                      <>
                        <br />
                        {tl(config, "address_line2")}
                      </>
                    )}
                    {config.city && (
                      <>
                        <br />
                        {tl(config, "city")} {tl(config, "postal_code")}
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
              {t("footer.cta.title")}
            </h3>
            <p className="text-slate-300 text-sm">{t("footer.cta.subtitle")}</p>
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
            {t("footer.cta.apply")} →
          </Link>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            {tl(config, "copyright_text") ||
              `© ${new Date().getFullYear()} ${tl(config, "site_name")}. All rights reserved.`}
          </p>
          <span className="hidden sm:block opacity-40">|</span>
          <p className="text-xs text-slate-400">
            <a
              href="mailto:jamescena61@gmail.com"
              className="text-orange-400 hover:text-orange-300 underline"
            >
              {t("footer.developer", "Designed & Developed by Sajan Shrestha")}
            </a>
          </p>
          <span className="hidden sm:block opacity-40">|</span>
          <div className="flex gap-5">
            {nav.map((item) => {
              return (
                <Link
                  key={item.id}
                  to={item.url}
                  target={item.open_in_new_tab ? "_blank" : undefined}
                  className="hover:text-white transition-colors"
                >
                  {getLabel(item)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
