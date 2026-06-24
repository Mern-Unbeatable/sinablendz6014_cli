import { Layout } from "@/components/site/Layout";
import { FadeIn } from "@/components/animations";

export default function TermsPage() {
  return (
    <Layout theme="light">
      <div className="pt-32 pb-20 bg-sand-soft min-h-screen">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <h1 className="text-4xl font-bold tracking-tight text-ink mb-4">Terms &amp; Conditions</h1>
            <p className="text-muted-foreground mb-10">Last updated: June 2026</p>
            
            <div className="prose prose-ink max-w-none space-y-6 text-ink/80 leading-relaxed">
              <p>
                Welcome to Aurora Suites. By accessing our website and utilizing our property management services, you agree to be bound by the following terms and conditions.
              </p>

              <h2 className="text-2xl font-semibold text-ink mt-10 mb-4">1. Services Provided</h2>
              <p>
                Aurora Suites provides professional short-stay property management services, including listing optimization, dynamic pricing, guest communication, and property maintenance coordination. The specific scope of services will be detailed in your individual management agreement.
              </p>

              <h2 className="text-2xl font-semibold text-ink mt-10 mb-4">2. Homeowner Responsibilities</h2>
              <p>
                As a homeowner partner, you agree to provide a property that meets local safety and compliance standards. You must ensure the property is available on agreed dates and notify us promptly of any issues that may affect guest stays.
              </p>

              <h2 className="text-2xl font-semibold text-ink mt-10 mb-4">3. Fees and Payments</h2>
              <p>
                Our management fees are charged as a percentage of the gross rental revenue, as outlined in your management agreement. Payouts are processed monthly, accompanied by a detailed revenue statement.
              </p>

              <h2 className="text-2xl font-semibold text-ink mt-10 mb-4">4. Limitation of Liability</h2>
              <p>
                While we take every precaution to vet guests and protect your property, Aurora Suites is not liable for damages caused by guests beyond the coverage provided by the booking platform's host guarantee or your personal landlord insurance policies.
              </p>

              <h2 className="text-2xl font-semibold text-ink mt-10 mb-4">5. Termination</h2>
              <p>
                Either party may terminate the management agreement with a 30-day written notice. Any upcoming bookings within that 30-day period must be honored or subjected to cancellation fees.
              </p>

              <h2 className="text-2xl font-semibold text-ink mt-10 mb-4">6. Governing Law</h2>
              <p>
                These terms and conditions are governed by the laws of Victoria, Australia. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in Victoria.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </Layout>
  );
}
