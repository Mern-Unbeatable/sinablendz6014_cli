import { Layout, PageHero } from "@/components/site/Layout";
import skyline from "@/assets/skyline.jpg";

import Story from "./sections/Story";
import Values from "./sections/Values";
import Stats from "./sections/Stats";
import Team from "./sections/Team";

export default function AboutPage() {
  return (
    <Layout>
      <PageHero title="ABOUT" script="Aurora Suites" image={skyline}>
        <p className="mt-6 max-w-xl text-lg text-sand-soft/75 leading-relaxed">
          Melbourne&rsquo;s curated short-stay property showcase — connecting homeowners with guests
          through personal, hands-on service.
        </p>
      </PageHero>

      <Story />
      <Values />
      <Stats />
      <Team />
    </Layout>
  );
}
