import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail } from "lucide-react";
import { useSite } from "../../context/SiteContext";
import { useLang } from "../../hooks/useLang";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import PageHero from "../../components/ui/PageHero";
import SectionTitle from "../../components/ui/SectionTitle";

import api from "../../api/client";

const CONTACT_FIELDS = [
  { name: "fullname", label: "Full Name", type: "text", required: true },
  {
    name: "emailaddress",
    label: "Email Address",
    type: "email",
    required: false,
  },
  { name: "phonenumber", label: "Phone Number", type: "tel", required: true },
];

const SERVICE_OPTIONS = [
  "Study Abroad Guidance",
  "Visa Assistance",
  "JLPT Preparation",
  "Scholarship Guidance",
  "Accommodation Support",
  "Part-time Job Support",
  "Other",
];

export default function ContactPage() {
  const { t } = useTranslation();
  const tl = useLang();
  const { config, country } = useSite();
  const formRef = useScrollAnimation();

  const EMPTY_FORM = {
    fullname: "",
    emailaddress: "",
    phonenumber: "",
    service: "",
    message: "",
  };

  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSending(true);
    setServerError("");

    try {
      // ✅ Fix 2: uses axios client — works in dev (Vite proxy) AND production
      await api.post("contact/", {
        name: form.fullname,
        email: form.emailaddress,
        phone: form.phonenumber,
        service: SERVICE_OPTIONS[form.service],
        message: form.message,
        country_code: country.code || localStorage.getItem("country") || "JP",
      });

      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch (error) {
      const msg = error?.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(" ")
        : error?.response?.data?.detail || "Failed to send. Please try again.";
      setServerError(msg);
    } finally {
      setSending(false);
    }
  };

  const contactItems = [
    {
      key: "address",
      label: t("home.contact.address"),
      value: [
        tl(config, "address_line1"),
        tl(config, "address_line2"),
        tl(config, "city"),
      ]
        .filter(Boolean)
        .join(", "),
    },
    {
      key: "phone",
      label: t("home.contact.phone"),
      value: config?.phone,
      href: `tel:${config?.phone}`,
    },
    {
      key: "email",
      label: t("home.contact.email"),
      value: config?.email,
      href: `mailto:${config?.email}`,
    },
  ].filter((i) => i.value);

  return (
    <div style={{ fontFamily: "var(--font-site)" }}>
      <PageHero
        badge="GET IN TOUCH"
        title={t("contact.title", "Reach Out to Us")}
        subtitle={t(
          "contact.subtitle",
          "Get a free consultation today — we respond within 24 hours",
        )}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* ── Left: Info + Map ── */}
            <div>
              <SectionTitle
                title={t("contact.subsection.left.title", "Get In Touch")}
                center={false}
              />

              <div className="space-y-5 mb-8">
                {contactItems.map(({ icon, key, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    {key === "address" && (
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "var(--color-primary)",
                          color: "#fff",
                        }}
                      >
                        <MapPin className="w-5 h-5" />
                      </div>
                    )}

                    {key === "phone" && (
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "var(--color-primary)",
                          color: "#fff",
                        }}
                      >
                        <Phone className="w-5 h-5" />
                      </div>
                    )}

                    {key === "email" && (
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "var(--color-primary)",
                          color: "#fff",
                        }}
                      >
                        <Mail className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <p
                        className="text-xs font-extrabold uppercase tracking-widest mb-0.5"
                        style={{ color: "var(--color-accent)" }}
                      >
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm font-medium hover:underline"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {value}
                        </a>
                      ) : (
                        <p
                          className="text-sm font-medium"
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
              <div
                className="rounded-2xl overflow-hidden shadow-md h-64"
                style={{ background: "#f8f9ff" }}
              >
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
                  <div className="h-full flex flex-col items-center justify-center gap-2 text-gray-400">
                    <span className="text-4xl">🗺️</span>
                    <p className="text-sm">Set Google Maps URL in Admin</p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div ref={formRef} className="scroll-fade">
              <SectionTitle
                title={t("contact.subsection.right.title", "Send a Message")}
                center={false}
              />

              {submitted ? (
                <div
                  className="rounded-2xl p-12 text-center border-2"
                  style={{ borderColor: "#22c55e", background: "#f0fdf4" }}
                >
                  <div className="text-5xl mb-4">✅</div>
                  <h3
                    className="font-extrabold text-xl mb-2"
                    style={{ color: "#15803d" }}
                  >
                    {t("contact.message.sent.title", "Message Sent!")}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    {t(
                      "contact.message.sent.subtitle",
                      "We'll get back to you within 24 hours.",
                    )}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm font-semibold underline text-gray-400 hover:text-gray-600"
                  >
                    {t("contact.message.resend", "Send another message")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {CONTACT_FIELDS.map(({ name, label, type, required }) => (
                    <div key={name}>
                      <label
                        className="block text-sm font-bold mb-1.5"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {t(`contact.message.${name}`, label)}{" "}
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
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2"
                        style={{
                          borderColor: "#e2e8f0",
                          fontFamily: "var(--font-site)",
                          focusRingColor: "var(--color-primary)",
                        }}
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      className="block text-sm font-bold mb-1.5"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {t(
                        "contact.message.service.interested",
                        "Service Interested In",
                      )}
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{
                        borderColor: "#e2e8f0",
                        fontFamily: "var(--font-site)",
                      }}
                    >
                      <option value="">
                        {t(
                          "contact.message.service.select",
                          "Select a service...",
                        )}
                      </option>
                      {SERVICE_OPTIONS.map((s, index) => (
                        <option key={s} value={index}>
                          {t(`contact.message.service.option${index}`, s)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-bold mb-1.5"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {t("contact.message.your.message", "Your Message")}{" "}
                      <span style={{ color: "var(--color-accent)" }}>*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                      style={{
                        borderColor: "#e2e8f0",
                        fontFamily: "var(--font-site)",
                      }}
                    />
                  </div>

                  {serverError && (
                    <div className="text-sm text-red-500 font-medium">
                      {serverError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 rounded-xl font-extrabold text-white transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background: "var(--color-primary)",
                      boxShadow: "0 6px 20px rgba(45,62,176,0.3)",
                      fontSize: "15px",
                    }}
                  >
                    {sending
                      ? t("contact.form_submit.sending", "Sending...")
                      : t("contact.form_submit", "Send Message →")}
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
