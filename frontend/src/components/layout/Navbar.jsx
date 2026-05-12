import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSite } from "../../context/SiteContext";
import LanguageSwitcher from "../ui/LanguageSwitcher";

// export default function Navbar() {
//   const { config, nav, loading } = useSite();
//   const { i18n } = useTranslation();
//   const location = useLocation();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const lang = i18n.language?.slice(0, 2) || "en";

//   const getLabel = (item) => item[`label_${lang}`] || item.label_en;

//   const isActive = (url) =>
//     url === "/" ? location.pathname === "/" : location.pathname.startsWith(url);

//   return (
//     <nav
//       style={{
//         backgroundColor: "var(--color-navbar-bg)",
//         color: "var(--color-navbar-text)",
//         fontFamily: "var(--font-site)",
//       }}
//       className="sticky top-0 z-50 shadow-sm"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo + Site name */}
//           <Link to="/" className="flex items-center gap-3 flex-shrink-0">
//             {config?.logo_url ? (
//               <img
//                 src={config.logo_url}
//                 alt={config.site_name}
//                 className="h-10 w-auto object-contain"
//               />
//             ) : (
//               <span
//                 className="font-bold text-xl tracking-tight"
//                 style={{ color: "var(--color-navbar-text)" }}
//               >
//                 {config?.site_name || "DigiSync"}
//               </span>
//             )}
//           </Link>

//           {/* Desktop nav links */}
//           <div className="hidden md:flex items-center gap-1">
//             {!loading &&
//               nav.map((item) => (
//                 <Link
//                   key={item.id}
//                   to={item.url}
//                   target={item.open_in_new_tab ? "_blank" : undefined}
//                   className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
//                   style={{
//                     color: isActive(item.url)
//                       ? "var(--color-accent)"
//                       : "var(--color-navbar-text)",
//                     borderBottom: isActive(item.url)
//                       ? "2px solid var(--color-accent)"
//                       : "2px solid transparent",
//                   }}
//                 >
//                   {getLabel(item)}
//                 </Link>
//               ))}
//           </div>

//           {/* Right side: Language switcher + hamburger */}
//           <div className="flex items-center gap-3">
//             <LanguageSwitcher />
//             {/* Mobile hamburger */}
//             <button
//               onClick={() => setMenuOpen((o) => !o)}
//               className="md:hidden p-2 rounded-md"
//               style={{ color: "var(--color-navbar-text)" }}
//               aria-label="Toggle menu"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 {menuOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {menuOpen && (
//           <div className="md:hidden pb-3 pt-1 border-t border-white/20">
//             {nav.map((item) => (
//               <Link
//                 key={item.id}
//                 to={item.url}
//                 onClick={() => setMenuOpen(false)}
//                 className="block px-4 py-2 text-sm font-medium"
//                 style={{ color: "var(--color-navbar-text)" }}
//               >
//                 {getLabel(item)}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

export default function Navbar() {
  const { config, nav, loading } = useSite();
  const { i18n } = useTranslation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const lang = i18n.language?.slice(0, 2) || "en";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getLabel = (item) => item[`label_${lang}`] || item.label_en;

  const isActive = (url) => {
    return window.location.pathname === url;
  };

  return (
    <nav
      className={`
        sticky
        top-0
        z-50
        backdrop-blur-xl
        border-b
        transition-all
        duration-300
      `}
      style={{
        background: scrolled
          ? `
            linear-gradient(
              to right,
              rgba(255,255,255,0.96),
              rgba(255,255,255,0.92)
            )
          `
          : `
            linear-gradient(
              to right,
              rgba(255,255,255,0.88),
              rgba(255,255,255,0.84)
            )
          `,
        borderColor: "rgba(255,255,255,0.12)",
        boxShadow: scrolled
          ? "0 8px 30px rgba(0,0,0,0.08)"
          : "0 4px 20px rgba(0,0,0,0.04)",
        color: "var(--color-navbar-text)",
        fontFamily: "var(--font-site)",
      }}
    >
      {/* Accent line */}
      <div
        className="absolute top-0 inset-x-0 h-[2px]"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-accent), transparent)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
        <div
          className={`
            flex
            items-center
            justify-between
            transition-all
            duration-300
            ${scrolled ? "h-[68px]" : "h-[74px]"}
          `}
        >
          {/* Logo */}
          <Link
            to="/"
            className="
              flex
              items-center
              gap-4
              group
              flex-shrink-0
            "
          >
            {config?.logo_url ? (
              <div className="relative">
                <div
                  className="
                    absolute
                    inset-0
                    rounded-full
                    blur-xl
                    opacity-0
                    group-hover:opacity-20
                    transition-opacity
                  "
                  style={{
                    background: "var(--color-accent)",
                  }}
                />

                <img
                  src={config.logo_url}
                  alt={config.site_name}
                  className={`
                    relative
                    w-auto
                    object-contain
                    transition-all
                    duration-300
                    group-hover:scale-105
                    ${scrolled ? "h-12 md:h-14" : "h-14 md:h-16"}
                  `}
                />
              </div>
            ) : (
              <span
                className="
                  text-2xl
                  font-extrabold
                  tracking-tight
                "
              >
                {config?.site_name || "DigiSync"}
              </span>
            )}

            {/* Site Name */}
            {config?.site_name && (
              <div className="hidden lg:block">
                <p className="text-lg font-bold leading-tight">
                  {config.site_name}
                </p>

                {config?.tagline && (
                  <p className="text-xs text-slate-500 leading-tight">
                    {config.tagline}
                  </p>
                )}
              </div>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {!loading &&
              nav.map((item) => {
                const active = isActive(item.url);

                return (
                  <Link
                    key={item.id}
                    to={item.url}
                    target={item.open_in_new_tab ? "_blank" : undefined}
                    className="
                      relative
                      px-4
                      py-2.5
                      rounded-xl
                      text-sm
                      font-semibold
                      transition-all
                      duration-300
                      hover:-translate-y-[1px]
                      hover:scale-[1.03]
                    "
                    style={{
                      color: active
                        ? "var(--color-accent)"
                        : "var(--color-navbar-text)",

                      background: active
                        ? "rgba(255,255,255,0.7)"
                        : "transparent",

                      boxShadow: active
                        ? "0 0 20px rgba(246,129,33,0.18)"
                        : "none",
                    }}
                  >
                    {getLabel(item)}

                    <span
                      className="
                        absolute
                        left-3
                        right-3
                        bottom-1
                        h-[2px]
                        rounded-full
                      "
                      style={{
                        background: active
                          ? "var(--color-accent)"
                          : "transparent",
                      }}
                    />
                  </Link>
                );
              })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Language */}
            <div
              className="
                hidden
                sm:flex
                items-center
                rounded-xl
                border
                border-black/5
                bg-white/60
                backdrop-blur-md
                px-2
                py-1
                shadow-sm
              "
            >
              <LanguageSwitcher />
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className="
                md:hidden
                p-2.5
                rounded-xl
                transition-all
                duration-300
                border
                border-black/5
                bg-white/60
                backdrop-blur-md
                hover:bg-white
              "
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="
              md:hidden
              pb-5
              pt-4
              border-t
              border-black/5
            "
          >
            <div className="flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.id}
                  to={item.url}
                  onClick={() => setMenuOpen(false)}
                  className="
                    px-4
                    py-3
                    rounded-xl
                    text-sm
                    font-semibold
                    transition-all
                    duration-200
                    hover:bg-black/5
                  "
                >
                  {getLabel(item)}
                </Link>
              ))}

              <div className="mt-3 px-2 sm:hidden">
                <div
                  className="
                    rounded-xl
                    border
                    border-black/5
                    bg-white/60
                    backdrop-blur-md
                    p-2
                  "
                >
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
