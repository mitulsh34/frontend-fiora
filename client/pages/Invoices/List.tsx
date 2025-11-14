import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Download,
  Eye,
  Edit2,
  Trash2,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
} from "lucide-react";

interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  status: "draft" | "sent" | "paid" | "overdue";
  dueDate: string;
  createdDate: string;
  email: string;
}

export default function InvoiceList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      number: "INV-001",
      client: "Acme Corp",
      email: "contact@acme.com",
      amount: 5000,
      status: "paid",
      dueDate: "2024-04-15",
      createdDate: "2024-03-15",
    },
    {
      id: "2",
      number: "INV-002",
      client: "Tech Solutions",
      email: "billing@techsolutions.com",
      amount: 3500,
      status: "sent",
      dueDate: "2024-04-20",
      createdDate: "2024-03-20",
    },
    {
      id: "3",
      number: "INV-003",
      client: "Global Industries",
      email: "accounts@globalind.com",
      amount: 7200,
      status: "overdue",
      dueDate: "2024-03-30",
      createdDate: "2024-03-01",
    },
    {
      id: "4",
      number: "INV-004",
      client: "Digital Media Inc",
      email: "finance@digitalmedia.com",
      amount: 2800,
      status: "draft",
      dueDate: "2024-05-01",
      createdDate: "2024-03-25",
    },
    {
      id: "5",
      number: "INV-005",
      client: "Creative Agency",
      email: "billing@creativeagency.com",
      amount: 4200,
      status: "sent",
      dueDate: "2024-04-25",
      createdDate: "2024-03-26",
    },
    {
      id: "6",
      number: "INV-006",
      client: "Enterprise Solutions",
      email: "ap@enterprise.com",
      amount: 9500,
      status: "paid",
      dueDate: "2024-04-10",
      createdDate: "2024-03-10",
    },
  ]);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
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

  const getStatusIcon = (status: string) => {
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

  const stats = {
    total: invoices.length,
    paid: invoices.filter((i) => i.status === "paid").length,
    pending: invoices.filter((i) => i.status === "sent").length,
    overdue: invoices.filter((i) => i.status === "overdue").length,
    draft: invoices.filter((i) => i.status === "draft").length,
  };

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

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
            <h1 className="text-3xl font-bold text-slate-900">Invoices</h1>
            <p className="text-slate-600 mt-2">Manage all your invoices in one place</p>
          </div>
          <Link to="/invoices/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Invoice
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600 mb-1">Total Invoices</p>
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
            <p className="text-xs text-slate-500 mt-1">${totalAmount.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600 mb-1">Paid</p>
            <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
            <p className="text-xs text-slate-500 mt-1">${paidAmount.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-blue-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600 mb-1">Overdue</p>
            <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600 mb-1">Drafts</p>
            <p className="text-2xl font-bold text-slate-600">{stats.draft}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by invoice #, client, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {filteredInvoices.length > 0 ? (
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{invoice.number}</p>
                            <p className="text-xs text-slate-500">ID: {invoice.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-900">{invoice.client}</p>
                          <p className="text-sm text-slate-500">{invoice.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">
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
                          {new Date(invoice.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600">
                          {new Date(invoice.createdDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="View">
                            <Eye className="w-4 h-4 text-slate-500" />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Download">
                            <Download className="w-4 h-4 text-slate-500" />
                          </button>
                          {invoice.status === "draft" && (
                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Edit">
                              <Edit2 className="w-4 h-4 text-slate-500" />
                            </button>
                          )}
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">No invoices found</p>
              <p className="text-slate-500 text-sm mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
