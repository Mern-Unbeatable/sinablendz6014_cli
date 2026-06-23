import { Routes, Route } from "react-router-dom";

import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import ServicesPage from "@/pages/services";
import PropertiesPage from "@/pages/properties";
import ContactPage from "@/pages/contact";
import NotFoundPage from "@/pages/not-found";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/properties" element={<PropertiesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
