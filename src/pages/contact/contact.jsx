import { Layout, PageHero, Section } from "@/components/site/Layout";
import dining from "@/assets/dining.jpg";

import ContactSidebar from "./sections/ContactSidebar";
import ContactForm from "./sections/ContactForm";

export default function ContactPage() {
  return (
    <Layout>
      <PageHero title="GET IN" script="Touch" image={dining}>
        <p className="mt-6 max-w-xl text-lg text-sand-soft/75 leading-relaxed">
          List your property or enquire about a stay — our team handles every conversation manually
          and will respond within one business day.
        </p>
      </PageHero>

      <Section className="bg-sand">
        <div className="container-luxe grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <ContactSidebar />
          <ContactForm />
        </div>
      </Section>
    </Layout>
  );
}
