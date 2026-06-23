import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Layout, PageHero } from "@/components/site/Layout";
import dining from "@/assets/dining.jpg";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <PageHero title="GET IN" script="Touch" image={dining} />

      <section className="section-pad bg-sand">
        <div className="container-luxe grid gap-10 md:grid-cols-[1fr_1.3fr]">
          <aside className="rounded-2xl bg-ink p-8 text-sand-soft">
            <span className="font-display text-3xl italic text-copper">L</span>
            <h2 className="mt-2 text-2xl tracking-[0.15em]">LIVE LUXE</h2>
            <p className="mt-2 text-xs tracking-[0.3em] text-copper">LET&rsquo;S TALK</p>
            <p className="mt-6 text-sm text-sand-soft/70">
              If you&rsquo;re ready to maximise your property&rsquo;s earning potential with a
              trusted local team, get in touch today.
            </p>

            <div className="mt-10 space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-copper/15 text-copper">
                  <Mail size={15} />
                </span>
                <div>
                  <p className="text-xs tracking-[0.25em] text-sand-soft/55">EMAIL</p>
                  <p>info@liveluxe.com.au</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-copper/15 text-copper">
                  <Phone size={15} />
                </span>
                <div>
                  <p className="text-xs tracking-[0.25em] text-sand-soft/55">CALL</p>
                  <p>(03) 6123 0127</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-copper/15 text-copper">
                  <MapPin size={15} />
                </span>
                <div>
                  <p className="text-xs tracking-[0.25em] text-sand-soft/55">VISIT</p>
                  <p>Melbourne, VIC, Australia</p>
                </div>
              </div>
            </div>
          </aside>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-2xl bg-sand-soft p-8 shadow-soft"
          >
            <h3 className="text-2xl tracking-tight">
              Send us a <span className="italic-script">message</span>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We respond within one business day.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Field label="First name" />
              <Field label="Last name" />
              <Field label="Email" type="email" />
              <Field label="Phone" type="tel" />
              <Field label="Property address" full />
            </div>
            <label className="mt-4 block text-sm">
              <span className="eyebrow !text-ink/60">Message</span>
              <textarea
                className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm focus:border-copper focus:outline-none"
                rows={5}
                placeholder="Tell us about your property and goals…"
              />
            </label>

            <button className="btn-primary mt-6" type="submit">
              {sent ? (
                "Message Sent ✓"
              ) : (
                <>
                  Send Message <Send size={14} />
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, type = "text", full = false }) {
  return (
    <label className={`block text-sm ${full ? "md:col-span-2" : ""}`}>
      <span className="eyebrow !text-ink/60">{label}</span>
      <input
        type={type}
        className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm focus:border-copper focus:outline-none"
      />
    </label>
  );
}
