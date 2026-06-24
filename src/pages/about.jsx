import { Link } from "react-router-dom";
import { Award, Heart, Shield, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Layout, PageHero } from "@/components/site/Layout";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/animations";
import skyline from "@/assets/skyline.jpg";
import living from "@/assets/living-room.jpg";
import penthouse from "@/assets/penthouse.jpg";
import kitchen from "@/assets/kitchen.jpg";
import dining from "@/assets/dining.jpg";

const values = [
  {
    icon: Shield,
    t: "Trust & Transparency",
    d: "Transparent reporting and clear communication at every step — your property is in safe, experienced hands.",
  },
  {
    icon: Sparkles,
    t: "Premium Hospitality",
    d: "Hotel-grade standards on every turnover, every check-in, every single detail. We never cut corners.",
  },
  {
    icon: Heart,
    t: "Genuine Care",
    d: "We treat every property like it's our own — because reputations are built that way, one guest at a time.",
  },
  {
    icon: Award,
    t: "Proven Performance",
    d: "Smart pricing and channel reach that consistently outperforms self-managed listings by up to 40%.",
  },
];

const stats = [
  { k: "40%", v: "Average uplift vs self-managed" },
  { k: "300+", v: "Five-star guest reviews" },
  { k: "7 days", v: "Average time to first booking" },
  { k: "24/7", v: "Guest support coverage" },
];

const team = [
  {
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    name: "Sarah Mitchell",
    role: "Operations Manager",
  },
  {
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    name: "James Cooper",
    role: "Property Specialist",
  },
  {
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    name: "Emma Chen",
    role: "Guest Experience Lead",
  },
];

export default function AboutPage() {
  return (
    <Layout>
      <PageHero title="ABOUT" script="Aurora Suites" image={skyline}>
        <p className="mt-6 max-w-xl text-lg text-sand-soft/75 leading-relaxed">
          Melbourne&rsquo;s most trusted short-stay rental management — born from a passion for
          premium hospitality.
        </p>
      </PageHero>

      {/* Our Story */}
      <section className="section-pad bg-sand">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
          <div>
            <FadeIn>
              <span className="eyebrow">Our Story</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-4 tracking-tight">
                Melbourne-born, owner-<span className="italic-script">obsessed</span>.
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Aurora Suites was founded by Melbourne property owners who knew there had to be a better
                way to run short-term rentals — one that delivered hotel-grade hospitality without
                the daily headaches and constant stress.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Today we manage homes across Melbourne&rsquo;s most desirable suburbs, blending
                hospitality experience, dynamic pricing science, and a deeply hands-on local team
                that truly cares about your property.
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our mission is simple: maximise your income while you enjoy complete peace of mind.
                We handle everything from professional photography and listing optimisation to 24/7
                guest management and maintenance coordination.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Link to="/contact" className="btn-primary mt-8">
                Let&rsquo;s Talk <ArrowRight size={18} />
              </Link>
            </FadeIn>
          </div>

          <FadeIn direction="left" delay={0.2}>
            <div className="relative">
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                src={living}
                alt="Living room"
                loading="lazy"
                className="aspect-4/5 w-full rounded-2xl object-cover shadow-luxe"
              />
              <motion.img
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                src={penthouse}
                alt="Penthouse"
                loading="lazy"
                className="absolute -bottom-10 -left-10 hidden h-52 w-72 rounded-2xl border-4 border-sand object-cover shadow-luxe md:block"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-sand-soft">
        <div className="container-luxe">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <span className="eyebrow">Our Values</span>
              <h2 className="mt-4 tracking-tight">
                What we <span className="italic-script">stand for</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                These aren&rsquo;t just words — they&rsquo;re the principles that guide every
                decision we make for your property.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            staggerDelay={0.1}
          >
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <StaggerItem key={v.t}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl bg-white p-8 shadow-soft h-full"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-copper/15 text-copper">
                      <Icon size={24} />
                    </span>
                    <h3 className="mt-6 text-xl font-semibold">{v.t}</h3>
                    <p className="mt-3 text-[0.95rem] text-muted-foreground leading-relaxed">
                      {v.d}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats */}
      <section className="relative isolate overflow-hidden bg-ink py-10 text-sand-soft md:py-24">
        <img
          src={penthouse}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="container-luxe relative">
          <StaggerContainer
            className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4"
            staggerDelay={0.1}
          >
            {stats.map((s) => (
              <StaggerItem key={s.k}>
                <div>
                  <div className="font-display text-6xl italic text-copper-soft">{s.k}</div>
                  <p className="mt-3 text-sm tracking-[0.2em] text-sand-soft/60 font-medium">
                    {s.v.toUpperCase()}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad bg-sand">
        <div className="container-luxe">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <span className="eyebrow">Our Team</span>
              <h2 className="mt-4 tracking-tight">
                Meet the <span className="italic-script">team</span> behind Aurora Suites
              </h2>
              <p className="mt-4 text-muted-foreground">
                A dedicated local team of property management professionals who are passionate about
                delivering exceptional results.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-3" staggerDelay={0.1}>
            {team.map((t) => (
              <StaggerItem key={t.name}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="group overflow-hidden rounded-2xl bg-white shadow-soft"
                >
                  <div className="aspect-4/3 overflow-hidden">
                    <img
                      src={t.img}
                      alt={t.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-semibold">{t.name}</h3>
                    <p className="mt-1 text-[0.95rem] text-copper font-medium">{t.role}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </Layout>
  );
}
