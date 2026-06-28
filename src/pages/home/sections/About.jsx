import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { ArrowRight, TrendingUp, Shield, Clock, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import living from "@/assets/living-room.jpg";
import bedroom from "@/assets/bedroom.jpg";
import kitchen from "@/assets/kitchen.jpg";
import skyline from "@/assets/skyline.jpg";

function About() {
  const items = [
    { icon: TrendingUp, text: "Partner with homeowners to list premium short-stay properties" },
    {
      icon: Shield,
      text: "Showcase each home with professional photography and detailed listings",
    },
    { icon: Clock, text: "Receive and manage guest inquiries manually with a personal touch" },
    { icon: Headphones, text: "Handle all owner and guest communication directly from our team" },
  ];
  return (
    <section className="section-pad bg-sand-soft">
      <div className="container-luxe grid-split">
        <div>
          <FadeIn>
            <span className="eyebrow">About Us</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-4 tracking-tight">
              Showcasing properties, <span className="italic-script">connecting people</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Aurora Suites works with Melbourne homeowners to collect and rent short-stay
              properties. We showcase them on this website and manage every inquiry from owners and
              guests manually — so nothing falls through the cracks.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Whether you want to list your property or find your next stay, submit an inquiry and
              our team will follow up with you directly by phone or email.
            </p>
          </FadeIn>
          <StaggerContainer className="mt-8 space-y-4" staggerDelay={0.08}>
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.text}>
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-copper/15 text-copper">
                      <Icon size={20} />
                    </span>
                    <span className="text-base text-ink/85 pt-2">{item.text}</span>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
          <FadeIn delay={0.4}>
            <Link to="/about" className="btn-ghost-dark mt-10">
              Learn More About Us <ArrowRight size={18} />
            </Link>
          </FadeIn>
        </div>

        <FadeIn direction="left" delay={0.2}>
          <div className="grid grid-cols-2 gap-4">
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              src={living}
              alt=""
              loading="lazy"
              className="aspect-square rounded-2xl object-cover shadow-soft"
            />
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              src={skyline}
              alt=""
              loading="lazy"
              className="aspect-square rounded-2xl object-cover shadow-soft mt-8"
            />
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              src={bedroom}
              alt=""
              loading="lazy"
              className="aspect-square rounded-2xl object-cover shadow-soft"
            />
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              src={kitchen}
              alt=""
              loading="lazy"
              className="aspect-square rounded-2xl object-cover shadow-soft mt-8"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
export default About;
