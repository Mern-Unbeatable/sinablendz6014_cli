import { motion } from "framer-motion";
import { Section } from "@/components/site/Layout";
import { Logo } from "@/components/site/Logo";
import { FadeIn } from "@/components/animations";
import skyline from "@/assets/skyline.jpg";
import penthouse from "@/assets/penthouse.jpg";

export default function WhatWeDo() {
  return (
    <Section className="bg-sand pb-8 lg:pb-10">
      <div className="container-luxe grid-split">
        <div>
          <FadeIn>
            <Logo className="h-16" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-3 tracking-tight">
              WHAT WE DO <span className="italic-script">For You</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Aurora Suites is a property showcase and inquiry platform. We collect properties from
              Melbourne homeowners, list them on this website, and arrange short-term stays for
              interested guests — all managed manually by our team.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The website is not a booking engine. It helps us present listings, receive inquiries,
              and keep everything organised while we handle communication between owners and guests
              directly.
            </p>
          </FadeIn>
        </div>
        <FadeIn direction="left" delay={0.2}>
          <div className="grid grid-cols-2 gap-4">
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              src={skyline}
              alt=""
              loading="lazy"
              className="aspect-3/4 rounded-2xl object-cover shadow-soft"
            />
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              src={penthouse}
              alt=""
              loading="lazy"
              className="aspect-3/4 rounded-2xl object-cover shadow-soft mt-8"
            />
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
