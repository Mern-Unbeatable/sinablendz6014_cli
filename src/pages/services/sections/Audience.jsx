import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/site/Layout";
import { FadeIn } from "@/components/animations";
import living from "@/assets/living-room.jpg";
import kitchen from "@/assets/kitchen.jpg";
import dining from "@/assets/dining.jpg";
import bedroom from "@/assets/bedroom.jpg";

export const homeownerItems = [
  "Submit your property details through our website form",
  "Professional photography and listing on aurorasuites.com.au",
  "We collect and rent your property for short-stay use on your behalf",
  "All guest inquiries are handled manually by our team",
  "Personal follow-up on availability, terms, and next steps",
  "Listing updates managed from the admin dashboard",
];

export const guestItems = [
  "Browse curated short-stay properties across Melbourne",
  "View full details, photos, and amenities for each listing",
  "Submit a stay inquiry with your preferred dates",
  "Our team contacts you directly to confirm availability",
  "No online booking — every stay is arranged personally",
  "Clear communication throughout the process",
];

export default function Audience() {
  return (
    <>
      <Section className="bg-sand">
        <div className="container-luxe">
          <FadeIn>
            <div className="rounded-3xl bg-sand-soft card-pad shadow-soft">
              <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
                <div className="space-y-4">
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    src={kitchen}
                    alt=""
                    loading="lazy"
                    className="h-52 w-full rounded-xl object-cover"
                  />
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    src={dining}
                    alt=""
                    loading="lazy"
                    className="h-52 w-full rounded-xl object-cover"
                  />
                </div>
                <div>
                  <h2 className="tracking-tight">
                    FOR <span className="italic-script">Homeowners</span>
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Partner with Aurora Suites to list your property and let us arrange short-term
                    renters on your behalf. Submit your details and we&rsquo;ll follow up personally.
                  </p>
                  <p className="mt-6 text-base font-semibold">What we handle:</p>
                  <ul className="mt-4 space-y-3">
                    {homeownerItems.map((s) => (
                      <li key={s} className="flex items-start gap-3 text-[0.95rem] text-ink/85">
                        <Check size={16} className="mt-1 flex-none text-copper" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn-ghost-dark mt-10">
                    List Your Property <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section className="bg-sand">
        <div className="container-luxe">
          <FadeIn>
            <div className="rounded-3xl bg-sand-soft card-pad shadow-soft">
              <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
                <div>
                  <h2 className="tracking-tight">
                    FOR <span className="italic-script">Guests</span>
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Looking for a short stay in Melbourne? Browse our portfolio, pick a property, and
                    submit an inquiry. We&rsquo;ll get back to you with availability and next steps.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {guestItems.map((s) => (
                      <li key={s} className="flex items-start gap-3 text-[0.95rem] text-ink/85">
                        <Check size={16} className="mt-1 flex-none text-copper" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/properties" className="btn-primary mt-8">
                    Browse Properties <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="space-y-4">
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    src={living}
                    alt=""
                    loading="lazy"
                    className="h-52 w-full rounded-xl object-cover"
                  />
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    src={bedroom}
                    alt=""
                    loading="lazy"
                    className="h-52 w-full rounded-xl object-cover"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
