import { INQUIRY_STATUSES, INQUIRY_TYPES } from "@/lib/store";

export function formatDate(iso) {
  return new Date(iso).toLocaleString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatShortDate(iso) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
  });
}

export function StatusBadge({ status }) {
  const styles = {
    NEW: "bg-copper/10 text-copper border-copper/25",
    CONTACTED: "bg-blue-50 text-blue-700 border-blue-200",
    CLOSED: "bg-sand text-muted-foreground border-border",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[status] || styles.CLOSED}`}
    >
      {INQUIRY_STATUSES[status] || status}
    </span>
  );
}

export function TypeBadge({ type }) {
  const colors = {
    HOMEOWNER: "bg-ink/5 text-ink border-ink/10",
    GENERAL_CONTACT: "bg-sand text-ink/70 border-border",
    SHORT_STAY_INQUIRY: "bg-emerald-50 text-emerald-800 border-emerald-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors[type] || colors.GENERAL_CONTACT}`}
    >
      {INQUIRY_TYPES[type] || type}
    </span>
  );
}

export function DetailRow({ icon: Icon, label, children }) {
  if (!children) return null;
  return (
    <div className="flex gap-3 py-3 border-b border-border/60 last:border-0">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sand text-copper">
        <Icon size={16} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          {label}
        </p>
        <div className="mt-0.5 text-sm text-ink wrap-break-word">{children}</div>
      </div>
    </div>
  );
}
