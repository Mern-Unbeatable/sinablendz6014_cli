import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/site/Layout";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

export const team = [
  {
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    name: "Sarah Mitchell",
    role: "Operations Manager",
  },
  {
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    name: "James Cooper",
    role: "Property Specialist",
  },
  {
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    name: "Emma Chen",
    role: "Guest Experience Lead",
  },
];

export default function Team() {
  return (
    <Section className="bg-sand">
      <div className="container-luxe">
        <FadeIn>
          <SectionHeader
            eyebrow="Our Team"
            title="Meet the"
            script="team"
            description="A dedicated local team focused on listing properties, responding to inquiries, and coordinating stays between homeowners and guests."
          />
        </FadeIn>

        <StaggerContainer className="section-gap grid gap-6 md:grid-cols-3" staggerDelay={0.1}>
          {team.map((t) => (
            <StaggerItem key={t.name}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="group overflow-hidden rounded-2xl bg-white shadow-soft"
              >
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={t.img}
                    alt={t.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold">{t.name}</h3>
                  <p className="mt-1 text-[0.95rem] text-copper font-medium">{t.role}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  );
}
