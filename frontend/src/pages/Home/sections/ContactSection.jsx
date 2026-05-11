import { useTranslation } from "react-i18next";
import { useSite } from "../../../context/SiteContext";
import SectionTitle from "../../../components/ui/SectionTitle";

export default function ContactSection() {
  const { config } = useSite();
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-20" style={{ background: "#f8f9ff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t("contact.section_title", "Find Us")}
          subtitle={t("contact.section_subtitle", "Visit our office or get in touch")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact details */}
          <div className="space-y-5">
            {[
              { label: t("contact.address", "Address"), value: [config?.address_line1, config?.address_line2, config?.city].filter(Boolean).join(", ") },
              { label: t("contact.phone", "Phone"),   value: config?.phone, href: `tel:${config?.phone}` },
              { label: t("contact.email", "Email"),   value: config?.email, href: `mailto:${config?.email}` },
            ].filter((i) => i.value).map(({ label, value, href }) => (
              <div key={label} className="flex gap-4">
                <span className="text-sm font-semibold min-w-[70px]" style={{ color: "var(--color-accent)" }}>
                  {label}
                </span>
                {href ? (
                  <a href={href} className="text-sm hover:underline" style={{ color: "var(--color-primary)" }}>
                    {value}
                  </a>
                ) : (
                  <span className="text-sm" style={{ color: "var(--color-primary)" }}>{value}</span>
                )}
              </div>
            ))}
          </div>

          {/* Google Maps embed */}
          <div className="rounded-xl overflow-hidden shadow-sm h-64 lg:h-auto min-h-64 bg-gray-100">
            {config?.google_maps_embed_url ? (
              <iframe
                src={config.google_maps_embed_url}
                width="100%" height="100%"
                style={{ border: 0, minHeight: "260px" }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office location"
              />
            ) : (
              <div className="h-64 flex items-center justify-center text-sm text-gray-400">
                Map will appear here once Google Maps URL is set in Admin
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
