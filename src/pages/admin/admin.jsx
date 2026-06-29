import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminShell } from "@/components/admin/AdminShell";
import { isAuthenticated, logout, getInquiries, getPropertyAdminList } from "@/lib/store";
import { useStoreSync } from "@/hooks/use-store-sync";
import { apiFetch } from "@/lib/api";

import DashboardPanel from "./pages/DashboardPanel";
import InquiriesPanel from "./pages/InquiriesPanel";
import PropertiesPanel from "./pages/PropertiesPanel";
import PropertyDetailsPanel from "./pages/PropertyDetailsPanel";
import PropertyInquiriesPanel from "./pages/PropertyInquiriesPanel";

export default function AdminPage() {
  const [authed, setAuthed] = useState(isAuthenticated());
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [sidebarStats, setSidebarStats] = useState(null);

  useEffect(() => {
    if (!authed) return;
    apiFetch("/api/admin/dashboard/overview")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setSidebarStats(json.data);
      })
      .catch(console.error);
  }, [authed]);

  const navigate = useNavigate();
  const location = useLocation();

  // Parse current view from URL (e.g. /admin/inquiries -> inquiries)
  const path = location.pathname.split("/").filter(Boolean);
  const view = path.length > 1 ? path[1] : "overview";
  const viewId = path.length > 2 ? path[2] : null;
  const subView = path.length > 3 ? path[3] : null;

  const handleViewChange = (newView) => {
    navigate(`/admin${newView === "overview" ? "" : `/${newView}`}`);
  };

  const loadInquiries = useCallback(() => getInquiries(), []);
  const loadProperties = useCallback(() => getPropertyAdminList(), []);

  const [inquiries] = useStoreSync(loadInquiries);
  const [properties] = useStoreSync(loadProperties);

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return (
    <AdminShell
      view={view}
      onViewChange={handleViewChange}
      newInquiryCount={sidebarStats?.newInquiries?.simpleInquiries || 0}
      onSignOut={() => {
        logout();
        setAuthed(false);
      }}
    >
      {view === "overview" && <DashboardPanel onNavigate={handleViewChange} />}
      {view === "inquiries" && (
        <InquiriesPanel
          inquiries={inquiries}
          selectedId={selectedInquiry}
          onSelect={setSelectedInquiry}
        />
      )}
      {view === "properties" && !viewId && <PropertiesPanel properties={properties} />}
      {view === "properties" && viewId && !subView && (
        <PropertyDetailsPanel 
          slug={viewId} 
          onBack={() => navigate('/admin/properties')} 
        />
      )}
      {view === "properties" && viewId && subView === "inquiries" && (
        <PropertyInquiriesPanel
          propertyId={viewId}
          property={properties.find(p => p.id === viewId || p.slug === viewId)}
          onBack={() => navigate('/admin/properties')}
        />
      )}
    </AdminShell>
  );
}
