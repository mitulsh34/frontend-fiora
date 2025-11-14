import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Building2,
  Users,
  TrendingUp,
  Plus,
  Search,
  MoreHorizontal,
  Edit2,
  Trash2,
  Building,
  Mail,
  Phone,
} from "lucide-react";

export default function SuperAdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([
    {
      id: "1",
      name: "TechCorp Inc.",
      email: "admin@techcorp.com",
      phone: "+1 (555) 123-4567",
      users: 24,
      status: "active",
      joinedDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Digital Solutions LLC",
      email: "contact@digitalsolutions.com",
      phone: "+1 (555) 234-5678",
      users: 18,
      status: "active",
      joinedDate: "2024-02-20",
    },
    {
      id: "3",
      name: "CloudBase Systems",
      email: "admin@cloudbase.com",
      phone: "+1 (555) 345-6789",
      users: 32,
      status: "active",
      joinedDate: "2023-11-10",
    },
    {
      id: "4",
      name: "StartUp Ventures",
      email: "info@startupventures.com",
      phone: "+1 (555) 456-7890",
      users: 8,
      status: "inactive",
      joinedDate: "2024-03-05",
    },
  ]);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCompanies = companies.filter((c) => c.status === "active").length;
  const totalUsers = companies.reduce((sum, c) => sum + c.users, 0);
  const totalRevenue = (companies.length * 299).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <DashboardLayout
      userRole="super_admin"
      userName="Admin User"
      companyName="cashpilot Platform"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Super Admin Dashboard</h1>
          <p className="text-slate-600 mt-2">Manage all companies and platform settings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Active Companies */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-600">Active Companies</h3>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Building className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{activeCompanies}</p>
            <p className="text-sm text-slate-500 mt-2">of {companies.length} total</p>
          </div>

          {/* Total Users */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-600">Total Users</h3>
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalUsers}</p>
            <p className="text-sm text-slate-500 mt-2">across all companies</p>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-600">Monthly Revenue</h3>
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalRevenue}</p>
            <p className="text-sm text-slate-500 mt-2">from subscriptions</p>
          </div>
        </div>

        {/* Companies Section */}
        <div className="bg-white rounded-xl border border-slate-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Companies</h2>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Company
            </Button>
          </div>

          {/* Search */}
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search companies by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Companies List */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Users
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{company.name}</p>
                          <p className="text-sm text-slate-500">ID: {company.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="flex items-center gap-2 text-slate-900">
                          <Mail className="w-4 h-4 text-slate-400" />
                          {company.email}
                        </p>
                        <p className="flex items-center gap-2 text-slate-500 mt-1">
                          <Phone className="w-4 h-4 text-slate-400" />
                          {company.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{company.users}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          company.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">
                        {new Date(company.joinedDate).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4 text-slate-500" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredCompanies.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-slate-600">No companies found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
