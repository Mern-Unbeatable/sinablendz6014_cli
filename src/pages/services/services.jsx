import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout, PageHero, Section, SectionHeader } from "@/components/site/Layout";
import { FadeIn } from "@/components/animations";
import living from "@/assets/living-room.jpg";

import WhatWeDo from "./sections/WhatWeDo";
import Audience from "./sections/Audience";
import Process from "./sections/Process";

export default function ServicesPage() {
  return (
    <Layout>
      <PageHero title="OUR" script="Services" image={living}>
        <p className="mt-6 max-w-xl text-lg text-sand-soft/75 leading-relaxed">
          How we work with homeowners and guests — from listing properties to managing every inquiry
          manually.
        </p>
      </PageHero>

      <WhatWeDo />
      <Audience />

      <Section className="bg-sand-soft">
        <div className="container-luxe text-center">
          <FadeIn>
            <SectionHeader
              eyebrow="Get in Touch"
              title="READY TO START?"
              description="Whether you're a homeowner looking to list or a guest searching for a stay, submit an inquiry and our team will respond within one business day."
            />
            <Link to="/contact" className="btn-primary mt-10 inline-flex">
              Contact Us <ArrowRight size={18} />
            </Link>
          </FadeIn>
        </div>
      </Section>

      <Process />
    </Layout>
  );
}
