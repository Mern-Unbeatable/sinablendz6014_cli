import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminShell } from "@/components/admin/AdminShell";
import { isAuthenticated, logout, getDashboardStats, getInquiries, getPropertyAdminList } from "@/lib/store";
import { useStoreSync } from "@/hooks/use-store-sync";

import DashboardPanel from "./pages/DashboardPanel";
import InquiriesPanel from "./pages/InquiriesPanel";
import PropertiesPanel from "./pages/PropertiesPanel";
import PropertyInquiriesPanel from "./pages/PropertyInquiriesPanel";

export default function AdminPage() {
  const [authed, setAuthed] = useState(isAuthenticated());
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Parse current view from URL (e.g. /admin/inquiries -> inquiries)
  const path = location.pathname.split("/").filter(Boolean);
  const view = path.length > 1 ? path[1] : "overview";
  const viewId = path.length > 2 ? path[2] : null;

  const handleViewChange = (newView) => {
    navigate(`/admin${newView === "overview" ? "" : `/${newView}`}`);
  };

  const loadStats = useCallback(() => getDashboardStats(), []);
  const loadInquiries = useCallback(() => getInquiries(), []);
  const loadProperties = useCallback(() => getPropertyAdminList(), []);

  const [stats] = useStoreSync(loadStats);
  const [inquiries] = useStoreSync(loadInquiries);
  const [properties] = useStoreSync(loadProperties);

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return (
    <AdminShell
      view={view}
      onViewChange={handleViewChange}
      newInquiryCount={stats.newInquiries}
      onSignOut={() => {
        logout();
        setAuthed(false);
      }}
    >
      {view === "overview" && <DashboardPanel stats={stats} onNavigate={handleViewChange} />}
      {view === "inquiries" && (
        <InquiriesPanel
          inquiries={inquiries}
          selectedId={selectedInquiry}
          onSelect={setSelectedInquiry}
        />
      )}
      {view === "properties" && <PropertiesPanel properties={properties} />}
      {view === "property-inquiries" && viewId && (
        <PropertyInquiriesPanel
          inquiries={inquiries}
          property={properties.find(p => p.id === viewId)}
          onBack={() => navigate('/admin/properties')}
          selectedId={selectedInquiry}
          onSelect={setSelectedInquiry}
        />
      )}
    </AdminShell>
  );
}
