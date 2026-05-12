import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSite } from "../../context/SiteContext";
import SectionTitle from "../../components/ui/SectionTitle";
import PageHero from "../../components/ui/PageHero";

export default function ContactPage() {
  const { t } = useTranslation();
  const { config } = useSite();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Phase 4: POST to /api/contact/
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "var(--font-site)" }}>
      {/* <section className="py-14" style={{ background: "var(--color-primary)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {t("contact.title", "Contact Us")}
          </h1>
          <p className="text-blue-100">
            {t("contact.subtitle", "Get a free consultation today")}
          </p>
        </div>
      </section> */}
      <PageHero
        title={t("about.title", "Contact Us")}
        subtitle={t("about.subtitle", "Get a free consultation today")}
      />

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <SectionTitle
                title={t("contact.info_title", "Get In Touch")}
                center={false}
              />
              <div className="space-y-5 mb-8">
                {[
                  {
                    emoji: "📍",
                    label: "Address",
                    value: [
                      config?.address_line1,
                      config?.address_line2,
                      config?.city,
                    ]
                      .filter(Boolean)
                      .join(", "),
                  },
                  {
                    emoji: "📞",
                    label: "Phone",
                    value: config?.phone,
                    href: `tel:${config?.phone}`,
                  },
                  {
                    emoji: "✉️",
                    label: "Email",
                    value: config?.email,
                    href: `mailto:${config?.email}`,
                  },
                ]
                  .filter((i) => i.value)
                  .map(({ emoji, label, value, href }) => (
                    <div key={label} className="flex gap-4 items-start">
                      <span className="text-2xl w-8 flex-shrink-0">
                        {emoji}
                      </span>
                      <div>
                        <p
                          className="text-xs font-semibold uppercase tracking-wide mb-1"
                          style={{ color: "var(--color-accent)" }}
                        >
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="text-sm hover:underline"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {value}
                          </a>
                        ) : (
                          <p
                            className="text-sm"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden h-56 bg-gray-100">
                {config?.google_maps_embed_url ? (
                  <iframe
                    src={config.google_maps_embed_url}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Office map"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-sm text-gray-400">
                    Map URL not set yet
                  </div>
                )}
              </div>
            </div>

            {/* Form */}
            <div>
              <SectionTitle
                title={t("contact.form_title", "Send a Message")}
                center={false}
              />
              {submitted ? (
                <div
                  className="rounded-xl p-8 text-center"
                  style={{ background: "#f0fdf4" }}
                >
                  <div className="text-4xl mb-3">✅</div>
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ color: "#15803d" }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-sm text-gray-600">
                    We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-sm underline text-gray-500"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    {
                      name: "name",
                      label: "Full Name",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "email",
                      label: "Email Address",
                      type: "email",
                      required: false,
                    },
                    {
                      name: "phone",
                      label: "Phone Number",
                      type: "tel",
                      required: true,
                    },
                  ].map(({ name, label, type, required }) => (
                    <div key={name}>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {label}{" "}
                        {required && (
                          <span style={{ color: "var(--color-accent)" }}>
                            *
                          </span>
                        )}
                      </label>
                      <input
                        type={type}
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        required={required}
                        className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2"
                        style={{
                          borderColor: "#d1d5db",
                          fontFamily: "var(--font-site)",
                        }}
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Service Interested In
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                      style={{
                        borderColor: "#d1d5db",
                        fontFamily: "var(--font-site)",
                      }}
                    >
                      <option value="">Select a service...</option>
                      <option>Study Abroad</option>
                      <option>Visa Assistance</option>
                      <option>JLPT Preparation</option>
                      <option>Scholarship Guidance</option>
                      <option>Work Visa</option>
                      <option>SSW</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Message{" "}
                      <span style={{ color: "var(--color-accent)" }}>*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none resize-none"
                      style={{
                        borderColor: "#d1d5db",
                        fontFamily: "var(--font-site)",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
                    style={{ background: "var(--color-primary)" }}
                  >
                    {t("contact.form_submit", "Send Message")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
