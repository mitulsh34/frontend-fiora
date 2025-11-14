import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Zap,
  BarChart3,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  Home,
  CreditCard,
} from "lucide-react";

export default function DashboardLayout({
  children,
  userRole,
  userName = "User",
  companyName = "Company",
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Navigation items based on user role
  const getNavItems = () => {
    const baseNav = [
      { path: "/dashboard/admin", label: "Dashboard", icon: Home },
    ];

    if (userRole === "super_admin") {
      return [
        ...baseNav,
        { path: "/dashboard/companies", label: "Companies", icon: Building2 },
        { path: "/dashboard/users", label: "Users", icon: Users },
        { path: "/dashboard/settings", label: "Settings", icon: Settings },
      ];
    }

    if (userRole === "company_admin") {
      return [
        ...baseNav,
        { path: "/dashboard/invoices", label: "Invoices", icon: FileText },
        { path: "/invoices/create", label: "Create Invoice", icon: CreditCard },
        { path: "/dashboard/clients", label: "Clients", icon: Users },
        { path: "/dashboard/payments", label: "Payments", icon: CreditCard },
        { path: "/dashboard/team", label: "Team", icon: Users },
        { path: "/dashboard/settings", label: "Settings", icon: Settings },
      ];
    }

    // Staff user
    return [
      ...baseNav,
      { path: "/dashboard/invoices", label: "Invoices", icon: FileText },
      { path: "/dashboard/my-tasks", label: "My Tasks", icon: BarChart3 },
    ];
  };

  const navItems = getNavItems();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col fixed left-0 top-0 h-screen z-40 lg:relative lg:z-0`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b border-slate-200">
          <Link
            to="/"
            className={`flex items-center gap-3 ${!sidebarOpen && "justify-center"}`}
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && <span className="font-bold text-slate-900 text-lg">cashpilot</span>}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-slate-200">
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors ${
                !sidebarOpen && "justify-center"
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                {userName.charAt(0).toUpperCase()}
              </div>
              {sidebarOpen && (
                <>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-slate-900">{userName}</p>
                    <p className="text-xs text-slate-500 capitalize">{userRole.replace("_", " ")}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </>
              )}
            </button>

            {/* User Dropdown */}
            {userMenuOpen && sidebarOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-slate-200 text-sm">
                  <p className="font-medium text-slate-900">{userName}</p>
                  <p className="text-xs text-slate-500">{companyName}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:ml-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6 text-slate-600" />
            ) : (
              <Menu className="w-6 h-6 text-slate-600" />
            )}
          </button>
          <div className="hidden lg:flex items-center">
            <h1 className="text-lg font-semibold text-slate-900">{companyName}</h1>
          </div>
          <button
            onClick={() => {
              setUserMenuOpen(!userMenuOpen);
            }}
            className="flex lg:hidden items-center gap-2 p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
          </button>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

// Icon for Building2 (used in companies nav)
function Building2(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
}
