import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/site/Layout";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import penthouse from "@/assets/penthouse.jpg";

export const steps = [
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

export default function Process() {
  return (
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
  );
}
