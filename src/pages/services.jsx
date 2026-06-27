import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Layout, PageHero, Section, SectionHeader } from "@/components/site/Layout";
import { Logo } from "@/components/site/Logo";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import living from "@/assets/living-room.jpg";
import skyline from "@/assets/skyline.jpg";
import kitchen from "@/assets/kitchen.jpg";
import dining from "@/assets/dining.jpg";
import bedroom from "@/assets/bedroom.jpg";
import penthouse from "@/assets/penthouse.jpg";

const homeownerItems = [
  "Submit your property details through our website form",
  "Professional photography and listing on aurorasuites.com.au",
  "We collect and rent your property for short-stay use on your behalf",
  "All guest inquiries are handled manually by our team",
  "Personal follow-up on availability, terms, and next steps",
  "Listing updates managed from the admin dashboard",
];

const guestItems = [
  "Browse curated short-stay properties across Melbourne",
  "View full details, photos, and amenities for each listing",
  "Submit a stay inquiry with your preferred dates",
  "Our team contacts you directly to confirm availability",
  "No online booking — every stay is arranged personally",
  "Clear communication throughout the process",
];

const steps = [
  {
    n: "01",
    t: "Submit an Inquiry",
    d: "Homeowners list their property or guests enquire about a stay through our website forms.",
  },
  {
    n: "02",
    t: "We Connect Personally",
    d: "Our team reviews every submission and follows up by phone or email — no automated booking.",
  },
  {
    n: "03",
    t: "Arrange the Stay",
    d: "We match guests with suitable properties and coordinate the rental directly with both parties.",
  },
];

export default function ServicesPage() {
  return (
    <Layout>
      <PageHero title="OUR" script="Services" image={living}>
        <p className="mt-6 max-w-xl text-lg text-sand-soft/75 leading-relaxed">
          How we work with homeowners and guests — from listing properties to managing every inquiry
          manually.
        </p>
      </PageHero>

      <Section className="bg-sand">
        <div className="container-luxe grid-split">
          <div>
            <FadeIn>
              <Logo className="h-16" />
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-3 tracking-tight">
                WHAT WE DO <span className="italic-script">For You</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Aurora Suites is a property showcase and inquiry platform. We collect properties from
                Melbourne homeowners, list them on this website, and arrange short-term stays for
                interested guests — all managed manually by our team.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                The website is not a booking engine. It helps us present listings, receive inquiries,
                and keep everything organised while we handle communication between owners and guests
                directly.
              </p>
            </FadeIn>
          </div>
          <FadeIn direction="left" delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                src={skyline}
                alt=""
                loading="lazy"
                className="aspect-3/4 rounded-2xl object-cover shadow-soft"
              />
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                src={penthouse}
                alt=""
                loading="lazy"
                className="aspect-3/4 rounded-2xl object-cover shadow-soft mt-8"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

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

      <Section className="bg-sand-soft">
        <div className="container-luxe text-center">
          <FadeIn>
            <SectionHeader
              eyebrow="Get in Touch"
              title="READY TO START?"
              description="Whether you're a homeowner looking to list or a guest searching for a stay, submit an inquiry and our team will respond within one business day."
            />
            <Link to="/contact" className="btn-primary mt-10 inline-flex">
              Contact Us <ArrowRight size={18} />
            </Link>
          </FadeIn>
        </div>
      </Section>

      <Section className="relative isolate overflow-hidden bg-ink text-sand-soft">
        <img
          src={penthouse}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-ink/85" />
        <div className="container-luxe relative grid-split">
          <FadeIn>
            <SectionHeader
              eyebrow="Getting Started"
              title="HOW IT"
              script="Works"
              theme="dark"
              align="left"
              description="Simple from start to finish — submit a form, hear from us personally, and we take care of the rest."
            />
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
      </Section>
    </Layout>
  );
}
