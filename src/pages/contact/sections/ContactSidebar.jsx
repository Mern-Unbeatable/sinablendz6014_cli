import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { FadeIn } from "@/components/animations";

export default function ContactSidebar() {
  return (
    <FadeIn>
      <aside className="rounded-2xl bg-ink card-pad text-sand-soft h-fit lg:sticky lg:top-28">
        <Logo className="h-14" />
        <p className="mt-2 text-sm tracking-[0.25em] text-copper font-medium">
          LET&rsquo;S TALK
        </p>
        <p className="mt-6 text-base text-sand-soft/65 leading-relaxed">
          Whether you&rsquo;re a homeowner looking to list your property or a guest searching
          for a short stay, send us a message and we&rsquo;ll follow up personally.
        </p>

        <div className="mt-10 space-y-6">
          <ContactDetail icon={Mail} label="EMAIL" value="info@aurorasuites.com.au" />
          <ContactDetail icon={Phone} label="CALL" value="(03) 6123 0127" />
          <ContactDetail icon={MapPin} label="VISIT" value="Melbourne, VIC, Australia" />
          <ContactDetail icon={Clock} label="HOURS" value="Mon — Fri: 9AM — 6PM" />
        </div>
      </aside>
    </FadeIn>
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
