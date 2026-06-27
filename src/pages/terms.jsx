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
                Welcome to Aurora Suites. By accessing our website and submitting inquiries, you agree to be bound by the following terms and conditions.
              </p>

              <h2 className="text-2xl font-semibold text-ink mt-10 mb-4">1. Services Provided</h2>
              <p>
                Aurora Suites showcases short-stay properties on this website and collects inquiries from homeowners and guests. We arrange short-term rentals on behalf of property owners and coordinate communication between parties manually. The specific terms of any rental arrangement will be agreed directly with you.
              </p>

              <h2 className="text-2xl font-semibold text-ink mt-10 mb-4">2. Homeowner Responsibilities</h2>
              <p>
                As a homeowner partner, you agree to provide accurate property details and ensure your property meets local safety and compliance standards. You must notify us promptly of any changes that may affect guest stays.
              </p>

              <h2 className="text-2xl font-semibold text-ink mt-10 mb-4">3. Inquiries and Arrangements</h2>
              <p>
                Submitting a form on this website does not constitute a confirmed booking or listing agreement. All arrangements — including availability, pricing, and terms — are confirmed directly by our team following your inquiry.
              </p>

              <h2 className="text-2xl font-semibold text-ink mt-10 mb-4">4. Limitation of Liability</h2>
              <p>
                Aurora Suites acts as an intermediary between property owners and guests. While we take care in presenting listings and handling inquiries, we are not liable for disputes arising between owners and guests beyond what is agreed in your individual arrangement.
              </p>

              <h2 className="text-2xl font-semibold text-ink mt-10 mb-4">5. Termination</h2>
              <p>
                Either party may end a homeowner partnership or guest arrangement with reasonable written notice, subject to any confirmed stays already in progress.
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
