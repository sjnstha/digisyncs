import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail } from "lucide-react";
import { useSite } from "../../context/SiteContext";

const SNS_ICONS = {
  sns_facebook: {
    icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    label: "Facebook",
  },
  sns_instagram: {
    icon: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z",
    label: "Instagram",
  },
  sns_twitter: {
    icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
    label: "Twitter",
  },
  sns_youtube: {
    icon: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V9l5.75 3-5.75 3.02z",
    label: "YouTube",
  },
  sns_line: {
    icon: "M12 2C6.48 2 2 6.02 2 11c0 4.17 2.85 7.68 6.84 8.71l.56.15v2.86l3.42-1.91c.36.05.73.08 1.18.08 5.52 0 10-4.02 10-9C22 6.02 17.52 2 12 2z",
    label: "LINE",
  },
  sns_linkedin: {
    icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
    label: "LinkedIn",
  },
  sns_tiktok: {
    icon: "M16 2h3a5 5 0 005 5v3a8 8 0 01-8-8v11a5 5 0 11-5-5",
    label: "TikTok",
  },

  sns_whatsapp: {
    icon: "M20.52 3.48A11.82 11.82 0 0012.07 0C5.5 0 .16 5.34.16 11.91c0 2.1.55 4.15 1.6 5.96L0 24l6.33-1.66a11.84 11.84 0 005.74 1.47h.01c6.57 0 11.91-5.34 11.91-11.91 0-3.18-1.24-6.17-3.47-8.42zM12.08 21.7a9.7 9.7 0 01-4.95-1.36l-.35-.2-3.76.99 1-3.67-.23-.38a9.69 9.69 0 01-1.49-5.17c0-5.36 4.36-9.72 9.72-9.72 2.6 0 5.04 1.01 6.88 2.85a9.66 9.66 0 012.84 6.87c0 5.36-4.36 9.72-9.71 9.72zm5.33-7.27c-.29-.15-1.7-.84-1.97-.93-.26-.1-.45-.15-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.22-.62.07-.29-.15-1.21-.44-2.3-1.42-.85-.75-1.42-1.68-1.59-1.96-.17-.29-.02-.44.13-.58.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.15-.64-1.54-.88-2.11-.23-.55-.47-.47-.64-.48h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-.1 2.43.9 1.43 1.29 2.07 2.78 3.36 1.49 1.29 2.06 1.71 3.52 2.33 1.46.62 2.03.53 2.4.49.36-.05 1.7-.69 1.94-1.35.24-.67.24-1.24.17-1.35-.07-.12-.26-.19-.55-.33z",
    label: "WhatsApp",
  },
};

// export default function Footer() {
//   const { config, nav } = useSite();
//   const { i18n } = useTranslation();
//   const lang = i18n.language?.slice(0, 2) || "en";

//   const getLabel = (item) => item[`label_${lang}`] || item.label_en;

//   const snsList = Object.entries(SNS_ICONS)
//     .filter(([key]) => config?.[key])
//     .map(([key, meta]) => ({ url: config[key], ...meta }));

//   return (
//     // <footer
//     //   style={{
//     //     backgroundColor: "#0f1940",
//     //     color: "#e2e8f0",
//     //     fontFamily: "var(--font-site)",
//     //   }}
//     // >
//     //   {/* Main footer body */}
//     //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//     //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//     //       {/* Column 1 — Brand */}
//     //       <div>
//     //         {config?.logo_url ? (
//     //           <img
//     //             src={config.logo_url}
//     //             alt={config.site_name}
//     //             className="h-14 mb-4 object-contain"
//     //           />
//     //         ) : (
//     //           <p
//     //             className="text-xl font-bold mb-2"
//     //             style={{ color: "var(--color-accent)" }}
//     //           >
//     //             {config?.site_name}
//     //           </p>
//     //         )}
//     //         {config?.tagline && (
//     //           <p className="text-sm text-slate-400 mb-4">{config.tagline}</p>
//     //         )}
//     //         {/* SNS icons */}
//     //         <div className="flex gap-3 mt-2">
//     //           {snsList.map(({ url, icon, label }) => (
//     //             <a
//     //               key={label}
//     //               href={url}
//     //               target="_blank"
//     //               rel="noopener noreferrer"
//     //               aria-label={label}
//     //               className="p-2 rounded-full transition-colors"
//     //               style={{ background: "rgba(255,255,255,0.1)" }}
//     //             >
//     //               <svg
//     //                 className="w-4 h-4"
//     //                 fill="none"
//     //                 stroke="currentColor"
//     //                 strokeWidth={1.5}
//     //                 viewBox="0 0 24 24"
//     //               >
//     //                 <path
//     //                   strokeLinecap="round"
//     //                   strokeLinejoin="round"
//     //                   d={icon}
//     //                 />
//     //               </svg>
//     //             </a>
//     //           ))}
//     //         </div>
//     //       </div>

//     //       {/* Column 2 — Nav links */}
//     //       <div>
//     //         <h3 className="font-semibold text-white mb-4">Quick Links</h3>
//     //         <ul className="space-y-2">
//     //           {nav.map((item) => (
//     //             <li key={item.id}>
//     //               <Link
//     //                 to={item.url}
//     //                 className="text-sm text-slate-400 hover:text-white transition-colors"
//     //               >
//     //                 {getLabel(item)}
//     //               </Link>
//     //             </li>
//     //           ))}
//     //         </ul>
//     //       </div>

//     //       {/* Column 3 — Contact */}
//     //       <div>
//     //         <h3 className="font-semibold text-white mb-4">Contact</h3>
//     //         <ul className="space-y-2 text-sm text-slate-400">
//     //           {config?.address_line1 && <li>{config.address_line1}</li>}
//     //           {config?.address_line2 && <li>{config.address_line2}</li>}
//     //           {config?.city && (
//     //             <li>
//     //               {config.city} {config.postal_code}
//     //             </li>
//     //           )}
//     //           {config?.phone && (
//     //             <li>
//     //               <a
//     //                 href={`tel:${config.phone}`}
//     //                 className="hover:text-white transition-colors"
//     //               >
//     //                 {config.phone}
//     //               </a>
//     //             </li>
//     //           )}
//     //           {config?.email && (
//     //             <li>
//     //               <a
//     //                 href={`mailto:${config.email}`}
//     //                 className="hover:text-white transition-colors"
//     //               >
//     //                 {config.email}
//     //               </a>
//     //             </li>
//     //           )}
//     //         </ul>
//     //       </div>
//     //     </div>
//     //   </div>

//     //   {/* Copyright bar */}
//     //   <div className="border-t border-white/10">
//     //     <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-slate-500">
//     //       {config?.copyright_text ||
//     //         `© ${new Date().getFullYear()} ${config?.site_name}. All rights reserved.`}
//     //     </div>
//     //   </div>
//     // </footer>

//     <footer
//       className="relative overflow-hidden"
//       style={{
//         background: `
//       linear-gradient(
//         135deg,
//         #0b1437 0%,
//         #101b4d 45%,
//         #17245f 100%
//       )
//     `,
//         color: "#e2e8f0",
//         fontFamily: "var(--font-site)",
//       }}
//     >
//       {/* Top Accent Line */}
//       <div
//         className="absolute top-0 inset-x-0 h-[2px]"
//         style={{
//           background:
//             "linear-gradient(to right, transparent, var(--color-accent), transparent)",
//         }}
//       />

//       {/* Background Glow */}
//       <div
//         className="
//       absolute
//       -top-32
//       right-0
//       w-[450px]
//       h-[450px]
//       rounded-full
//       blur-3xl
//       opacity-10
//       pointer-events-none
//     "
//         style={{
//           background: "var(--color-accent)",
//         }}
//       />

//       {/* Watermark Logo */}
//       {config?.logo_url && (
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//           <img
//             src={config.logo_url}
//             alt=""
//             aria-hidden
//             className="
//           w-[420px]
//           max-w-[70%]
//           object-contain
//           opacity-[0.03]
//           select-none
//         "
//             style={{
//               filter: "brightness(10)",
//             }}
//           />
//         </div>
//       )}

//       {/* Main Footer */}
//       <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
//           {/* Brand */}
//           <div>
//             {config?.logo_url ? (
//               <img
//                 src={config.logo_url}
//                 alt={config.site_name}
//                 className="h-14 mb-6 object-contain"
//               />
//             ) : (
//               <h2
//                 className="text-2xl font-extrabold mb-4"
//                 style={{ color: "var(--color-accent)" }}
//               >
//                 {config?.site_name}
//               </h2>
//             )}

//             {config?.tagline && (
//               <p className="text-slate-300 leading-relaxed max-w-sm text-sm md:text-base">
//                 {config.tagline}
//               </p>
//             )}

//             {/* Social Icons */}
//             <div className="flex gap-3 mt-7 flex-wrap">
//               {snsList.map(({ url, icon, label }) => (
//                 <a
//                   key={label}
//                   href={url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={label}
//                   className="
//                 group
//                 p-3
//                 rounded-2xl
//                 backdrop-blur-sm
//                 border
//                 border-white/10
//                 bg-white/5
//                 hover:bg-white/10
//                 hover:border-white/20
//                 transition-all
//                 duration-300
//                 hover:-translate-y-1
//               "
//                 >
//                   <svg
//                     className="
//                   w-5
//                   h-5
//                   text-slate-300
//                   group-hover:text-white
//                   transition-colors
//                 "
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth={1.8}
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d={icon}
//                     />
//                   </svg>
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>

//             <ul className="space-y-3">
//               {nav.map((item) => (
//                 <li key={item.id}>
//                   <Link
//                     to={item.url}
//                     className="
//                   text-slate-300
//                   hover:text-white
//                   transition-all
//                   duration-200
//                   text-sm
//                   md:text-base
//                   hover:translate-x-1
//                   inline-block
//                 "
//                   >
//                     {getLabel(item)}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className="text-white font-bold text-lg mb-6">Contact</h3>

//             <ul className="space-y-4 text-slate-300 text-sm md:text-base">
//               {config?.address_line1 && (
//                 <li className="leading-relaxed">{config.address_line1}</li>
//               )}

//               {config?.address_line2 && (
//                 <li className="leading-relaxed">{config.address_line2}</li>
//               )}

//               {config?.city && (
//                 <li>
//                   {config.city} {config.postal_code}
//                 </li>
//               )}

//               {config?.phone && (
//                 <li>
//                   <a
//                     href={`tel:${config.phone}`}
//                     className="hover:text-white transition-colors"
//                   >
//                     {config.phone}
//                   </a>
//                 </li>
//               )}

//               {config?.email && (
//                 <li>
//                   <a
//                     href={`mailto:${config.email}`}
//                     className="hover:text-white transition-colors"
//                   >
//                     {config.email}
//                   </a>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="relative z-10 border-t border-white/10">
//         <div
//           className="
//         max-w-7xl
//         mx-auto
//         px-6
//         py-5
//         text-center
//         text-sm
//         text-slate-400
//       "
//         >
//           {config?.copyright_text ||
//             `© ${new Date().getFullYear()} ${config?.site_name}. All rights reserved.`}
//         </div>
//       </div>
//     </footer>
//   );
// }

export default function Footer() {
  const { config, nav } = useSite();
  const { i18n } = useTranslation();

  const lang = i18n.language?.slice(0, 2) || "en";

  const getLabel = (item) => item[`label_${lang}`] || item.label_en;

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: `
          linear-gradient(
            135deg,
            #0b1437 0%,
            #101b4d 45%,
            #17245f 100%
          )
        `,
        color: "#e2e8f0",
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

      {/* Glow */}
      <div
        className="
          absolute
          -top-32
          right-0
          w-[450px]
          h-[450px]
          rounded-full
          blur-3xl
          opacity-10
        "
        style={{
          background: "var(--color-accent)",
        }}
      />

      {/* Watermark */}
      {config?.logo_url && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src={config.logo_url}
            alt=""
            aria-hidden
            className="
              w-[420px]
              max-w-[70%]
              object-contain
              opacity-[0.03]
            "
            style={{
              filter: "brightness(10)",
            }}
          />
        </div>
      )}

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {/* Brand */}
          <div>
            {config?.logo_url ? (
              <img
                src={config.logo_url}
                alt={config.site_name}
                className="h-16 mb-6 object-contain"
              />
            ) : (
              <h2
                className="text-2xl font-extrabold mb-4"
                style={{ color: "var(--color-accent)" }}
              >
                {config?.site_name}
              </h2>
            )}

            {config?.tagline && (
              <p className="text-slate-300 leading-relaxed max-w-sm">
                {config.tagline}
              </p>
            )}
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>

            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.url}
                    className="
                      text-slate-300
                      hover:text-white
                      transition-all
                      duration-200
                      hover:translate-x-1
                      inline-block
                    "
                  >
                    {getLabel(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact</h3>

            <ul className="space-y-4 text-slate-300">
              {config?.address_line1 && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 text-orange-400" />
                  <span>{config.address_line1}</span>
                </li>
              )}

              {config?.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-400" />

                  <a
                    href={`tel:${config.phone}`}
                    className="hover:text-white transition-colors"
                  >
                    {config.phone}
                  </a>
                </li>
              )}

              {config?.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-400" />

                  <a
                    href={`mailto:${config.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {config.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div
          className="
            mt-16
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-md
            p-8
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-6
          "
        >
          <div>
            <h3 className="text-2xl font-bold text-white">
              Ready to Study in Japan?
            </h3>

            <p className="text-slate-300 mt-2">
              Start your journey with our professional guidance today.
            </p>
          </div>

          <Link
            to="/#contact"
            className="
              px-6
              py-3
              rounded-2xl
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-[1.03]
            "
            style={{
              background: "var(--color-accent)",
            }}
          >
            Apply Now
          </Link>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-5 text-center text-sm text-slate-400">
          {config?.copyright_text ||
            `© ${new Date().getFullYear()} ${config?.site_name}. All rights reserved.`}

          <div className="flex justify-center gap-6 mt-3 text-xs text-slate-500">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>

            <Link to="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
