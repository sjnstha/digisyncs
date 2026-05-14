import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useSite } from "../../../context/SiteContext";
import { useLang } from "../../../hooks/useLang";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import SectionTitle from "../../../components/ui/SectionTitle";

export default function ContactSection() {
  const { config } = useSite();
  const { t } = useTranslation();
  const tl = useLang();
  const ref = useScrollAnimation();
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "#f8f9ff" }}
    >
      {/* Accent blob */}
      <div
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none opacity-5"
        style={{ background: "var(--color-primary)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t("home.contact.section_title", "Find Us")}
          subtitle={t(
            "home.contact.section_subtitle",
            "Visit our office or reach out — we respond within 24 hours",
          )}
        />

        <div
          ref={ref}
          className="scroll-fade grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
        >
          {/* Left — contact info + CTA */}
          <div>
            <div className="space-y-5 mb-8">
              <ul className="space-y-5">
                {config?.address_line1 && (
                  <li className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "var(--color-primary)",
                        color: "#fff",
                      }}
                    >
                      <MapPin className="w-5 h-5" />
                    </div>

                    <div>
                      <p
                        className="text-xs font-bold uppercase tracking-widest mb-1"
                        style={{ color: "var(--color-accent)" }}
                      >
                        {t("home.contact.address")}
                      </p>

                      <p
                        className="text-sm font-medium leading-relaxed"
                        style={{ color: "var(--color-primary)" }}
                      >
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
                      </p>
                    </div>
                  </li>
                )}

                {config?.phone && (
                  <li className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "var(--color-primary)",
                        color: "#fff",
                      }}
                    >
                      <Phone className="w-5 h-5" />
                    </div>

                    <div>
                      <p
                        className="text-xs font-bold uppercase tracking-widest mb-1"
                        style={{ color: "var(--color-accent)" }}
                      >
                        {t("home.contact.phone")}
                      </p>

                      <a
                        href={`tel:${config.phone}`}
                        className="text-sm font-medium hover:underline"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {config.phone}
                      </a>
                    </div>
                  </li>
                )}

                {config?.email && (
                  <li className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "var(--color-primary)",
                        color: "#fff",
                      }}
                    >
                      <Mail className="w-5 h-5" />
                    </div>

                    <div>
                      <p
                        className="text-xs font-bold uppercase tracking-widest mb-1"
                        style={{ color: "var(--color-accent)" }}
                      >
                        {t("home.contact.email")}
                      </p>

                      <a
                        href={`mailto:${config.email}`}
                        className="text-sm font-medium hover:underline break-all"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {config.email}
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-105"
              style={{
                background: "var(--color-accent)",
                boxShadow: "0 6px 20px rgba(232,150,10,0.35)",
              }}
            >
              {t("home.contact.cta", "Get Free Consultation")} →
            </Link>
          </div>

          {/* Right — Google Maps embed */}
          <div className="rounded-2xl overflow-hidden shadow-md h-72 lg:h-80 bg-gray-100">
            {config?.google_maps_embed_url ? (
              <iframe
                src={config.google_maps_embed_url}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office location"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-2 text-gray-400">
                <span className="text-4xl">🗺️</span>
                <p className="text-sm">
                  Add Google Maps URL in Admin → Site Config
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
