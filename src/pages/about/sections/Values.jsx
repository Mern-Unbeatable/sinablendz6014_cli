import { Shield, Sparkles, Heart, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/site/Layout";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

export const values = [
  {
    icon: Shield,
    t: "Trust & Transparency",
    d: "Clear communication at every step — your property and inquiries are in safe, experienced hands.",
  },
  {
    icon: Sparkles,
    t: "Quality Listings",
    d: "Every property is professionally photographed and presented to attract the right guests.",
  },
  {
    icon: Heart,
    t: "Personal Service",
    d: "We treat every inquiry individually — because great stays start with a human conversation.",
  },
  {
    icon: Award,
    t: "Proven Process",
    d: "A straightforward workflow — list, enquire, connect — that keeps owners and guests informed.",
  },
];

export default function Values() {
  return (
    <Section className="bg-sand-soft">
      <div className="container-luxe">
        <FadeIn>
          <SectionHeader
            eyebrow="Our Values"
            title="What we"
            script="stand for"
            description="These aren't just words — they're the principles that guide every decision we make."
          />
        </FadeIn>

        <StaggerContainer
          className="section-gap grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.1}
        >
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <StaggerItem key={v.t}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl bg-white p-8 shadow-soft h-full"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-copper/15 text-copper">
                    <Icon size={24} />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">{v.t}</h3>
                  <p className="mt-3 text-[0.95rem] text-muted-foreground leading-relaxed">
                    {v.d}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </Section>
  );
}
