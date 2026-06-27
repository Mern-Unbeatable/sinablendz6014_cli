import { Link } from "react-router-dom";
import { ArrowRight, Bath, BedDouble, Users, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Layout, PageHero } from "@/components/site/Layout";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { getPublishedProperties } from "@/lib/store";
import penthouse from "@/assets/penthouse.jpg";

export default function PropertiesPage() {
  const items = getPublishedProperties();
  return (
    <Layout>
      <PageHero title="OUR" script="Properties" image={penthouse}>
        <p className="mt-6 max-w-xl text-lg text-sand-soft/75 leading-relaxed">
          Browse our curated portfolio of short-stay properties across Melbourne. Enquire about a
          stay and our team will follow up with you directly.
        </p>
      </PageHero>

      <section className="section-pad bg-sand">
        <div className="container-luxe">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Showcase</span>
              <h2 className="mt-4 tracking-tight">
                A curated portfolio across <span className="italic-script">Melbourne</span>
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Every property in our portfolio is professionally photographed and listed for guests
                to browse. Click any listing to view details and submit a stay inquiry.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer
            className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.08}
          >
            {items.map((p) => (
              <StaggerItem key={p.title}>
                <Link to={`/properties/${p.slug}`}>
                  <motion.article
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="group overflow-hidden rounded-2xl bg-ink text-sand-soft shadow-soft transition-shadow hover:shadow-luxe"
                  >
                    <div className="relative aspect-4/3 overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-4 py-1.5 text-sm tracking-widest text-sand-soft backdrop-blur-sm font-medium">
                        <MapPin size={13} className="text-copper" />
                        {p.location}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold leading-snug">{p.title}</h3>
                      <div className="mt-4 flex flex-wrap gap-5 text-sm text-sand-soft/60">
                        <span className="flex items-center gap-1.5">
                          <Users size={14} className="text-copper" /> {p.guests} Guests
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BedDouble size={14} className="text-copper" /> {p.beds} Bed
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Bath size={14} className="text-copper" /> {p.baths} Bath
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-sm text-copper font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        View Details <ArrowRight size={14} />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-sand-soft">
        <div className="container-luxe">
          <FadeIn>
            <div className="rounded-3xl bg-ink p-8 text-center text-sand-soft md:p-12 lg:p-20">
              <h2 className="tracking-tight text-white">
                Want your property to{" "}
                <span className="italic-script text-copper-soft!">join the portfolio?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg text-sand-soft/65 leading-relaxed">
                Submit your property details and our team will follow up personally to discuss
                listing it on Aurora Suites.
              </p>
              <Link to="/contact" className="btn-primary mt-10">
                List Your Property <ArrowRight size={18} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
