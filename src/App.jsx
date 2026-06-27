import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import AppRouter from "@/router";

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}
