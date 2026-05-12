import { useSite } from "../../context/SiteContext";

/**
 * Reusable hero banner for inner pages (About, Services, Courses, etc.)
 * Shows logo as a large watermark on the right side.
 */
export default function PageHero({ title, subtitle }) {
  const { config } = useSite();

  // return (
  //   <section
  //     className="relative overflow-hidden py-16 md:py-24"
  //     style={{
  //       background:
  //         "linear-gradient(135deg, #1e2d7d 0%, #2d3eb0 60%, #4a5bcf 100%)",
  //     }}
  //   >
  //     {/* Logo watermark on the right */}
  //     {config?.logo_url && (
  //       <div className="absolute right-0 top-0 h-full flex items-center pr-8 md:pr-16 pointer-events-none select-none">
  //         <img
  //           src={config.logo_url}
  //           alt=""
  //           aria-hidden
  //           className="h-48 md:h-72 w-auto object-contain opacity-10"
  //           style={{ filter: "brightness(10)" }}
  //         />
  //       </div>
  //     )}

  //     {/* Text content */}
  //     <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //       <div className="max-w-2xl">
  //         <h1
  //           className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight"
  //           style={{ fontFamily: "var(--font-site)" }}
  //         >
  //           {title}
  //         </h1>
  //         {subtitle && (
  //           <p className="text-base md:text-lg text-blue-100 max-w-xl leading-relaxed">
  //             {subtitle}
  //           </p>
  //         )}
  //         {/* Accent underline */}
  //         <div
  //           className="mt-5 h-1 w-16 rounded-full"
  //           style={{ background: "var(--color-accent)" }}
  //         />
  //       </div>
  //     </div>
  //   </section>
  // );
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background: `
        linear-gradient(
          135deg,
          rgba(18, 28, 85, 0.96) 0%,
          rgba(38, 55, 160, 0.90) 55%,
          rgba(74, 91, 207, 0.82) 100%
        )
      `,
      }}
    >
      {/* Soft Glow Effect */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{
          background: "rgba(255,255,255,0.18)",
        }}
      />

      {/* Center Watermark Logo */}
      {config?.logo_url && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <img
            src={config.logo_url}
            alt=""
            aria-hidden
            className="
            w-[320px]
            md:w-[460px]
            max-w-[70%]
            object-contain
            opacity-[0.06]
          "
            style={{
              filter: "brightness(10)",
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1
            className="
            text-4xl
            md:text-5xl
            lg:text-6xl
            font-extrabold
            text-white
            leading-[1.05]
            tracking-tight
          "
            style={{
              fontFamily: "var(--font-site)",
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="
              mt-5
              text-lg
              md:text-xl
              text-white/85
              leading-relaxed
              max-w-xl
            "
            >
              {subtitle}
            </p>
          )}

          {/* Accent underline */}
          <div
            className="mt-7 h-1.5 w-20 rounded-full"
            style={{
              background: "var(--color-accent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
