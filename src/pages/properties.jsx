import { Link } from "react-router-dom";
import { ArrowRight, Bath, BedDouble, Users } from "lucide-react";
import { Layout, PageHero } from "@/components/site/Layout";
import penthouse from "@/assets/penthouse.jpg";
import living from "@/assets/living-room.jpg";
import bedroom from "@/assets/bedroom.jpg";
import kitchen from "@/assets/kitchen.jpg";
import dining from "@/assets/dining.jpg";
import skyline from "@/assets/skyline.jpg";

const items = [
  {
    img: penthouse,
    title: "Sub-Penthouse | Pool, Gym & 2 Parking",
    beds: 3,
    baths: 2,
    guests: 6,
    location: "Southbank",
  },
  {
    img: living,
    title: "Central Apt | Tennis, Pool & Gym",
    beds: 2,
    baths: 1,
    guests: 4,
    location: "Docklands",
  },
  {
    img: bedroom,
    title: "Gorgeous City Views | 2BR APT",
    beds: 2,
    baths: 2,
    guests: 4,
    location: "Melbourne CBD",
  },
  {
    img: kitchen,
    title: "Designer Kitchen Loft",
    beds: 1,
    baths: 1,
    guests: 2,
    location: "Fitzroy",
  },
  {
    img: dining,
    title: "Sunlit Family Residence",
    beds: 3,
    baths: 2,
    guests: 6,
    location: "South Yarra",
  },
  {
    img: skyline,
    title: "Skyline Studio Retreat",
    beds: 1,
    baths: 1,
    guests: 2,
    location: "Carlton",
  },
];

export default function PropertiesPage() {
  return (
    <Layout>
      <PageHero title="OUR" script="Properties" image={penthouse} />

      <section className="section-pad bg-sand">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Showcase</span>
            <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">
              A curated portfolio across <span className="italic-script">Melbourne</span>
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Every home in our care is professionally styled, photographed, and listed to attract
              the right guests at the right price.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <article
                key={p.title}
                className="group overflow-hidden rounded-xl bg-ink text-sand-soft shadow-soft transition hover:shadow-luxe"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs tracking-[0.15em] text-sand-soft backdrop-blur">
                    {p.location}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base">{p.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-sand-soft/65">
                    <span className="flex items-center gap-1">
                      <Users size={12} className="text-copper" /> {p.guests} guests
                    </span>
                    <span className="flex items-center gap-1">
                      <BedDouble size={12} className="text-copper" /> {p.beds} bed
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath size={12} className="text-copper" /> {p.baths} bath
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand-soft pb-24">
        <div className="container-luxe rounded-3xl bg-ink p-10 text-center text-sand-soft md:p-16">
          <h2 className="text-3xl tracking-tight md:text-4xl">
            Want your property to <span className="italic-script !text-copper-soft">join the portfolio?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-sand-soft/70">
            Get a free revenue estimate and discover how much your property could earn under Live
            Luxe management.
          </p>
          <Link to="/contact" className="btn-primary mt-8">
            Get Your Estimate <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
