import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Heart, Shield, Sparkles } from "lucide-react";
import { Layout, PageHero } from "@/components/site/Layout";
import skyline from "@/assets/skyline.jpg";
import living from "@/assets/living-room.jpg";
import penthouse from "@/assets/penthouse.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Live Luxe" },
      { name: "description", content: "Melbourne-based, owner-obsessed short-term rental management with a five-star reputation." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Shield, t: "Trust", d: "Transparent reporting and clear communication — your property in safe hands." },
  { icon: Sparkles, t: "Hospitality", d: "Hotel-grade standards on every turnover, every check-in, every detail." },
  { icon: Heart, t: "Care", d: "We treat every property like it's our own — because reputations are built that way." },
  { icon: Award, t: "Performance", d: "Smart pricing and channel reach that consistently outperforms self-managed listings." },
];

function About() {
  return (
    <Layout>
      <PageHero title="ABOUT" script="Live Luxe" image={skyline} />

      <section className="section-pad bg-sand">
        <div className="container-luxe grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="eyebrow">Our Story</span>
            <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">
              Melbourne-born, owner-<span className="italic-script">obsessed</span>.
            </h2>
            <p className="mt-5 text-sm text-muted-foreground">
              Live Luxe was founded by Melbourne property owners who knew there had to be a better way to run short-term rentals — one that delivered hotel-grade hospitality without the daily headaches.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Today we manage homes across Melbourne&rsquo;s most desirable suburbs, blending hospitality experience, dynamic pricing science, and a deeply hands-on local team.
            </p>
            <Link to="/contact" className="btn-primary mt-8">Let&rsquo;s Talk</Link>
          </div>
          <div className="relative">
            <img src={living} alt="" loading="lazy" className="aspect-[4/5] w-full rounded-xl object-cover shadow-luxe" />
            <img src={penthouse} alt="" loading="lazy" className="absolute -bottom-8 -left-8 hidden h-48 w-64 rounded-xl object-cover shadow-luxe md:block" />
          </div>
        </div>
      </section>

      <section className="bg-sand-soft pb-24">
        <div className="container-luxe">
          <h2 className="text-center text-3xl tracking-tight md:text-4xl">
            What we <span className="italic-script">stand for</span>
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.t} className="rounded-xl bg-white p-7 shadow-soft">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-copper/15 text-copper">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 text-lg">{v.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-ink py-24 text-sand-soft">
        <img src={penthouse} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="container-luxe relative grid gap-8 text-center md:grid-cols-3">
          {[
            { k: "40%", v: "Average uplift vs self-managed" },
            { k: "300+", v: "Five-star guest reviews" },
            { k: "7 days", v: "Average time to first booking" },
          ].map((s) => (
            <div key={s.k}>
              <div className="font-display text-5xl italic text-copper-soft">{s.k}</div>
              <p className="mt-2 text-sm tracking-[0.2em] text-sand-soft/65">{s.v.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
