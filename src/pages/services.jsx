import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Layout, PageHero } from "@/components/site/Layout";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import living from "@/assets/living-room.jpg";
import skyline from "@/assets/skyline.jpg";
import kitchen from "@/assets/kitchen.jpg";
import dining from "@/assets/dining.jpg";
import bedroom from "@/assets/bedroom.jpg";
import penthouse from "@/assets/penthouse.jpg";

const supportItems = [
  "Revenue forecasting based on historical data and market analysis",
  "Onboarding your property to our fine-tuned system for seamless execution",
  "Access to our reviewer distribution network for maximum exposure",
  "Furnishing packages based on your budget and goals",
  "Professional photography & listing set up",
  "Listing creation & optimisation across Airbnb, Booking.com, VRBO and more",
  "Calendar & booking management",
  "Dynamic pricing for higher occupancy with proven strategies",
  "Guest screening, vetting & 24/7 support",
  "Payments and guest communications",
  "Handling guest feedback, reviews, and issue resolution",
  "Monthly performance overview",
  "Access to our extensive network of tradesmen",
];

const completeItems = [
  "Full cleaning & linen service",
  "Maintenance coordination & minor repairs",
  "Stock replenishment & inventory checks",
  "Biannual deep cleans",
  "On-ground property management",
];

const steps = [
  {
    n: "01",
    t: "Revenue Assessment",
    d: "We run a free revenue estimate and assess your property's potential based on location, size, and seasonality.",
  },
  {
    n: "02",
    t: "Onboarding, Styling & Furnishing",
    d: "We onboard your property, coordinate furnishing options based on your budget and goals, and style the space for maximum appeal.",
  },
  {
    n: "03",
    t: "Listing & Launch",
    d: "We craft your listing, photograph professionally, price dynamically and launch across every major platform.",
  },
];

export default function ServicesPage() {
  return (
    <Layout>
      <PageHero title="MANAGEMENT" script="Services" image={living}>
        <p className="mt-6 max-w-xl text-lg text-sand-soft/75 leading-relaxed">
          Turnkey solutions designed to maximise your property&rsquo;s income while you enjoy complete freedom.
        </p>
      </PageHero>

      {/* Intro */}
      <section className="section-pad bg-sand">
        <div className="container-luxe grid gap-14 lg:grid-cols-2 items-center">
          <div>
            <FadeIn>
              <span className="font-display text-5xl italic text-copper">L</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-3 tracking-tight">
                WHAT WE DO <span className="italic-script">For You</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Whether you want a collaborative partnership or a hands-off experience, our services are designed to suit your lifestyle and maximise your property&rsquo;s potential.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                From day one, our team handles everything — professional photography, listing creation, dynamic pricing, guest communication, and property maintenance. You sit back, we deliver results.
              </p>
            </FadeIn>
          </div>
          <FadeIn direction="left" delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              <motion.img whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }} src={skyline} alt="" loading="lazy" className="aspect-3/4 rounded-2xl object-cover shadow-soft" />
              <motion.img whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }} src={penthouse} alt="" loading="lazy" className="aspect-3/4 rounded-2xl object-cover shadow-soft mt-8" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Support Package */}
      <section className="section-pad bg-sand">
        <div className="container-luxe">
          <FadeIn>
            <div className="rounded-3xl bg-sand-soft p-8 shadow-soft md:p-14">
              <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
                <div className="space-y-4">
                  <motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} src={kitchen} alt="" loading="lazy" className="h-52 w-full rounded-xl object-cover" />
                  <motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} src={dining} alt="" loading="lazy" className="h-52 w-full rounded-xl object-cover" />
                </div>
                <div>
                  <h2 className="tracking-tight">
                    SUPPORT <span className="italic-script">Package</span>
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    For homeowners who want to stay involved with cleaning and maintenance but want experts managing revenue and guest experience.
                  </p>
                  <p className="mt-6 text-base font-semibold">We take care of:</p>
                  <ul className="mt-4 space-y-3">
                    {supportItems.map((s) => (
                      <li key={s} className="flex items-start gap-3 text-[0.95rem] text-ink/85">
                        <Check size={16} className="mt-1 flex-none text-copper" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn-ghost-dark mt-10">
                    Sign Up <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Complete Package */}
      <section className="bg-sand pb-10 md:pb-24">
        <div className="container-luxe">
          <FadeIn>
            <div className="rounded-3xl bg-sand-soft p-8 shadow-soft md:p-14">
              <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
                <div>
                  <h2 className="tracking-tight">
                    COMPLETE <span className="italic-script">Package</span>
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Perfect for hands-off owners wanting end-to-end service. Includes everything in the Support Package, plus:
                  </p>
                  <ul className="mt-6 space-y-3">
                    {completeItems.map((s) => (
                      <li key={s} className="flex items-start gap-3 text-[0.95rem] text-ink/85">
                        <Check size={16} className="mt-1 flex-none text-copper" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 text-muted-foreground">You stay in control of your asset.</p>
                  <p className="mt-1 text-base font-semibold">
                    We handle the rest — efficiently, professionally, and positively.
                  </p>
                  <Link to="/contact" className="btn-primary mt-8">
                    Get Started <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="space-y-4">
                  <motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} src={living} alt="" loading="lazy" className="h-52 w-full rounded-xl object-cover" />
                  <motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} src={bedroom} alt="" loading="lazy" className="h-52 w-full rounded-xl object-cover" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-pad bg-sand-soft">
        <div className="container-luxe text-center">
          <FadeIn>
            <span className="eyebrow">Transparent Pricing</span>
            <h2 className="mt-4 tracking-tight">PRICING</h2>
            <p className="mt-3 text-muted-foreground">
              We operate on a simple, transparent revenue-share model. No surprises.
            </p>
          </FadeIn>
          <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-3" staggerDelay={0.1}>
            {[
              { t: "Support Package", v: "10% of net revenue + GST", highlight: false },
              { t: "Complete Package", v: "18% of net revenue + GST", highlight: true },
              { t: "Onboarding Fee", v: "One-time cost of $1,000 + GST", highlight: false },
            ].map((p) => (
              <StaggerItem key={p.t}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-2xl p-10 ${
                    p.highlight
                      ? "bg-ink text-sand-soft shadow-luxe"
                      : "border border-copper/30 bg-white shadow-soft"
                  }`}
                >
                  <div className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${
                    p.highlight ? "bg-copper/25 text-copper-soft" : "bg-copper/15 text-copper"
                  }`}>
                    <Check size={22} />
                  </div>
                  <h3 className={`text-xl font-semibold ${p.highlight ? "text-copper-soft" : "text-copper"}`}>{p.t}</h3>
                  <p className={`mt-3 text-base ${p.highlight ? "text-sand-soft/70" : "text-muted-foreground"}`}>{p.v}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative isolate overflow-hidden bg-ink section-pad text-sand-soft">
        <img src={penthouse} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-ink/85" />
        <div className="container-luxe relative grid gap-14 lg:grid-cols-2 items-center">
          <FadeIn>
            <div>
              <span className="eyebrow text-copper-soft!">Getting Started</span>
              <h2 className="mt-4 text-white tracking-tight">
                HOW IT <span className="italic-script text-copper-soft!">Works</span>
              </h2>
              <p className="mt-6 text-lg text-sand-soft/60 leading-relaxed">
                We can have your property styled, listed, and generating income in as little as 7 days. Here&rsquo;s how we get started.
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="space-y-4" staggerDelay={0.1}>
            {steps.map((s) => (
              <StaggerItem key={s.n}>
                <motion.div
                  whileHover={{ x: 5, borderColor: "rgba(191,145,82,0.5)" }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-white/10 bg-white/4 p-7 backdrop-blur"
                >
                  <div className="flex items-start gap-5">
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-copper text-lg font-bold text-white">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-copper-soft">{s.t}</h3>
                      <p className="mt-2 text-[0.95rem] text-sand-soft/65 leading-relaxed">{s.d}</p>
                    </div>
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
