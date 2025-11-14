import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SuperAdminDashboard from "./pages/Dashboard/SuperAdmin";
import CompanyAdminDashboard from "./pages/Dashboard/CompanyAdmin";
import StaffDashboard from "./pages/Dashboard/Staff";
import InvoiceCreate from "./pages/Invoices/Create";
import InvoiceList from "./pages/Invoices/List";
import Placeholder from "./pages/Placeholder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard/admin" element={<SuperAdminDashboard />} />
          <Route path="/dashboard/companies" element={<Placeholder title="Companies Management" />} />
          <Route path="/dashboard/users" element={<Placeholder title="Users Management" />} />
          <Route path="/dashboard/settings" element={<Placeholder title="Settings" />} />
          <Route path="/dashboard/invoices" element={<InvoiceList />} />
          <Route path="/dashboard/clients" element={<Placeholder title="Clients Management" />} />
          <Route path="/dashboard/payments" element={<Placeholder title="Payments" />} />
          <Route path="/dashboard/team" element={<Placeholder title="Team Management" />} />
          <Route path="/dashboard/my-tasks" element={<Placeholder title="My Tasks" />} />
          
          {/* Invoice Routes */}
          <Route path="/invoices/create" element={<InvoiceCreate />} />
          <Route path="/invoices/list" element={<InvoiceList />} />
          
          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
