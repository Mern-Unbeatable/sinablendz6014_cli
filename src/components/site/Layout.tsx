import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  script,
  image,
}: {
  eyebrow?: string;
  title: string;
  script?: string;
  image: string;
}) {
  return (
    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/80" />
      <div className="container-luxe relative flex h-full flex-col items-center justify-center pt-16 text-center text-sand-soft">
        {eyebrow && <span className="eyebrow !text-copper-soft">{eyebrow}</span>}
        <h1 className="mt-4 text-4xl tracking-[0.15em] md:text-5xl">
          {title} {script && <span className="italic-script normal-case !text-copper-soft tracking-normal">{script}</span>}
        </h1>
      </div>
    </section>
  );
}
