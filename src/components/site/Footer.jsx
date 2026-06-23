import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-sand-soft">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-4">
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-copper/60">
            <span className="font-display text-3xl italic text-copper">L</span>
          </div>
          <p className="mt-6 max-w-xs text-sm text-sand-soft/60">
            Melbourne&rsquo;s trusted short-term rental management — premium care, premium returns.
          </p>
        </div>

        <div>
          <h4 className="eyebrow !text-copper">Navigate</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/services" className="hover:text-copper">
                Services
              </Link>
            </li>
            <li>
              <Link to="/properties" className="hover:text-copper">
                Properties
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-copper">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-copper">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow !text-copper">Contact Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-sand-soft/80">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-copper" /> (03) 6123 0127
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-copper" /> info@liveluxe.com.au
            </li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow !text-copper">Follow</h4>
          <div className="mt-4 flex gap-3">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-sand-soft/80 transition hover:border-copper hover:text-copper"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 text-xs text-sand-soft/50 md:flex-row">
          <p>© 2025 Live Luxe Pty Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-copper">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-copper">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
