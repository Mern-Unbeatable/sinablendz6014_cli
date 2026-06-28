import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FadeIn } from "@/components/animations";
import { addInquiry } from "@/lib/store";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <FadeIn direction="left" delay={0.15}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          addInquiry({
            type: "contact",
            name: `${fd.get("firstName")} ${fd.get("lastName")}`.trim(),
            email: String(fd.get("email") || ""),
            phone: String(fd.get("phone") || ""),
            address: String(fd.get("address") || ""),
            message: String(fd.get("message") || ""),
          });
          setSent(true);
          toast.success("Message received! Our team will be in touch soon.");
          e.currentTarget.reset();
        }}
        className="rounded-2xl bg-sand-soft card-pad shadow-soft"
      >
        <h2 className="text-2xl font-bold tracking-tight">
          Send us a <span className="italic-script">message</span>
        </h2>
        <p className="mt-2 text-base text-muted-foreground">
          We respond within one business day. Fill out the form below and we&rsquo;ll be in
          touch.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Field label="First name" name="firstName" placeholder="John" />
          <Field label="Last name" name="lastName" placeholder="Smith" />
          <Field label="Email" name="email" type="email" placeholder="john@example.com" />
          <Field label="Phone" name="phone" type="tel" placeholder="+61 400 000 000" />
          <Field label="Property address" name="address" placeholder="123 Collins St, Melbourne" full />
        </div>
        <label className="mt-5 block">
          <span className="block text-xs tracking-[0.2em] text-muted-foreground/60 uppercase mb-2">
            Message
          </span>
          <textarea
            name="message"
            required
            className="w-full rounded-xl border border-border bg-white px-5 py-4 text-base leading-relaxed focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20 transition-all"
            rows={5}
            placeholder="Tell us about your property or the stay you are looking for…"
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
  );
}

function Field({ label, name, type = "text", full = false, placeholder = "" }) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="block text-xs tracking-[0.2em] text-muted-foreground/60 uppercase mb-2">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={type === "email"}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-white px-5 py-3.5 text-base focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20 transition-all"
      />
    </label>
  );
}
