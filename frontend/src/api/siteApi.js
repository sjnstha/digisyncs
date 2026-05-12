import api from "./client";

export const fetchSiteData = (code) =>
  api.get(`/site/${code}/`).then((r) => r.data);
export const fetchCountries = () => api.get("/countries/").then((r) => r.data);
export const fetchStats = (code) =>
  api.get(`/content/${code}/stats/`).then((r) => r.data);
export const fetchTranslations = (lang, code) =>
  api
    .get(`/translations/?language=${lang}&country=${code}`)
    .then((r) => r.data);
