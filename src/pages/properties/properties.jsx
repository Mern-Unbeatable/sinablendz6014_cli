import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout, PageHero, Section } from "@/components/site/Layout";
import { FadeIn } from "@/components/animations";
import penthouse from "@/assets/penthouse.jpg";

import PropertiesList from "./sections/PropertiesList";

export default function PropertiesPage() {
  return (
    <Layout>
      <PageHero title="OUR" script="Properties" image={penthouse}>
        <p className="mt-6 max-w-xl text-lg text-sand-soft/75 leading-relaxed">
          Browse our curated portfolio of short-stay properties across Melbourne. Enquire about a
          stay and our team will follow up with you directly.
        </p>
      </PageHero>

      <PropertiesList />

      <Section className="bg-sand-soft">
        <div className="container-luxe">
          <FadeIn>
            <div className="rounded-3xl bg-ink card-pad text-center text-sand-soft">
              <h2 className="tracking-tight text-white">
                Want your property to{" "}
                <span className="italic-script text-copper-soft!">join the portfolio?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg text-sand-soft/65 leading-relaxed">
                Submit your property details and our team will follow up personally to discuss
                listing it on Aurora Suites.
              </p>
              <Link to="/contact" className="btn-primary mt-10">
                List Your Property <ArrowRight size={18} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>
    </Layout>
  );
}
