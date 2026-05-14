import { useTranslation } from "react-i18next";

/**
 * Returns a helper that picks the right language field from a DB object.
 * Usage:  const t = useLang();
 *         t(service, "title")  → service.title_ja (if language is ja)
 */
export function useLang() {
  const { i18n } = useTranslation();
  const lang =
    i18n.language?.slice(0, 2) || localStorage.getItem("i18nextLng") || "en";

  return (obj, field) => {
    if (!obj) return "";
    const localized = obj[`${field}_${lang}`] || obj[field];
    return localized || obj[`${field}_en`] || obj[`${field}`] || "";
  };
}
