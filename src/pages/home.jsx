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
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
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
    desc: "High-converting property descriptions, SEO-friendly titles, and stunning photography.",
  },
  {
    icon: HomeIcon,
    title: "Property Maintenance & Upkeep",
    desc: "Vetted housekeeping teams, hotel-quality turnover standards, and regular maintenance.",
  },
  {
    icon: Headphones,
    title: "24/7 Guest Communication",
    desc: "Fast, friendly, secure communication that ensures safety and 5-star reviews.",
  },
  {
    icon: CalendarCheck,
    title: "Multi-Platform Channel Management",
    desc: "Seamless listings across Airbnb, Booking.com, Stayz, and direct booking platforms.",
  },
  {
    icon: BarChart3,
    title: "Revenue Reporting & Owner Portal",
    desc: "Full visibility into your property's performance, earnings, and calendar.",
  },
  {
    icon: LineChart,
    title: "Dynamic Pricing Strategy",
    desc: "Real-time price adjustments based on demand, season, and competitor analysis.",
  },
];

const reviews = [
  {
    name: "Paul",
    text: "Very clean and modern with great views. Truly five star and a great spot. Excellent host who informed us regularly.",
  },
  {
    name: "Manuelika",
    text: "We got there and stayed in the most luxurious amazing place. I want to stay here forever.",
  },
  {
    name: "Ahmed",
    text: "Highly recommend this apartment! Hosts attended to all my needs immediately.",
  },
  {
    name: "Josh",
    text: "Loved location, scenic Melbourne views. Wide open balcony and bedroom views to die for. Apartment is gorgeous.",
  },
  {
    name: "Sheng",
    text: "We have very enjoyed our stay. Liked the views. We will book again and have a wonderful time here.",
  },
  {
    name: "Sehet",
    text: "Modern, definitely recommend staying — comfortable, spacious, and a great location.",
  },
  {
    name: "Nez",
    text: "Fantastic accommodation, clean and modern. Comfortable bed and a good location with stunning views.",
  },
  {
    name: "Cherrie",
    text: "Wonderful, helpful, accommodating. Lovely furnished apartment in a great area. Highly recommend!",
  },
];

const faqs = [
  {
    q: "How much do your vacation rental management services cost?",
    a: "We operate on a simple revenue-share model — 10% for our Support Package and 18% for the Complete Package. No hidden fees, no long contracts.",
  },
  {
    q: "Do I retain control of my calendar?",
    a: "Absolutely. You can block out personal stays anytime through our owner portal.",
  },
  {
    q: "What types of properties do you manage?",
    a: "Apartments, townhouses, and homes across Melbourne's most desirable suburbs.",
  },
  {
    q: "How do you handle guest communication and issues?",
    a: "Our team is on call 24/7 to handle every guest enquiry, request, and unexpected issue.",
  },
  {
    q: "Can I use my property for personal stays?",
    a: "Yes. Owners typically enjoy their property whenever they choose — just block dates in your portal.",
  },
  {
    q: "How soon can we get started?",
    a: "Most properties are styled, listed, and generating income in as little as 7 days.",
  },
];

const properties = [
  {
    img: penthouse,
    title: "Gorgeous Sub-Penthouse with 2x Parking, Pool, Gym",
    beds: 3,
    baths: 2,
    guests: 6,
  },
  {
    img: living,
    title: "Super Central Apt with Parking, Tennis, Pool & Gym",
    beds: 2,
    baths: 1,
    guests: 4,
  },
  {
    img: bedroom,
    title: "Live Luxe | Gorgeous City Views 2BR APT w/ Pool & Gym",
    beds: 2,
    baths: 2,
    guests: 4,
  },
];

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <Trusted />
      <Stress />
      <FeaturedIn />
      <Services />
      <Testimonials />
      <Faq />
      <Properties />
    </Layout>
  );
}

function Hero() {
  const [tab, setTab] = useState("home");
  return (
    <section className="relative isolate overflow-hidden bg-sand">
      <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-sand-soft via-sand-soft/95 to-sand" />

      <div className="container-luxe relative pt-36 pb-20 text-center">
        {/* corner thumbs */}
        <div className="pointer-events-none hidden md:block">
          <img
            src={dining}
            alt=""
            loading="lazy"
            className="absolute left-6 top-32 h-28 w-44 rounded-md object-cover shadow-soft"
          />
          <img
            src={kitchen}
            alt=""
            loading="lazy"
            className="absolute left-16 top-72 h-28 w-44 rounded-md object-cover shadow-soft"
          />
          <img
            src={skyline}
            alt=""
            loading="lazy"
            className="absolute right-6 top-32 h-28 w-44 rounded-md object-cover shadow-soft"
          />
          <img
            src={penthouse}
            alt=""
            loading="lazy"
            className="absolute right-16 top-72 h-28 w-44 rounded-md object-cover shadow-soft"
          />
        </div>

        <h1 className="text-3xl tracking-[0.18em] text-ink md:text-5xl">
          AIRBNB MANAGEMENT
          <br />
          <span className="italic-script !text-4xl !tracking-normal md:!text-6xl">Made Simple</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm text-muted-foreground md:text-base">
          Melbourne Property Owners.
          <br />
          Earn up to 40% more with zero work.
        </p>

        {/* Tabs */}
        <div className="mx-auto mt-14 max-w-3xl rounded-2xl bg-white p-2 shadow-luxe">
          <div className="grid grid-cols-2 gap-1 rounded-xl">
            <button
              onClick={() => setTab("home")}
              className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition ${tab === "home" ? "bg-sand text-ink" : "text-muted-foreground hover:text-ink"}`}
            >
              <HomeIcon size={16} className="text-copper" /> I am a homeowner
            </button>
            <button
              onClick={() => setTab("guest")}
              className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition ${tab === "guest" ? "bg-sand text-ink" : "text-muted-foreground hover:text-ink"}`}
            >
              <KeyRound size={16} className="text-copper" /> I am a guest
            </button>
          </div>
        </div>

        <div className="mx-auto mt-3 max-w-4xl rounded-2xl bg-sand p-6 shadow-soft">
          <p className="mb-4 text-left text-sm text-muted-foreground">
            <span className="italic-script !text-base">Is your property in Ivanhoe?</span> Check if
            we manage homes in your area. Simply fill out your details and we&rsquo;ll be in touch
            to discuss your goals.
          </p>
          <form
            className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_1fr_auto]"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="rounded-lg border border-border bg-white px-4 py-3 text-sm"
              placeholder="Full Name"
            />
            <input
              className="rounded-lg border border-border bg-white px-4 py-3 text-sm"
              placeholder="Property Address"
            />
            <input
              className="rounded-lg border border-border bg-white px-4 py-3 text-sm"
              placeholder="Email Address"
            />
            <input
              className="rounded-lg border border-border bg-white px-4 py-3 text-sm"
              placeholder="Phone Number"
            />
            <button className="btn-primary whitespace-nowrap">Get Your Rental Estimate</button>
          </form>
        </div>
      </div>
    </section>
  );
}

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
    <section className="bg-sand pb-20">
      <div className="container-luxe">
        <p className="text-center text-xs tracking-[0.3em] text-muted-foreground">
          — TRUSTED BY SOME OF THE BIGGEST NAMES IN REAL ESTATE —
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((l) => (
            <span key={l} className="font-display text-xl tracking-widest text-ink/70">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stress() {
  const items = [
    "Earn 40% more vs managing it yourself",
    "Professional listings, premium photography & smart dynamic pricing",
    "Full-service vacation management with local team on standby",
    "No stress, no late-night guest calls — just passive income",
  ];
  return (
    <section className="section-pad bg-sand-soft">
      <div className="container-luxe grid items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-3xl tracking-tight text-ink md:text-4xl">
            Stress-Free Management, <span className="italic-script">Better Returns</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Stop leaving money on the table. We handle every part of your short-term rental so you
            can earn more, without doing more.
          </p>
          <ul className="mt-8 space-y-4">
            {items.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-copper/15 text-copper">
                  <Check size={12} />
                </span>
                <span className="text-sm text-ink/85">{t}</span>
              </li>
            ))}
          </ul>
          <Link to="/services" className="btn-ghost-dark mt-8">
            Unlock your property&rsquo;s full earning potential <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <img
            src={living}
            alt=""
            loading="lazy"
            className="aspect-square rounded-xl object-cover"
          />
          <img
            src={skyline}
            alt=""
            loading="lazy"
            className="aspect-square rounded-xl object-cover"
          />
          <img
            src={bedroom}
            alt=""
            loading="lazy"
            className="aspect-square rounded-xl object-cover"
          />
          <img
            src={kitchen}
            alt=""
            loading="lazy"
            className="aspect-square rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function FeaturedIn() {
  const logos = ["airbnb", "Booking.com", "vrbo", "stayz", "HomeAway", "MARRIOTT BONVOY", "Google"];
  return (
    <section className="bg-sand-soft pb-16">
      <div className="container-luxe">
        <p className="text-center text-xs tracking-[0.3em] text-muted-foreground">
          — FEATURED IN —
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 text-ink/60">
          {logos.map((l) => (
            <span key={l} className="font-display text-lg tracking-wide">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-sand-soft">
      <img
        src={penthouse}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-ink/80" />
      <div className="container-luxe relative">
        <div className="text-center">
          <h2 className="text-3xl tracking-[0.12em] md:text-4xl">
            OUR VACATION RENTAL{" "}
            <span className="italic-script !text-copper-soft !tracking-normal">
              Management Services
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-sand-soft/65">
            We offer turnkey short-term rental services tailored to make ownership effortless and
            profitable.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition hover:border-copper/40 hover:bg-white/[0.06]"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-copper/15 text-copper">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="text-lg text-sand-soft">{s.title}</h3>
                    <p className="mt-1 text-sm text-sand-soft/60">{s.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link to="/services" className="btn-primary">
            See Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section-pad bg-sand">
      <div className="container-luxe">
        <h2 className="text-center text-3xl tracking-tight md:text-4xl">
          WHAT OUR <span className="italic-script">Guests Say</span>
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {reviews.map((r) => (
            <article key={r.name} className="rounded-xl bg-white p-5 shadow-soft">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-copper/20 text-xs font-semibold text-copper">
                  {r.name[0]}
                </span>
                <div>
                  <p className="text-xs font-semibold">{r.name}</p>
                  <div className="flex gap-0.5 text-copper">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={9} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{r.text}</p>
              <button className="mt-2 text-xs font-medium text-copper hover:underline">
                Read more
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-sand-soft">
      <img
        src={skyline}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-ink/85" />
      <div className="container-luxe relative max-w-3xl">
        <h2 className="text-center text-3xl tracking-tight md:text-4xl">
          FREQUENTLY ASKED <span className="italic-script !text-copper-soft">Questions</span>
        </h2>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="rounded-lg bg-sand-soft text-ink">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium"
              >
                {f.q}
                <span className="text-copper">
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              {open === i && <div className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Properties() {
  return (
    <section className="section-pad bg-sand-soft">
      <div className="container-luxe">
        <div className="grid items-end gap-6 md:grid-cols-2">
          <h2 className="text-3xl tracking-tight md:text-4xl">
            OUR <span className="italic-script">Properties</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            We manage every aspect of your short-term rental with care and precision. From guest
            screening to professional cleaning, your home is protected, maintained and optimised to
            deliver strong returns.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {properties.map((p) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-xl bg-ink text-sand-soft shadow-soft"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base">{p.title}</h3>
                <div className="mt-3 flex gap-4 text-xs text-sand-soft/65">
                  <span>{p.guests} GUESTS</span>
                  <span>{p.beds} BEDROOMS</span>
                  <span>{p.baths} BATH</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
