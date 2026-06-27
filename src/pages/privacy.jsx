import { Layout, PageMain } from "@/components/site/Layout";
import { FadeIn } from "@/components/animations";

export default function PrivacyPage() {
  return (
    <Layout theme="light">
      <PageMain>
        <div className="container-luxe max-w-3xl">
          <FadeIn>
            <h1 className="text-4xl font-bold tracking-tight text-ink mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-10">Last updated: June 2026</p>

            <div className="prose prose-ink max-w-none space-y-6 text-ink/80 leading-relaxed">
              <p>
                At Aurora Suites, we are committed to protecting your privacy and ensuring the
                security of your personal information. This Privacy Policy outlines how we collect,
                use, and safeguard the data you provide to us.
              </p>

              <h2 className="text-2xl font-semibold text-ink mt-10 mb-4">1. Information We Collect</h2>
              <p>
                We may collect personal information such as your name, email address, phone number,
                and property details when you submit an inquiry through our website forms or
                communicate with our team.
              </p>

              <h2 className="text-2xl font-semibold text-ink mt-10 mb-4">2. How We Use Your Information</h2>
              <p>
                The information we collect is used to respond to your inquiries, coordinate property
                listings and short-term stays, and improve your experience with Aurora Suites. We do
                not sell or share your personal data with third parties for marketing purposes.
              </p>

              <h2 className="text-2xl font-semibold text-ink mt-10 mb-4">3. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your personal information
                from unauthorized access, disclosure, or alteration.
              </p>

              <h2 className="text-2xl font-semibold text-ink mt-10 mb-4">4. Cookies</h2>
              <p>
                Our website may use cookies to enhance your browsing experience and analyze site
                traffic. You can choose to disable cookies through your browser settings, although
                this may affect certain functionalities of the website.
              </p>

              <h2 className="text-2xl font-semibold text-ink mt-10 mb-4">5. Your Rights</h2>
              <p>
                You have the right to access, update, or request the deletion of your personal
                information. To exercise these rights, please contact us at info@aurorasuites.com.au.
              </p>

              <h2 className="text-2xl font-semibold text-ink mt-10 mb-4">6. Changes to This Policy</h2>
              <p>
                We reserve the right to update this Privacy Policy as our business practices evolve.
                Any changes will be posted on this page with an updated revision date.
              </p>
            </div>
          </FadeIn>
        </div>
      </PageMain>
    </Layout>
  );
}
