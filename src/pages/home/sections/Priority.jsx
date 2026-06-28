import { Shield, Home as HomeIcon, Clock } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import skyline from "@/assets/skyline.jpg";

function Priority() {
  const priorities = [
    {
      icon: Shield,
      title: "Personal Follow-Up",
      desc: "Every inquiry from homeowners and guests is reviewed and responded to by our team.",
    },
    {
      icon: HomeIcon,
      title: "Quality Listings",
      desc: "Properties are professionally photographed and presented to attract the right guests.",
    },
    {
      icon: Clock,
      title: "Manual Coordination",
      desc: "We manage communication between owners and renters — no automated booking on the site.",
    },
  ];
  return (
    <section className="relative isolate overflow-hidden bg-ink section-pad">
      <img
        src={skyline}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/90 to-ink/70" />
      <div className="container-luxe relative">
        <div className="grid-split">
          <FadeIn>
            <div>
              <span className="eyebrow text-copper-soft!">Your Property is Our Priority</span>
              <h2 className="mt-4 text-white tracking-tight">
                Built on Professionalism,{" "}
                <span className="italic-script text-copper-soft!">Not Promises</span>
              </h2>
              <p className="mt-6 text-lg text-sand-soft/65 leading-relaxed">
                We built Aurora Suites around a simple model: showcase great properties, collect
                inquiries through the website, and handle every conversation personally. Homeowners
                partner with us; guests browse and enquire — we do the rest.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-4" staggerDelay={0.1}>
            {priorities.map((p) => {
              const Icon = p.icon;
              return (
                <StaggerItem key={p.title}>
                  <div className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur">
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-copper/15 text-copper">
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-sand-soft">{p.title}</h3>
                      <p className="mt-1 text-[0.95rem] text-sand-soft/60">{p.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
export default Priority;
