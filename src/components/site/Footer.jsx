import { Link, useLocation } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations";
import { Logo } from "./Logo";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/properties", label: "Properties" },
  { to: "/contact", label: "Contact" },
];

const serviceLinks = [
  "Property Listings",
  "Guest Inquiries",
  "Homeowner Onboarding",
  "Short-Stay Matching",
];

export function Footer() {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";

  return (
    <footer className="bg-ink text-sand-soft">
      {/* CTA Banner */}
      {!isContactPage && (
        <div className="bg-copper">
          <div className="container-luxe flex flex-col items-center justify-between gap-6 section-pad md:flex-row">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Ready to list your property or find a stay?
              </h3>
              <p className="mt-1 text-white/80">
                Submit an inquiry and our team will follow up with you personally.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:bg-sand-soft hover:-translate-y-1 hover:shadow-lg whitespace-nowrap md:px-8 md:py-3.5 md:text-base"
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}

      {/* Main footer */}
      <div className="container-luxe section-pad grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-16">
        <FadeIn>
          <div>
            <Logo className="h-14 md:h-20" />
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-sand-soft/60">
              Melbourne&rsquo;s curated short-stay property showcase — we partner with homeowners,
              list premium properties, and manage every guest inquiry by hand.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-sand-soft/70 transition-all hover:border-copper hover:text-copper hover:bg-copper/10 hover:-translate-y-1"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div>
            <h4 className="eyebrow text-copper! text-sm!">Quick Links</h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[0.95rem] text-sand-soft/70 transition-colors hover:text-copper"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div>
            <h4 className="eyebrow text-copper! text-sm!">Our Services</h4>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-[0.95rem] text-sand-soft/70 transition-colors hover:text-copper"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div>
            <h4 className="eyebrow text-copper! text-sm!">Contact Info</h4>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-copper/15 text-copper">
                  <Phone size={15} />
                </span>
                <div>
                  <p className="text-xs tracking-[0.2em] text-sand-soft/50">CALL US</p>
                  <p className="text-[0.95rem] text-sand-soft/80">(03) 6123 0127</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-copper/15 text-copper">
                  <Mail size={15} />
                </span>
                <div>
                  <p className="text-xs tracking-[0.2em] text-sand-soft/50">EMAIL</p>
                  <p className="text-[0.95rem] text-sand-soft/80">info@aurorasuites.com.au</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-copper/15 text-copper">
                  <MapPin size={15} />
                </span>
                <div>
                  <p className="text-xs tracking-[0.2em] text-sand-soft/50">LOCATION</p>
                  <p className="text-[0.95rem] text-sand-soft/80">Melbourne, VIC, Australia</p>
                </div>
              </li>
            </ul>
          </div>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 text-sm text-sand-soft/50 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Aurora Suites Pty Ltd. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="transition-colors hover:text-copper">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-copper">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
