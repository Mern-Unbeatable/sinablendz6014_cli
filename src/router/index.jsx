import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("@/pages/home"));
const AboutPage = lazy(() => import("@/pages/about"));
const ServicesPage = lazy(() => import("@/pages/services"));
const PropertiesPage = lazy(() => import("@/pages/properties"));
const PropertyDetailsPage = lazy(() => import("@/pages/property-details"));
const ContactPage = lazy(() => import("@/pages/contact"));
const PrivacyPage = lazy(() => import("@/pages/privacy"));
const TermsPage = lazy(() => import("@/pages/terms"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));
const AdminPage = lazy(() => import("@/pages/admin"));

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand-soft">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-copper border-t-transparent" />
    </div>
  );
}

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/:slug" element={<PropertyDetailsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
