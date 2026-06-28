import { Inbox, Mail, Eye, Building2, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function StatCard({ icon: Icon, label, value, sub, accent }) {
  return (
    <Card className="overflow-hidden border-0 shadow-soft">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent ? "bg-copper/15 text-copper" : "bg-sand text-ink/60"}`}
          >
            <Icon size={20} />
          </div>
        </div>
        <p className="mt-5 text-3xl font-bold tracking-tight text-ink">{value}</p>
        <p className="mt-1 text-sm font-medium text-ink/80">{label}</p>
        {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
      </CardContent>
    </Card>
  );
}

export default function DashboardPanel({ stats, onNavigate }) {
  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">Dashboard</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink lg:text-3xl">
          Good to see you — here&rsquo;s what&rsquo;s happening
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Track new inquiries from homeowners and guests, and manage which properties are live on
          the website.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Inbox}
          label="New inquiries"
          value={stats.newInquiries}
          sub="Awaiting response"
          accent
        />
        <StatCard icon={Mail} label="Total inquiries" value={stats.totalInquiries} />
        <StatCard
          icon={Eye}
          label="Live listings"
          value={stats.publishedProperties}
          sub={`${stats.draftProperties} in draft`}
          accent
        />
        <StatCard icon={Building2} label="All properties" value={stats.totalProperties} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Quick actions</CardTitle>
            <CardDescription>Jump to the most common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: "Review new inquiries", view: "inquiries", count: stats.newInquiries },
              { label: "Manage property listings", view: "properties" },
            ].map((action) => (
              <button
                key={action.view}
                type="button"
                onClick={() => onNavigate(action.view)}
                className="flex w-full items-center justify-between rounded-xl border border-border/60 bg-sand-soft/50 px-4 py-3.5 text-sm font-medium text-ink transition-all hover:border-copper/30 hover:bg-white hover:shadow-sm"
              >
                <span className="flex items-center gap-3">
                  {action.label}
                  {action.count > 0 && (
                    <span className="rounded-full bg-copper px-2 py-0.5 text-[11px] font-bold text-white">
                      {action.count}
                    </span>
                  )}
                </span>
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft bg-ink text-sand-soft">
          <CardHeader>
            <CardTitle className="text-base text-sand-soft">Your workflow</CardTitle>
            <CardDescription className="text-sand-soft/50">
              How Aurora Suites uses this portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4 text-sm text-sand-soft/75">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-copper/20 text-xs font-bold text-copper">
                  1
                </span>
                Homeowners and guests submit inquiries through the website forms.
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-copper/20 text-xs font-bold text-copper">
                  2
                </span>
                You follow up manually by phone or email and update the status here.
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-copper/20 text-xs font-bold text-copper">
                  3
                </span>
                Publish or hide property listings to control what visitors see.
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
