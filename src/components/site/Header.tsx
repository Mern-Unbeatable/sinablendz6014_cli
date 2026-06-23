import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/properties", label: "Properties" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="container-luxe flex items-center justify-between pt-6">
        <div className="flex items-center gap-3 rounded-full bg-ink/90 px-5 py-3 backdrop-blur">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-copper/60">
            <span className="font-display text-xl italic text-copper">L</span>
          </div>
          <div className="leading-none">
            <div className="font-display text-base tracking-[0.25em] text-sand-soft">LIVE</div>
            <div className="font-display text-base tracking-[0.25em] text-sand-soft">LUXE</div>
          </div>
        </div>

        <nav className="hidden items-center gap-1 rounded-full bg-ink/90 px-3 py-2 backdrop-blur md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-4 py-2 text-sm text-sand-soft/80 transition hover:text-copper [&.active]:text-copper"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/contact" className="ml-2 rounded-full bg-sand-soft px-5 py-2 text-sm font-medium text-ink transition hover:bg-copper hover:text-white">
            Book Now
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-full bg-ink/90 p-3 text-sand-soft md:hidden"
          aria-label="Menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="container-luxe mt-4 md:hidden">
          <div className="rounded-2xl bg-ink/95 p-4 backdrop-blur">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sand-soft/90 hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
