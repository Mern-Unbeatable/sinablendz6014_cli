import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import penthouse from "@/assets/penthouse.jpg";
import { services } from "../home";

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
export default Services;
