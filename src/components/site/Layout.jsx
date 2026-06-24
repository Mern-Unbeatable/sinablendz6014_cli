import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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

export function PageHero({ eyebrow, title, script, image, children }) {
  return (
    <section className="relative min-h-[65vh] w-full overflow-hidden flex items-center">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-b from-ink/80 via-ink/50 to-ink/90" />
      <div className="container-luxe relative flex flex-col items-center justify-center pt-24 pb-16 text-center text-sand-soft">
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
