import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  Check,
  Headphones,
  Home as HomeIcon,
  KeyRound,
  LineChart,
  Minus,
  Plus,
  Star,
  ChevronLeft,
  ChevronRight,
  Shield,
  Clock,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/site/Layout";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/animations";
import hero from "@/assets/hero-apartment.jpg";
import living from "@/assets/living-room.jpg";
import bedroom from "@/assets/bedroom.jpg";
import kitchen from "@/assets/kitchen.jpg";
import skyline from "@/assets/skyline.jpg";
import penthouse from "@/assets/penthouse.jpg";
import dining from "@/assets/dining.jpg";

const services = [
  {
    icon: KeyRound,
    title: "Professional Listing Creation",
    desc: "High-converting property descriptions, SEO-friendly titles, and stunning photography that attracts premium guests.",
  },
  {
    icon: HomeIcon,
    title: "Property Maintenance & Upkeep",
    desc: "Vetted housekeeping teams, hotel-quality turnover standards, and regular maintenance inspections.",
  },
  {
    icon: Headphones,
    title: "24/7 Guest Communication",
    desc: "Fast, friendly, secure communication that ensures safety and consistently earns 5-star reviews.",
  },
  {
    icon: CalendarCheck,
    title: "Multi-Platform Channel Management",
    desc: "Seamless listings across Airbnb, Booking.com, Stayz, and direct booking platforms.",
  },
  {
    icon: BarChart3,
    title: "Revenue Reporting & Owner Portal",
    desc: "Full visibility into your property's performance, earnings, occupancy, and calendar.",
  },
  {
    icon: LineChart,
    title: "Dynamic Pricing Strategy",
    desc: "Real-time price adjustments based on demand, season, events, and competitor analysis.",
  },
];

const reviews = [
  {
    name: "Paul",
    text: "Very clean and modern with great views. Truly five star and a great spot. Excellent host who informed us regularly.",
  },
  {
    name: "Manuelika",
    text: "We got there and stayed in the most luxurious amazing place. I want to stay here forever. Absolutely stunning.",
  },
  {
    name: "Ahmed",
    text: "Highly recommend this apartment! Hosts attended to all my needs immediately. Will definitely return.",
  },
  {
    name: "Josh",
    text: "Loved the location, scenic Melbourne views. Wide open balcony and bedroom views to die for. Apartment is gorgeous.",
  },
  {
    name: "Sheng",
    text: "We have very enjoyed our stay. Liked the views and the amenities. We will book again without hesitation.",
  },
  {
    name: "Sehet",
    text: "Modern, definitely recommend staying — comfortable, spacious, and a great location close to everything.",
  },
];

const faqs = [
  {
    q: "How much do your vacation rental management services cost?",
    a: "We operate on a simple revenue-share model — 10% for our Support Package and 18% for the Complete Package. No hidden fees, no long contracts.",
  },
  {
    q: "Do I retain control of my calendar?",
    a: "Absolutely. You can block out personal stays anytime through our owner portal. Your property, your rules.",
  },
  {
    q: "What types of properties do you manage?",
    a: "Apartments, townhouses, and homes across Melbourne's most desirable suburbs — from CBD penthouses to bayside retreats.",
  },
  {
    q: "How do you handle guest communication and issues?",
    a: "Our team is on call 24/7 to handle every guest enquiry, request, and unexpected issue with professionalism.",
  },
  {
    q: "Can I use my property for personal stays?",
    a: "Yes. Owners typically enjoy their property whenever they choose — just block dates in your portal.",
  },
  {
    q: "How soon can we get started?",
    a: "Most properties are styled, listed, and generating income in as little as 7 days from onboarding.",
  },
];

const properties = [
  {
    img: penthouse,
    title: "Gorgeous Sub-Penthouse with 2x Parking, Pool, Gym",
    beds: 3,
    baths: 2,
    guests: 6,
    location: "Southbank",
    slug: "sub-penthouse-southbank",
  },
  {
    img: living,
    title: "Super Central Apt with Parking, Tennis, Pool & Gym",
    beds: 2,
    baths: 1,
    guests: 4,
    location: "Docklands",
    slug: "central-apt-docklands",
  },
  {
    img: bedroom,
    title: "Live Luxe | Gorgeous City Views 2BR APT w/ Pool & Gym",
    beds: 2,
    baths: 2,
    guests: 4,
    location: "Melbourne CBD",
    slug: "city-views-cbd",
  },
];

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <Trusted />
      <About />
      <FeaturedIn />
      <Services />
      <Priority />
      <Testimonials />
      <Faq />
      <Properties />
    </Layout>
  );
}

/* ─── HERO ─── */
function Hero() {
  const [tab, setTab] = useState("home");
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-sand" />

      <div className="container-luxe relative pt-28 pb-12 lg:pt-32 lg:pb-16 w-full">
        <div className="grid items-center gap-8 xl:gap-12 xl:grid-cols-[1.1fr_1fr]">
          {/* Left content */}
          <div>
            <FadeIn>
              <span className="eyebrow !text-copper-soft !text-sm">Welcome to Live Luxe</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl leading-[1.1]">
                Professional Short-Stay{" "}
                <span className="italic-script !text-copper-soft block mt-1 text-5xl md:text-7xl tracking-normal">
                  Property Management.
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-lg text-lg text-sand-soft/75 leading-relaxed">
                Your Melbourne property deserves expert care. We maximise your rental income with hotel-grade hospitality and data-driven pricing.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">
                  Get a Free Estimate <ArrowRight size={18} />
                </Link>
                <Link to="/properties" className="btn-outline">
                  View Properties
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right image grid */}
          <FadeIn delay={0.3} direction="left" className="hidden xl:block">
            <div className="grid grid-cols-2 gap-3">
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                src={dining}
                alt="Dining"
                className="aspect-[3/4] w-full rounded-2xl object-cover shadow-luxe"
              />
              <div className="space-y-3 pt-8">
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  src={kitchen}
                  alt="Kitchen"
                  className="aspect-square w-full rounded-2xl object-cover shadow-luxe"
                />
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  src={skyline}
                  alt="Skyline"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-luxe"
                />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Estimation form */}
        <FadeIn delay={0.4}>
          <div className="mt-8 lg:mt-12 rounded-2xl bg-white/95 p-2 shadow-luxe backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-1 rounded-xl">
              <button
                onClick={() => setTab("home")}
                className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-base font-semibold transition ${
                  tab === "home" ? "bg-sand text-ink shadow-soft" : "text-muted-foreground hover:text-ink"
                }`}
              >
                <HomeIcon size={18} className="text-copper" /> I am a homeowner
              </button>
              <button
                onClick={() => setTab("guest")}
                className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-base font-semibold transition ${
                  tab === "guest" ? "bg-sand text-ink shadow-soft" : "text-muted-foreground hover:text-ink"
                }`}
              >
                <KeyRound size={18} className="text-copper" /> I am a guest
              </button>
            </div>
            <div className="mt-2 rounded-xl bg-sand p-6">
              <p className="mb-5 text-base text-muted-foreground">
                <span className="italic-script !text-lg">Is your property in Melbourne?</span>{" "}
                Check if we manage homes in your area. Fill out your details and we&rsquo;ll be in touch to discuss your goals.
              </p>
              <form
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[1fr_1fr_1fr_1fr_auto]"
                onSubmit={(e) => e.preventDefault()}
              >
                <input className="rounded-xl border border-border bg-white px-5 py-3.5 text-base placeholder:text-muted-foreground/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20" placeholder="Full Name" />
                <input className="rounded-xl border border-border bg-white px-5 py-3.5 text-base placeholder:text-muted-foreground/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20" placeholder="Property Address" />
                <input className="rounded-xl border border-border bg-white px-5 py-3.5 text-base placeholder:text-muted-foreground/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20" placeholder="Email Address" />
                <input className="rounded-xl border border-border bg-white px-5 py-3.5 text-base placeholder:text-muted-foreground/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20" placeholder="Phone Number" />
                <button className="btn-primary whitespace-nowrap sm:col-span-2 lg:col-span-4 xl:col-span-1">Get Your Rental Estimate</button>
              </form>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── TRUSTED ─── */
function Trusted() {
  const logos = ["OXFORD", "Belle", "RESORT GLOBAL", "CONQUEST", "RayWhite", "FORGE", "Elite", "DPM", "TMG"];
  return (
    <section className="bg-sand py-16">
      <div className="container-luxe">
        <FadeIn>
          <p className="text-center text-sm tracking-[0.3em] text-muted-foreground font-medium">
            — TRUSTED BY SOME OF THE BIGGEST NAMES IN REAL ESTATE —
          </p>
        </FadeIn>
        <StaggerContainer className="mt-10 flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
          {logos.map((l) => (
            <StaggerItem key={l}>
              <span className="font-display text-2xl tracking-widest text-ink/60 hover:text-ink transition-colors cursor-default">
                {l}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── ABOUT / STRESS-FREE ─── */
function About() {
  const items = [
    { icon: TrendingUp, text: "Earn 40% more vs managing it yourself" },
    { icon: Shield, text: "Professional listings, premium photography & smart dynamic pricing" },
    { icon: Clock, text: "Full-service vacation management with local team on standby" },
    { icon: Headphones, text: "No stress, no late-night guest calls — just passive income" },
  ];
  return (
    <section className="section-pad bg-sand-soft">
      <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
        <div>
          <FadeIn>
            <span className="eyebrow">About Us</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-4 tracking-tight">
              About Short-Term Rental <span className="italic-script">Company</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Live Luxe is Melbourne&rsquo;s most trusted short-stay rental management company. We combine world-class hospitality, dynamic pricing science, and a deeply hands-on local team to help property owners earn more with zero effort.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Whether you&rsquo;re looking to maximise the return on a city apartment or a seaside retreat, our approach is the same: treat every property like it&rsquo;s our own, and every guest like they&rsquo;re our only guest.
            </p>
          </FadeIn>
          <StaggerContainer className="mt-8 space-y-4" staggerDelay={0.08}>
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.text}>
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-copper/15 text-copper">
                      <Icon size={20} />
                    </span>
                    <span className="text-base text-ink/85 pt-2">{item.text}</span>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
          <FadeIn delay={0.4}>
            <Link to="/about" className="btn-ghost-dark mt-10">
              Learn More About Us <ArrowRight size={18} />
            </Link>
          </FadeIn>
        </div>

        <FadeIn direction="left" delay={0.2}>
          <div className="grid grid-cols-2 gap-4">
            <motion.img whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }} src={living} alt="" loading="lazy" className="aspect-square rounded-2xl object-cover shadow-soft" />
            <motion.img whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }} src={skyline} alt="" loading="lazy" className="aspect-square rounded-2xl object-cover shadow-soft mt-8" />
            <motion.img whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }} src={bedroom} alt="" loading="lazy" className="aspect-square rounded-2xl object-cover shadow-soft" />
            <motion.img whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }} src={kitchen} alt="" loading="lazy" className="aspect-square rounded-2xl object-cover shadow-soft mt-8" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── FEATURED IN ─── */
function FeaturedIn() {
  const logos = ["airbnb", "Booking.com", "vrbo", "stayz", "HomeAway", "MARRIOTT BONVOY", "Google"];
  return (
    <section className="bg-sand-soft pb-16">
      <div className="container-luxe">
        <FadeIn>
          <p className="text-center text-sm tracking-[0.3em] text-muted-foreground font-medium">
            — FEATURED IN —
          </p>
        </FadeIn>
        <StaggerContainer className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-ink/55">
          {logos.map((l) => (
            <StaggerItem key={l}>
              <span className="font-display text-xl tracking-wide hover:text-ink transition-colors cursor-default">{l}</span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── SERVICES ─── */
function Services() {
  return (
    <section className="relative isolate overflow-hidden bg-ink section-pad text-sand-soft">
      <img src={penthouse} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15" />
      <div className="absolute inset-0 bg-ink/85" />
      <div className="container-luxe relative">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow !text-copper-soft">Our Services</span>
            <h2 className="mt-4 text-white tracking-tight">
              Professional Property Management{" "}
              <span className="italic-script !text-copper-soft">Services</span>
            </h2>
            <p className="mt-4 text-lg text-sand-soft/60">
              We offer turnkey short-term rental services tailored to make ownership effortless and profitable.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.title}>
                <motion.div
                  whileHover={{ y: -5, borderColor: "rgba(191,145,82,0.5)" }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-colors h-full"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-copper/15 text-copper transition-transform group-hover:scale-110">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-sand-soft">{s.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-sand-soft/55">{s.desc}</p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <div className="mt-12 text-center">
            <Link to="/services" className="btn-primary">
              See All Services <ArrowRight size={18} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── PRIORITY ─── */
function Priority() {
  const priorities = [
    { icon: Shield, title: "Professional Screening", desc: "Every guest is thoroughly vetted for your peace of mind." },
    { icon: HomeIcon, title: "Hotel-Grade Cleaning", desc: "Spotless turnovers with premium linen and amenities." },
    { icon: Clock, title: "24/7 Maintenance Support", desc: "Issues resolved fast with our trusted local tradespeople." },
  ];
  return (
    <section className="relative isolate overflow-hidden bg-ink section-pad">
      <img src={skyline} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/70" />
      <div className="container-luxe relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <div>
              <span className="eyebrow !text-copper-soft">Your Property is Our Priority</span>
              <h2 className="mt-4 text-white tracking-tight">
                Built on Professionalism,{" "}
                <span className="italic-script !text-copper-soft">Not Promises</span>
              </h2>
              <p className="mt-6 text-lg text-sand-soft/65 leading-relaxed">
                We&rsquo;ve built our reputation on transparency and results. Every property in our care is protected, maintained, and optimised to deliver strong returns — consistently.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-4" staggerDelay={0.1}>
            {priorities.map((p) => {
              const Icon = p.icon;
              return (
                <StaggerItem key={p.title}>
                  <div className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-copper/15 text-copper">
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-sand-soft">{p.title}</h3>
                      <p className="mt-1 text-[0.95rem] text-sand-soft/60">{p.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
function Testimonials() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(reviews.length / perPage);
  const visible = reviews.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="section-pad bg-sand">
      <div className="container-luxe">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Testimonials</span>
            <h2 className="mt-4 tracking-tight">
              What Our Property Owners{" "}
              <span className="italic-script">Say</span>
            </h2>
          </div>
        </FadeIn>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {visible.map((r, i) => (
            <ScaleIn key={r.name + page} delay={i * 0.1}>
              <article className="rounded-2xl bg-white p-7 shadow-soft h-full flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-copper/20 text-base font-bold text-copper">
                    {r.name[0]}
                  </span>
                  <div>
                    <p className="text-base font-semibold">{r.name}</p>
                    <div className="flex gap-0.5 text-copper">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" stroke="none" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                  &ldquo;{r.text}&rdquo;
                </p>
              </article>
            </ScaleIn>
          ))}
        </div>

        {totalPages > 1 && (
          <FadeIn delay={0.2}>
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink/60 transition hover:border-copper hover:text-copper disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    page === i ? "w-8 bg-copper" : "w-2.5 bg-ink/20 hover:bg-ink/40"
                  }`}
                />
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink/60 transition hover:border-copper hover:text-copper disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative isolate overflow-hidden bg-ink section-pad text-sand-soft">
      <img src={skyline} alt="" className="absolute inset-0 h-full w-full object-cover opacity-12" />
      <div className="absolute inset-0 bg-ink/90" />
      <div className="container-luxe relative max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center">
            <span className="eyebrow !text-copper-soft">FAQ</span>
            <h2 className="mt-4 text-white tracking-tight">
              Frequently Asked{" "}
              <span className="italic-script !text-copper-soft">Questions</span>
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer className="mt-12 space-y-3" staggerDelay={0.06}>
          {faqs.map((f, i) => (
            <StaggerItem key={f.q}>
              <motion.div
                layout
                className="overflow-hidden rounded-xl bg-sand-soft text-ink"
              >
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold transition-colors hover:text-copper"
                >
                  {f.q}
                  <span className="text-copper flex-none">
                    {open === i ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-base text-muted-foreground leading-relaxed">{f.a}</div>
                </motion.div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── PROPERTIES ─── */
function Properties() {
  return (
    <section className="section-pad bg-sand-soft">
      <div className="container-luxe">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <FadeIn>
            <div>
              <span className="eyebrow">Showcase</span>
              <h2 className="mt-4 tracking-tight">
                OUR{" "}
                <span className="italic-script">Properties</span>
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-muted-foreground leading-relaxed lg:text-right">
              We manage every aspect of your short-term rental with care and precision. From guest screening to professional cleaning, your home is protected and optimised.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {properties.map((p) => (
            <StaggerItem key={p.title}>
              <Link to={`/properties/${p.slug}`}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group overflow-hidden rounded-2xl bg-ink text-sand-soft shadow-soft"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-4 py-1.5 text-sm tracking-[0.12em] text-sand-soft backdrop-blur-sm font-medium">
                      {p.location}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <div className="mt-3 flex gap-5 text-sm text-sand-soft/60">
                      <span>{p.guests} Guests</span>
                      <span>{p.beds} Bedrooms</span>
                      <span>{p.baths} Bath</span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <div className="mt-12 text-center">
            <Link to="/properties" className="btn-ghost-dark">
              View All Properties <ArrowRight size={18} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
