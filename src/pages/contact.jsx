import { useState } from "react";
import { Mail, MapPin, Phone, Send, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Layout, PageHero } from "@/components/site/Layout";
import { Logo } from "@/components/site/Logo";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import dining from "@/assets/dining.jpg";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <PageHero title="GET IN" script="Touch" image={dining}>
        <p className="mt-6 max-w-xl text-lg text-sand-soft/75 leading-relaxed">
          Ready to maximise your property&rsquo;s earning potential? Let&rsquo;s start a conversation.
        </p>
      </PageHero>

      <section className="section-pad bg-sand">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Contact Info */}
          <FadeIn>
            <aside className="rounded-2xl bg-ink p-10 text-sand-soft h-fit lg:sticky lg:top-28">
              <Logo className="h-14" />
              <p className="mt-2 text-sm tracking-[0.25em] text-copper font-medium">LET&rsquo;S TALK</p>
              <p className="mt-6 text-base text-sand-soft/65 leading-relaxed">
                If you&rsquo;re ready to maximise your property&rsquo;s earning potential with a trusted local team, get in touch today. We&rsquo;d love to hear from you.
              </p>

              <div className="mt-10 space-y-6">
                <ContactDetail icon={Mail} label="EMAIL" value="info@aurorasuites.com.au" />
                <ContactDetail icon={Phone} label="CALL" value="(03) 6123 0127" />
                <ContactDetail icon={MapPin} label="VISIT" value="Melbourne, VIC, Australia" />
                <ContactDetail icon={Clock} label="HOURS" value="Mon — Fri: 9AM — 6PM" />
              </div>
            </aside>
          </FadeIn>

          {/* Form */}
          <FadeIn direction="left" delay={0.15}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="rounded-2xl bg-sand-soft p-10 shadow-soft"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Send us a <span className="italic-script">message</span>
              </h2>
              <p className="mt-2 text-base text-muted-foreground">
                We respond within one business day. Fill out the form below and we&rsquo;ll be in touch.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <Field label="First name" placeholder="John" />
                <Field label="Last name" placeholder="Smith" />
                <Field label="Email" type="email" placeholder="john@example.com" />
                <Field label="Phone" type="tel" placeholder="+61 400 000 000" />
                <Field label="Property address" placeholder="123 Collins St, Melbourne" full />
              </div>
              <label className="mt-5 block">
                <span className="block text-xs tracking-[0.2em] text-muted-foreground/60 uppercase mb-2">Message</span>
                <textarea
                  className="w-full rounded-xl border border-border bg-white px-5 py-4 text-base leading-relaxed focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20 transition-all"
                  rows={5}
                  placeholder="Tell us about your property and goals…"
                />
              </label>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary mt-8"
                type="submit"
              >
                {sent ? (
                  "Message Sent ✓"
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </motion.button>
            </form>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}

function ContactDetail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-copper/15 text-copper">
        <Icon size={18} />
      </span>
      <div>
        <p className="text-xs tracking-[0.25em] text-sand-soft/50">{label}</p>
        <p className="mt-0.5 text-base">{value}</p>
      </div>
    </div>
  );
}

function Field({ label, type = "text", full = false, placeholder = "" }) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="block text-xs tracking-[0.2em] text-muted-foreground/60 uppercase mb-2">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-white px-5 py-3.5 text-base focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20 transition-all"
      />
    </label>
  );
}
