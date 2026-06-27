import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Header } from "./Header";
import { Footer } from "./Footer";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export function Layout({ children, theme = "dark" }) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollToTop />
      <Header theme={theme} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

/** Standard page section — same vertical padding on every device breakpoint */
export function Section({ children, className, id }) {
  return (
    <section id={id} className={cn("section-pad", className)}>
      {children}
    </section>
  );
}

/** Dark/image section with optional background overlay */
export function SectionDark({ children, className, image, imageClassName, overlayClassName }) {
  return (
    <Section className={cn("relative isolate overflow-hidden text-sand-soft", className)}>
      {image && (
        <img
          src={image}
          alt=""
          loading="lazy"
          className={cn("absolute inset-0 h-full w-full object-cover opacity-15", imageClassName)}
        />
      )}
      <div className={cn("absolute inset-0 bg-ink/85", overlayClassName)} />
      <div className="container-luxe relative">{children}</div>
    </Section>
  );
}

/** Reusable section header — eyebrow, title, optional script word, description */
export function SectionHeader({
  eyebrow,
  title,
  script,
  description,
  align = "center",
  theme = "light",
  className,
}) {
  const isDark = theme === "dark";
  return (
    <div
      className={cn(
        "section-head",
        align === "center" && "mx-auto max-w-2xl text-center",
        align === "left" && "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <span className={cn("eyebrow", isDark && "text-copper-soft!")}>{eyebrow}</span>
      )}
      <h2 className={cn("section-title tracking-tight", isDark && "text-white")}>
        {title}
        {script && (
          <>
            {" "}
            <span className={cn("italic-script", isDark && "text-copper-soft!")}>{script}</span>
          </>
        )}
      </h2>
      {description && (
        <p
          className={cn(
            "section-desc leading-relaxed",
            isDark ? "text-lg text-sand-soft/60" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/** Inner page wrapper (property details, legal pages) */
export function PageMain({ children, className }) {
  return <div className={cn("page-main bg-sand-soft", className)}>{children}</div>;
}

export function PageHero({ eyebrow, title, script, image, children }) {
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden flex items-center lg:min-h-[65vh]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-b from-ink/80 via-ink/50 to-ink/90" />
      <div className="container-luxe hero-inner relative flex w-full flex-col items-center justify-center text-center text-sand-soft">
        {eyebrow && <span className="eyebrow text-copper-soft! mb-4 text-sm">{eyebrow}</span>}
        <h1 className="text-4xl tracking-[0.12em] md:text-6xl font-bold text-white">
          {title}{" "}
          {script && (
            <span className="italic-script text-copper-soft! tracking-normal block mt-2 text-5xl md:text-7xl">
              {script}
            </span>
          )}
        </h1>
        {children}
      </div>
    </section>
  );
}
