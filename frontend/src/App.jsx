import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteProvider } from "./context/SiteContext";
import { useSite } from "./context/SiteContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LoadingSpinner from "./components/ui/LoadingSpinner";

import HomePage from "./pages/Home/index";
import AboutPage from "./pages/About/index";
import ServicesPage from "./pages/Services/index";
import CoursesPage from "./pages/Courses/index";
import NewsPage from "./pages/News/index";
import ContactPage from "./pages/Contact/index";

function AppShell() {
  const { loading, error } = useSite();

  if (loading) return <LoadingSpinner fullPage />;
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <p className="text-red-500 font-semibold mb-2">
            Could not load site configuration
          </p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );

  return (
    <div style={{ fontFamily: "var(--font-site)", color: "var(--color-text)" }}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteProvider>
        <AppShell />
      </SiteProvider>
    </BrowserRouter>
  );
}
