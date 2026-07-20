import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export function Logo({ className = "h-10" }) {
  return (
    <Link to="/" className="inline-flex items-center group">
      <img
        src={logo}
        alt="Aurora Suites"
        className={`${className} w-auto object-contain transition-all group-hover:opacity-90 brightness-[1.3] drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]`}
      />
    </Link>
  );
}
