import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { getPublishedProperties } from "@/lib/store";

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
export default Properties;
