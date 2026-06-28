import { Section } from "@/components/site/Layout";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import penthouse from "@/assets/penthouse.jpg";

export const stats = [
  { k: "6+", v: "Properties in portfolio" },
  { k: "100%", v: "Inquiries handled manually" },
  { k: "1 day", v: "Typical response time" },
  { k: "Melbourne", v: "Local, hands-on team" },
];

export default function Stats() {
  return (
    <Section className="relative isolate overflow-hidden bg-ink text-sand-soft">
      <img
        src={penthouse}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-ink/80" />
      <div className="container-luxe relative">
        <StaggerContainer
          className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.1}
        >
          {stats.map((s) => (
            <StaggerItem key={s.k}>
              <div>
                <div className="font-display text-6xl italic text-copper-soft">{s.k}</div>
                <p className="mt-3 text-sm tracking-[0.2em] text-sand-soft/60 font-medium">
                  {s.v.toUpperCase()}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  );
}
