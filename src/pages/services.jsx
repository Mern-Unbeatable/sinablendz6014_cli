import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Layout, PageHero } from "@/components/site/Layout";
import living from "@/assets/living-room.jpg";
import skyline from "@/assets/skyline.jpg";
import kitchen from "@/assets/kitchen.jpg";
import dining from "@/assets/dining.jpg";
import bedroom from "@/assets/bedroom.jpg";
import penthouse from "@/assets/penthouse.jpg";

const supportItems = [
  "Revenue forecasting based on history data and market analysis",
  "Onboarding your property to our fine tuned system for seamless execution",
  "Access to our reviewer distribution network for maximum exposure",
  "Furnishing packages based on your budget and goals (we have trade and wholesale contacts for the best prices on furniture)",
  "Professional photography & listing set up",
  "Listing creation & optimisation across Airbnb, Booking.com, VRBO and more",
  "Calendar & booking management",
  "Dynamic pricing for higher occupancy (we have top secret strategies that ensure consistent occupancy and maximum nightly rates across all seasons)",
  "Guest screening, vetting & 24/7 support",
  "Payments and guest communications",
  "Handling guest feedback, reviews, and issue resolution",
  "Monthly performance overview",
  "Access to our extensive network of tradesmen where available",
];

const completeItems = [
  "Full cleaning & linen service",
  "Maintenance coordination & minor repairs",
  "Stock replenishment & inventory checks",
  "Biannual deep cleans",
  "On-ground property management",
];

export default function ServicesPage() {
  return (
    <Layout>
      <PageHero title="MANAGEMENT" script="Services" image={living} />

      <section className="section-pad bg-sand">
        <div className="container-luxe grid gap-10 md:grid-cols-2">
          <div>
            <span className="font-display text-3xl italic text-copper">L</span>
            <h2 className="mt-2 text-3xl tracking-tight">
              WHAT WE DO <span className="italic-script">For You</span>
            </h2>
            <p className="mt-5 max-w-md text-sm text-muted-foreground">
              Whether you want a collaborative partnership or a hands-off experience, our services
              are designed to suit your lifestyle and maximise your property&rsquo;s potential.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={skyline} alt="" loading="lazy" className="aspect-[3/4] rounded-md object-cover" />
            <img src={penthouse} alt="" loading="lazy" className="aspect-[3/4] rounded-md object-cover" />
          </div>
        </div>
      </section>

      <section className="section-pad bg-sand">
        <div className="container-luxe rounded-3xl bg-sand-soft p-8 shadow-soft md:p-14">
          <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
            <div className="space-y-4">
              <img src={kitchen} alt="" loading="lazy" className="h-44 w-full rounded-lg object-cover" />
              <img src={dining} alt="" loading="lazy" className="h-44 w-full rounded-lg object-cover" />
            </div>
            <div>
              <h3 className="text-3xl tracking-tight">
                SUPPORT <span className="italic-script">Package</span>
              </h3>
              <p className="mt-4 text-sm text-muted-foreground">
                For homeowners who want to stay involved with cleaning and maintenance but want
                experts managing revenue and guest experience.
              </p>
              <p className="mt-6 text-sm font-semibold">We take care of:</p>
              <ul className="mt-3 space-y-2">
                {supportItems.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-ink/85">
                    <Check size={14} className="mt-1 flex-none text-copper" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-ghost-dark mt-8">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand pb-20">
        <div className="container-luxe rounded-3xl bg-sand-soft p-8 shadow-soft md:p-14">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h3 className="text-3xl tracking-tight">
                COMPLETE <span className="italic-script">Package</span>
              </h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Perfect for hands-off owners wanting end-to-end service. Includes everything in the
                Support Package, plus:
              </p>
              <ul className="mt-6 space-y-2">
                {completeItems.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-ink/85">
                    <Check size={14} className="mt-1 flex-none text-copper" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">You stay in control of your asset.</p>
              <p className="mt-1 text-sm font-semibold">
                We handle the rest — efficiently, professionally, and positively.
              </p>
            </div>
            <div className="space-y-4">
              <img src={living} alt="" loading="lazy" className="h-44 w-full rounded-lg object-cover" />
              <img src={bedroom} alt="" loading="lazy" className="h-44 w-full rounded-lg object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-sand">
        <div className="container-luxe text-center">
          <h2 className="text-3xl tracking-tight">PRICING</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            We operate on a simple revenue-share model
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { t: "Support Package", v: "10% of net revenue + GST" },
              { t: "Complete Package", v: "18% of net revenue + GST" },
              { t: "Onboarding Fee", v: "One-time cost of $1,000 + GST" },
            ].map((p) => (
              <div key={p.t} className="rounded-xl border border-copper/30 bg-sand-soft/60 p-8">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-copper/15 text-copper">
                  <Check size={18} />
                </div>
                <h4 className="text-lg font-medium text-copper">{p.t}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{p.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-ink py-24 text-sand-soft">
        <img src={penthouse} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="container-luxe relative grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl tracking-tight">
              HOW IT <span className="italic-script !text-copper-soft">Works</span>
            </h2>
            <p className="mt-4 max-w-md text-sm text-sand-soft/65">
              We can have your property styled, listed, and generating income in as little as 7 days.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                n: "1",
                t: "Revenue Assessment",
                d: "We run a free revenue estimate and assess your property's potential based on location, size, and seasonality.",
              },
              {
                n: "2",
                t: "Onboarding, Styling & Furnishing",
                d: "We onboard your property, coordinate furnishing options based on your budget and goals, and style the space for maximum appeal — right down to the teaspoons.",
              },
              {
                n: "3",
                t: "Listing & Launch",
                d: "We craft your listing, photograph, price dynamically and launch across every major platform.",
              },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-copper text-sm font-semibold text-white">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-copper">{s.t}</h3>
                    <p className="mt-1 text-sm text-sand-soft/70">{s.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
