import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  FileText,
  Users,
  CreditCard,
  TrendingUp,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
} from "lucide-react";

export default function CompanyAdminDashboard() {
  const [invoices, setInvoices] = useState([
    {
      id: "1",
      number: "INV-001",
      client: "Acme Corp",
      amount: 5000,
      status: "paid",
      dueDate: "2024-04-15",
      createdDate: "2024-03-15",
    },
    {
      id: "2",
      number: "INV-002",
      client: "Tech Solutions",
      amount: 3500,
      status: "sent",
      dueDate: "2024-04-20",
      createdDate: "2024-03-20",
    },
    {
      id: "3",
      number: "INV-003",
      client: "Global Industries",
      amount: 7200,
      status: "overdue",
      dueDate: "2024-03-30",
      createdDate: "2024-03-01",
    },
    {
      id: "4",
      number: "INV-004",
      client: "Digital Media Inc",
      amount: 2800,
      status: "draft",
      dueDate: "2024-05-01",
      createdDate: "2024-03-25",
    },
  ]);

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidInvoices = invoices.filter((inv) => inv.status === "paid");
  const overdueInvoices = invoices.filter((inv) => inv.status === "overdue");
  const pendingAmount = invoices
    .filter((inv) => inv.status !== "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "sent":
        return "bg-blue-100 text-blue-700";
      case "overdue":
        return "bg-red-100 text-red-700";
      case "draft":
        return "bg-slate-100 text-slate-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4" />;
      case "sent":
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      userRole="company_admin"
      userName="John Doe"
      companyName="TechCorp Inc."
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Company Dashboard</h1>
            <p className="text-slate-600 mt-2">Overview of your invoices and payments</p>
          </div>
          <Link to="/invoices/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Invoice
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Total Revenue */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-600">Total Revenue</h3>
              <div className="bg-blue-100 p-3 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="text-sm text-slate-500 mt-2">All invoices</p>
          </div>

          {/* Paid Invoices */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-600">Paid Invoices</h3>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{paidInvoices.length}</p>
            <p className="text-sm text-slate-500 mt-2">
              ${paidInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
            </p>
          </div>

          {/* Pending Amount */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-600">Pending Amount</h3>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              ${pendingAmount.toLocaleString()}
            </p>
            <p className="text-sm text-slate-500 mt-2">Unpaid invoices</p>
          </div>

          {/* Overdue */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-600">Overdue</h3>
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{overdueInvoices.length}</p>
            <p className="text-sm text-slate-500 mt-2">
              ${overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Invoices</h2>
            <Link to="/invoices/list">
              <Button variant="outline" className="border-slate-300">
                View All
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Invoice
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.slice(0, 4).map((invoice) => (
                  <tr key={invoice.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{invoice.number}</p>
                          <p className="text-sm text-slate-500">{invoice.createdDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{invoice.client}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">
                        ${invoice.amount.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          invoice.status
                        )}`}
                      >
                        {getStatusIcon(invoice.status)}
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/invoices/create" className="block">
            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Create Invoice</h3>
              <p className="text-sm text-slate-600">Generate new invoice</p>
            </div>
          </Link>

          <Link to="/dashboard/clients" className="block">
            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Manage Clients</h3>
              <p className="text-sm text-slate-600">View and edit clients</p>
            </div>
          </Link>

          <Link to="/dashboard/payments" className="block">
            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Track Payments</h3>
              <p className="text-sm text-slate-600">View payment history</p>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
