import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
} from "lucide-react";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export default function InvoiceCreate() {
  const navigate = useNavigate();
  const [invoiceNumber, setInvoiceNumber] = useState("INV-005");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "1", description: "Professional Services", quantity: 1, unitPrice: 1000 },
  ]);
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unitPrice: 0,
    };
    setLineItems([...lineItems, newItem]);
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(
      lineItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleSave = async (action: "draft" | "send") => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      navigate("/dashboard/invoices");
    }, 1000);
  };

  return (
    <DashboardLayout
      userRole="company_admin"
      userName="John Doe"
      companyName="TechCorp Inc."
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Create Invoice</h1>
            <p className="text-slate-600 mt-2">Generate a new invoice for your client</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Invoice Form */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-8">
          {/* Invoice Header */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Company Info */}
            <div className="col-span-1">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <h3 className="font-bold text-slate-900 mb-2">TechCorp Inc.</h3>
                <p className="text-sm text-slate-600">
                  123 Business Street
                  <br />
                  San Francisco, CA 94105
                  <br />
                  contact@techcorp.com
                  <br />
                  +1 (555) 123-4567
                </p>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="col-span-2 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Invoice Number
                  </label>
                  <Input
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    placeholder="INV-001"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Invoice Date
                  </label>
                  <Input
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Due Date
                </label>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900">Bill To</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Client Name
                </label>
                <Input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Acme Corp"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Client Email
                </label>
                <Input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="client@acme.com"
                />
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Invoice Items</h3>
              <Button
                onClick={addLineItem}
                variant="outline"
                size="sm"
                className="border-slate-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {lineItems.map((item) => (
                <div
                  key={item.id}
                  className="grid md:grid-cols-12 gap-3 items-end p-4 border border-slate-200 rounded-lg"
                >
                  <div className="md:col-span-6">
                    <label className="text-xs font-medium text-slate-600">
                      Description
                    </label>
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        updateLineItem(item.id, "description", e.target.value)
                      }
                      placeholder="Service or product"
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium text-slate-600">
                      Quantity
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateLineItem(item.id, "quantity", parseFloat(e.target.value))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="text-xs font-medium text-slate-600">
                      Unit Price
                    </label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) =>
                        updateLineItem(item.id, "unitPrice", parseFloat(e.target.value))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <button
                      onClick={() => removeLineItem(item.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-full md:w-80 space-y-2 p-4 bg-slate-50 rounded-lg">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900 text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Thank you for your business..."
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-slate-200">
            <Button
              onClick={() => handleSave("draft")}
              disabled={isSaving}
              variant="outline"
              className="border-slate-300"
            >
              Save as Draft
            </Button>
            <Button
              onClick={() => handleSave("send")}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save & Send"}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
