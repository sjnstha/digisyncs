import api from "./client";

export const fetchGallery = (code, type = "", tag = "") => {
  const params = new URLSearchParams();
  if (type) params.append("type", type);
  if (tag) params.append("tag", tag);
  const qs = params.toString() ? `?${params}` : "";
  return api.get(`gallery/${code}/${qs}`).then((r) => r.data);
};
