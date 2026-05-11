import api from "./client";

const base = (code) => `/content/${code}`;

export const fetchServices     = (code) => api.get(`${base(code)}/services/`).then(r => r.data);
export const fetchCourses      = (code) => api.get(`${base(code)}/courses/`).then(r => r.data);
export const fetchTeam         = (code) => api.get(`${base(code)}/team/`).then(r => r.data);
export const fetchTestimonials = (code) => api.get(`${base(code)}/testimonials/`).then(r => r.data);
export const fetchNews         = (code) => api.get(`${base(code)}/news/?type=news`).then(r => r.data);
export const fetchEvents       = (code) => api.get(`${base(code)}/news/?type=event`).then(r => r.data);
export const fetchNewsAll      = (code) => api.get(`${base(code)}/news/`).then(r => r.data);
export const fetchNewsDetail   = (code, slug) => api.get(`${base(code)}/news/${slug}/`).then(r => r.data);
