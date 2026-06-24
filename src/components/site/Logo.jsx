import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export function Logo({ className = "h-10" }) {
  return (
    <Link to="/" className="inline-flex items-center group">
      <img
        src={logo}
        alt="Aurora Suites"
        className={`${className} w-auto object-contain transition-opacity group-hover:opacity-90`}
      />
    </Link>
  );
}
