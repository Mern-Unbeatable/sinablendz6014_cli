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
import { toast } from "sonner";
import { Layout } from "@/components/site/Layout";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/animations";
import { addInquiry, getPublishedProperties } from "@/lib/store";
import hero from "@/assets/hero-apartment.jpg";
import living from "@/assets/living-room.jpg";
import bedroom from "@/assets/bedroom.jpg";
import kitchen from "@/assets/kitchen.jpg";
import skyline from "@/assets/skyline.jpg";
import penthouse from "@/assets/penthouse.jpg";
import dining from "@/assets/dining.jpg";

const services = [
  {
    icon: HomeIcon,
    title: "Property Showcase",
    desc: "We list homeowner properties with professional photos and full details on this website.",
  },
  {
    icon: KeyRound,
    title: "Homeowner Partnerships",
    desc: "We collect and rent properties from Melbourne owners for short-stay use on their behalf.",
  },
  {
    icon: Headphones,
    title: "Personal Inquiry Handling",
    desc: "Every form submission is reviewed and followed up manually — no automated booking system.",
  },
  {
    icon: CalendarCheck,
    title: "Guest Matching",
    desc: "We connect interested short-term renters with the right property from our portfolio.",
  },
  {
    icon: BarChart3,
    title: "Listing Management",
    desc: "Publish, update, and manage property listings and track all inquiries from one dashboard.",
  },
  {
    icon: Shield,
    title: "Owner–Guest Coordination",
    desc: "All communication between property owners and guests is handled directly by our team.",
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
    q: "How do I list my property with Aurora Suites?",
    a: "Submit the homeowner form on our homepage or contact page. Our team will review your property details and follow up personally to discuss listing it on our website.",
  },
  {
    q: "How do guests enquire about a stay?",
    a: "Browse our properties, open a listing you like, and submit a stay inquiry with your preferred dates. We will contact you directly to confirm availability and next steps.",
  },
  {
    q: "Is booking done through the website?",
    a: "No. This website is for showcasing properties and collecting inquiries. All communication and arrangements are handled manually by our team.",
  },
  {
    q: "What types of properties do you work with?",
    a: "Apartments, townhouses, and homes across Melbourne — from CBD apartments to suburban family residences.",
  },
  {
    q: "How quickly will I hear back after submitting a form?",
    a: "We aim to respond to all homeowner and guest inquiries within one business day.",
  },
  {
    q: "What does Aurora Suites handle for homeowners?",
    a: "We collect properties from owners, showcase them online, receive guest inquiries, and manage the short-term rental process on your behalf.",
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
  const [sent, setSent] = useState(false);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    addInquiry({
      type: tab === "home" ? "homeowner" : "guest",
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      address: tab === "home" ? String(fd.get("address") || "") : undefined,
      message: tab === "guest" ? String(fd.get("message") || "") : undefined,
    });
    setSent(true);
    toast.success("Inquiry received! Our team will contact you shortly.");
    e.currentTarget.reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <img
        src={hero}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-linear-to-b from-ink/60 via-ink/40 to-sand" />

      <div className="container-luxe hero-inner relative w-full">
        <div className="grid items-center gap-8 xl:grid-cols-[1.1fr_1fr] xl:gap-12">
          {/* Left content */}
          <div>
            <FadeIn>
              <span className="eyebrow text-copper-soft! text-sm!">Welcome to Aurora Suites</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl leading-[1.1]">
                Curated Short-Stay{" "}
                <span className="italic-script text-copper-soft! block mt-1 text-5xl md:text-7xl tracking-normal">
                  Properties in Melbourne.
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-lg text-lg text-sand-soft/75 leading-relaxed">
                We partner with homeowners, showcase premium properties, and connect guests with
                the right stay — with every inquiry handled personally by our team.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-6 flex flex-wrap gap-3 md:mt-8 md:gap-4">
                <Link to="/properties" className="btn-primary py-2.5">
                  Browse Properties <ArrowRight className="size-4 md:size-[18px]" />
                </Link>
                <Link to="/contact" className="btn-outline">
                  List Your Property
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
                className="aspect-3/4 w-full rounded-2xl object-cover shadow-luxe"
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
                  className="aspect-4/3 w-full rounded-2xl object-cover shadow-luxe"
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
                className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl px-2 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base font-semibold transition ${
                  tab === "home"
                    ? "bg-sand text-ink shadow-soft"
                    : "text-muted-foreground hover:text-ink"
                }`}
              >
                <HomeIcon size={18} className="text-copper shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="hidden sm:inline">I am a </span>
                  <span className="capitalize sm:normal-case">homeowner</span>
                </span>
              </button>
              <button
                onClick={() => setTab("guest")}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl px-2 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base font-semibold transition ${
                  tab === "guest"
                    ? "bg-sand text-ink shadow-soft"
                    : "text-muted-foreground hover:text-ink"
                }`}
              >
                <KeyRound size={18} className="text-copper shrink-0" />
                <span className="whitespace-nowrap">
                  <span className="hidden sm:inline">I am a </span>
                  <span className="capitalize sm:normal-case">guest</span>
                </span>
              </button>
            </div>
            <div className="mt-2 rounded-xl bg-sand p-6">
              <p className="mb-5 text-base text-muted-foreground">
                {tab === "home" ? (
                  <>
                    <span className="italic-script text-lg!">Own a property in Melbourne?</span> Tell
                    us about your home and our team will reach out to discuss listing it with Aurora
                    Suites.
                  </>
                ) : (
                  <>
                    <span className="italic-script text-lg!">Looking for a short stay?</span> Share
                    your details and we&rsquo;ll help you find the right property.
                  </>
                )}
              </p>
              <form
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[1fr_1fr_1fr_1fr_auto]"
                onSubmit={handleInquirySubmit}
              >
                <input
                  name="name"
                  required
                  className="rounded-xl border border-border bg-white px-5 py-3.5 text-base placeholder:text-muted-foreground/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20"
                  placeholder="Full Name"
                />
                {tab === "home" ? (
                  <input
                    name="address"
                    required
                    className="rounded-xl border border-border bg-white px-5 py-3.5 text-base placeholder:text-muted-foreground/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20"
                    placeholder="Property Address"
                  />
                ) : (
                  <input
                    name="message"
                    className="rounded-xl border border-border bg-white px-5 py-3.5 text-base placeholder:text-muted-foreground/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20 sm:col-span-1"
                    placeholder="What are you looking for?"
                  />
                )}
                <input
                  name="email"
                  type="email"
                  required
                  className="rounded-xl border border-border bg-white px-5 py-3.5 text-base placeholder:text-muted-foreground/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20"
                  placeholder="Email Address"
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  className="rounded-xl border border-border bg-white px-5 py-3.5 text-base placeholder:text-muted-foreground/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20"
                  placeholder="Phone Number"
                />
                <button type="submit" className="btn-primary whitespace-nowrap sm:col-span-2 lg:col-span-4 xl:col-span-1">
                  {sent ? "Inquiry Sent ✓" : tab === "home" ? "List My Property" : "Send Inquiry"}
                </button>
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
  const logos = [
    "OXFORD",
    "Belle",
    "RESORT GLOBAL",
    "CONQUEST",
    "RayWhite",
    "FORGE",
    "Elite",
    "DPM",
    "TMG",
  ];
  return (
    <section className="section-pad bg-sand">
      <div className="container-luxe">
        <FadeIn>
          <p className="text-center text-sm tracking-[0.3em] text-muted-foreground font-medium">
            — TRUSTED BY SOME OF THE BIGGEST NAMES IN REAL ESTATE —
          </p>
        </FadeIn>
        <StaggerContainer className="section-gap flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
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
    { icon: TrendingUp, text: "Partner with homeowners to list premium short-stay properties" },
    { icon: Shield, text: "Showcase each home with professional photography and detailed listings" },
    { icon: Clock, text: "Receive and manage guest inquiries manually with a personal touch" },
    { icon: Headphones, text: "Handle all owner and guest communication directly from our team" },
  ];
  return (
    <section className="section-pad bg-sand-soft">
      <div className="container-luxe grid-split">
        <div>
          <FadeIn>
            <span className="eyebrow">About Us</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-4 tracking-tight">
              Showcasing properties, <span className="italic-script">connecting people</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Aurora Suites works with Melbourne homeowners to collect and rent short-stay
              properties. We showcase them on this website and manage every inquiry from owners and
              guests manually — so nothing falls through the cracks.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Whether you want to list your property or find your next stay, submit an inquiry and
              our team will follow up with you directly by phone or email.
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
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              src={living}
              alt=""
              loading="lazy"
              className="aspect-square rounded-2xl object-cover shadow-soft"
            />
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              src={skyline}
              alt=""
              loading="lazy"
              className="aspect-square rounded-2xl object-cover shadow-soft mt-8"
            />
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              src={bedroom}
              alt=""
              loading="lazy"
              className="aspect-square rounded-2xl object-cover shadow-soft"
            />
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              src={kitchen}
              alt=""
              loading="lazy"
              className="aspect-square rounded-2xl object-cover shadow-soft mt-8"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── LOCATIONS ─── */
function FeaturedIn() {
  const areas = ["Southbank", "Carlton", "St Kilda", "Richmond", "Docklands", "South Yarra", "Melbourne CBD"];
  return (
    <section className="section-pad bg-sand-soft">
      <div className="container-luxe">
        <FadeIn>
          <p className="text-center text-sm tracking-[0.3em] text-muted-foreground font-medium">
            — PROPERTIES ACROSS MELBOURNE —
          </p>
        </FadeIn>
        <StaggerContainer className="section-gap flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-ink/55">
          {areas.map((l) => (
            <StaggerItem key={l}>
              <span className="font-display text-xl tracking-wide hover:text-ink transition-colors cursor-default">
                {l}
              </span>
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
      <img
        src={penthouse}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-ink/85" />
      <div className="container-luxe relative">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow text-copper-soft!">Our Services</span>
            <h2 className="mt-4 text-white tracking-tight">
              How We Help{" "}
              <span className="italic-script text-copper-soft!">Homeowners &amp; Guests</span>
            </h2>
            <p className="mt-4 text-lg text-sand-soft/60">
              We showcase properties, collect inquiries through the website, and handle every
              arrangement personally on your behalf.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer
          className="section-gap grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.title}>
                <motion.div
                  whileHover={{ y: -5, borderColor: "rgba(191,145,82,0.5)" }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-2xl border border-white/10 bg-white/4 p-7 backdrop-blur transition-colors h-full"
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
    {
      icon: Shield,
      title: "Personal Follow-Up",
      desc: "Every inquiry from homeowners and guests is reviewed and responded to by our team.",
    },
    {
      icon: HomeIcon,
      title: "Quality Listings",
      desc: "Properties are professionally photographed and presented to attract the right guests.",
    },
    {
      icon: Clock,
      title: "Manual Coordination",
      desc: "We manage communication between owners and renters — no automated booking on the site.",
    },
  ];
  return (
    <section className="relative isolate overflow-hidden bg-ink section-pad">
      <img
        src={skyline}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/90 to-ink/70" />
      <div className="container-luxe relative">
        <div className="grid-split">
          <FadeIn>
            <div>
              <span className="eyebrow text-copper-soft!">Your Property is Our Priority</span>
              <h2 className="mt-4 text-white tracking-tight">
                Built on Professionalism,{" "}
                <span className="italic-script text-copper-soft!">Not Promises</span>
              </h2>
              <p className="mt-6 text-lg text-sand-soft/65 leading-relaxed">
                We built Aurora Suites around a simple model: showcase great properties, collect
                inquiries through the website, and handle every conversation personally. Homeowners
                partner with us; guests browse and enquire — we do the rest.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-4" staggerDelay={0.1}>
            {priorities.map((p) => {
              const Icon = p.icon;
              return (
                <StaggerItem key={p.title}>
                  <div className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur">
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
              What Our Property Owners <span className="italic-script">Say</span>
            </h2>
          </div>
        </FadeIn>

        <div className="section-gap grid gap-6 md:grid-cols-3">
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
      <img
        src={skyline}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-12"
      />
      <div className="absolute inset-0 bg-ink/90" />
      <div className="container-luxe relative max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center">
            <span className="eyebrow text-copper-soft!">FAQ</span>
            <h2 className="mt-4 text-white tracking-tight">
              Frequently Asked <span className="italic-script text-copper-soft!">Questions</span>
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer className="section-gap space-y-3" staggerDelay={0.06}>
          {faqs.map((f, i) => (
            <StaggerItem key={f.q}>
              <motion.div layout className="overflow-hidden rounded-xl bg-sand-soft text-ink">
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
                  <div className="px-6 pb-5 text-base text-muted-foreground leading-relaxed">
                    {f.a}
                  </div>
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
  const properties = getPublishedProperties().slice(0, 3);

  return (
    <section className="section-pad bg-sand-soft">
      <div className="container-luxe">
        <div className="grid-split items-end">
          <FadeIn>
            <div>
              <span className="eyebrow">Showcase</span>
              <h2 className="mt-4 tracking-tight">
                OUR <span className="italic-script">Properties</span>
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-muted-foreground leading-relaxed lg:text-right">
              Browse our curated Melbourne portfolio. Open a listing and submit a stay inquiry — our
              team will follow up with you directly.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer
          className="section-gap grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.1}
        >
          {properties.map((p) => (
            <StaggerItem key={p.title}>
              <Link to={`/properties/${p.slug}`}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group overflow-hidden rounded-2xl bg-ink text-sand-soft shadow-soft"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
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
