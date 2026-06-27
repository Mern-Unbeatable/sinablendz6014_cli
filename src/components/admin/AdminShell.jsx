import { Link } from "react-router-dom";
import {
  Building2,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/site/Logo";
import { logout, getAuthUser } from "@/lib/store";

const NAV = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "inquiries", label: "Inquiries", icon: Mail },
  { id: "properties", label: "Properties", icon: Building2 },
];

export function AdminShell({ view, onViewChange, newInquiryCount, onSignOut, children }) {
  const [mobileNav, setMobileNav] = useState(false);
  const current = NAV.find((n) => n.id === view);
  const userEmail = getAuthUser();
  const userInitial = userEmail.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      {/* Mobile overlay */}
      {mobileNav && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileNav(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-ink transition-transform duration-300 lg:translate-x-0 ${
          mobileNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <Logo className="h-10" />
          <button
            type="button"
            className="rounded-lg p-2 text-sand-soft/70 hover:bg-white/10 lg:hidden"
            onClick={() => setMobileNav(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-5">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-sand-soft/40">
            Main menu
          </p>
          <nav className="mt-3 space-y-1">
            {NAV.map(({ id, label, icon: Icon }) => {
              const active = view === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    onViewChange(id);
                    setMobileNav(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-white/10 text-sand-soft shadow-sm"
                      : "text-sand-soft/60 hover:bg-white/5 hover:text-sand-soft"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      active ? "bg-copper/20 text-copper" : "bg-white/5 text-sand-soft/70"
                    }`}
                  >
                    <Icon size={16} />
                  </span>
                  {label}
                  {id === "inquiries" && newInquiryCount > 0 && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-copper px-1.5 text-[11px] font-bold text-white">
                      {newInquiryCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/10 p-4 space-y-1">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sand-soft/60 transition-colors hover:bg-white/5 hover:text-sand-soft"
          >
            <ExternalLink size={16} />
            View public site
          </Link>
          <button
            type="button"
            onClick={onSignOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sand-soft/60 transition-colors hover:bg-white/5 hover:text-sand-soft"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-30 border-b border-border/60 bg-white/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-6 py-4 lg:px-10">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="rounded-xl border border-border p-2.5 text-ink lg:hidden"
                onClick={() => setMobileNav(true)}
              >
                <Menu size={20} />
              </button>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-copper">
                  Aurora Suites
                </p>
                <h1 className="text-lg font-bold tracking-tight text-ink">
                  {current?.label ?? "Dashboard"}
                </h1>
              </div>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-copper/15 text-sm font-bold text-copper">
                {userInitial}
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-ink">Admin</p>
                <p className="max-w-[180px] truncate text-xs text-muted-foreground">{userEmail}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-6 py-8 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
