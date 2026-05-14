import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SiteProvider } from "./context/SiteContext";
import { useSite } from "./context/SiteContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import "./i18n/index.js";

import HomePage from "./pages/Home/index";
import AboutPage from "./pages/About/index";
import ServicesPage from "./pages/Services/index";
import CoursesPage from "./pages/Courses/index";
import NewsPage from "./pages/News/index";
import ContactPage from "./pages/Contact/index";
import NewsDetailPage from "./pages/News/DetailPage";
// import GalleryPage from "./pages/Gallery/index";
// import ContactPage from "./pages/Contact/index";

function AppShell() {
  const { loading, error } = useSite();

  if (loading) return <LoadingSpinner fullPage />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <div className="text-4xl mb-4">⚠️</div>
          <p
            className="font-semibold mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            Could not load site configuration
          </p>
          <p className="text-sm text-gray-500">{error}</p>
          <p className="text-xs text-gray-400 mt-2">
            Make sure Django is running and <code>/api/site/JP/</code> returns
            data.
          </p>
        </div>
      </div>
    );

  return (
    <div style={{ fontFamily: "var(--font-site)", color: "var(--color-text)" }}>
      <ScrollToTop /> {/* ← scrolls to top on every page change */}
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsDetailPage />} />
          {/* <Route path="/gallery"  element={<GalleryPage />} /> */}
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <SiteProvider>
          <AppShell />
        </SiteProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
