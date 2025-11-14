import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Download,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in_progress" | "pending";
  dueDate: string;
}

interface AssignedInvoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  status: "draft" | "sent" | "paid";
  dueDate: string;
}

export default function StaffDashboard() {
  const tasks: Task[] = [
    {
      id: "1",
      title: "Review client invoice INV-001",
      description: "Check invoice for accuracy before sending",
      status: "completed",
      dueDate: "2024-03-25",
    },
    {
      id: "2",
      title: "Send invoice to Acme Corp",
      description: "Send prepared invoice INV-002",
      status: "in_progress",
      dueDate: "2024-03-26",
    },
    {
      id: "3",
      title: "Record payment for invoice INV-003",
      description: "Update payment status",
      status: "pending",
      dueDate: "2024-03-27",
    },
    {
      id: "4",
      title: "Follow up on overdue invoice",
      description: "Contact client regarding payment",
      status: "pending",
      dueDate: "2024-03-28",
    },
  ];

  const invoices: AssignedInvoice[] = [
    {
      id: "1",
      number: "INV-001",
      client: "Acme Corp",
      amount: 5000,
      status: "paid",
      dueDate: "2024-04-15",
    },
    {
      id: "2",
      number: "INV-002",
      client: "Tech Solutions",
      amount: 3500,
      status: "sent",
      dueDate: "2024-04-20",
    },
    {
      id: "3",
      number: "INV-003",
      client: "Global Industries",
      amount: 7200,
      status: "draft",
      dueDate: "2024-05-01",
    },
  ];

  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress").length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in_progress":
        return "bg-blue-100 text-blue-700";
      case "paid":
        return "bg-green-100 text-green-700";
      case "sent":
        return "bg-blue-100 text-blue-700";
      case "draft":
        return "bg-slate-100 text-slate-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      case "in_progress":
      case "sent":
        return <Clock className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      userRole="staff"
      userName="Jane Smith"
      companyName="TechCorp Inc."
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Dashboard</h1>
          <p className="text-slate-600 mt-2">Your assigned tasks and invoices</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-600">Completed Tasks</h3>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{completedTasks}</p>
            <p className="text-sm text-slate-500 mt-2">of {tasks.length} tasks</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-600">In Progress</h3>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{inProgressTasks}</p>
            <p className="text-sm text-slate-500 mt-2">tasks</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-600">Pending</h3>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{pendingTasks}</p>
            <p className="text-sm text-slate-500 mt-2">tasks</p>
          </div>
        </div>

        {/* My Tasks */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">My Tasks</h2>
          </div>

          <div className="space-y-3 p-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-slate-900">{task.title}</h3>
                      <span
                        className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {getStatusIcon(task.status)}
                        {task.status.replace("_", " ").charAt(0).toUpperCase() +
                          task.status.slice(1).replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{task.description}</p>
                    <p className="text-xs text-slate-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  {task.status !== "completed" && (
                    <Button variant="outline" size="sm" className="border-slate-300">
                      Update
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Invoices */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">Assigned Invoices</h2>
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="font-medium text-slate-900">{invoice.number}</p>
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
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-slate-500" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-slate-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
