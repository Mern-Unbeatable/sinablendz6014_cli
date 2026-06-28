import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/site/Layout";
import { FadeIn } from "@/components/animations";
import living from "@/assets/living-room.jpg";
import penthouse from "@/assets/penthouse.jpg";

export default function Story() {
  return (
    <Section className="bg-sand">
      <div className="container-luxe grid-split">
        <div>
          <FadeIn>
            <span className="eyebrow">Our Story</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-4 tracking-tight">
              Melbourne-born, owner-<span className="italic-script">obsessed</span>.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Aurora Suites was founded to give Melbourne homeowners a simple way to list their
              properties for short-stay use — and give guests a curated place to browse and enquire,
              without the noise of big booking platforms.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Today we partner with homeowners across Melbourne&rsquo;s most desirable suburbs,
              showcasing their properties on this website and arranging short-term stays through
              personal, hands-on service.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our mission is straightforward: showcase great properties, collect inquiries through
              the website, and manage every conversation between owners and guests manually — so
              nothing falls through the cracks.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link to="/contact" className="btn-primary mt-8">
              Let&rsquo;s Talk <ArrowRight size={18} />
            </Link>
          </FadeIn>
        </div>

        <FadeIn direction="left" delay={0.2}>
          <div className="relative">
            <motion.img
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              src={living}
              alt="Living room"
              loading="lazy"
              className="aspect-4/5 w-full rounded-2xl object-cover shadow-luxe"
            />
            <motion.img
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              src={penthouse}
              alt="Penthouse"
              loading="lazy"
              className="absolute -bottom-10 -left-10 hidden h-52 w-72 rounded-2xl border-4 border-sand object-cover shadow-luxe md:block"
            />
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
