import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Users, FileText, Settings, Lock, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">cashpilot</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline" className="border-slate-200">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Smart Invoice <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">Management</span> for Modern Businesses
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Streamline your invoicing, client management, and payment tracking. Empower your team with role-based dashboards designed for efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-slate-300">
              View Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
            Built for Every Role
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Super Admin */}
            <div className="p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50/50 to-white">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Super Admin</h3>
              <p className="text-slate-600 mb-4">Manage all companies, users, and global settings across your entire platform</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Company management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>User administration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Global settings</span>
                </li>
              </ul>
            </div>

            {/* Company Admin */}
            <div className="p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-slate-50/50 to-white">
              <div className="bg-slate-100 p-3 rounded-lg w-fit mb-4">
                <BarChart3 className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Company Admin</h3>
              <p className="text-slate-600 mb-4">Full control over invoices, clients, payments, and team performance</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 font-bold">•</span>
                  <span>Invoice management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 font-bold">•</span>
                  <span>Client management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 font-bold">•</span>
                  <span>Payment tracking</span>
                </li>
              </ul>
            </div>

            {/* Staff */}
            <div className="p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50/50 to-white">
              <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Staff User</h3>
              <p className="text-slate-600 mb-4">Limited, role-based access to specific functions tailored to your responsibilities</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Role-based permissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Task-focused dashboards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Limited data access</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
            Everything You Need
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Smart Invoicing</h3>
                <p className="text-slate-600">Create, manage, and track invoices with ease. Generate professional documents with custom branding.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Real-time Analytics</h3>
                <p className="text-slate-600">Track payments, outstanding invoices, and financial performance at a glance.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Team Management</h3>
                <p className="text-slate-600">Manage users, assign roles, and control permissions with granular access control.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Enterprise Security</h3>
                <p className="text-slate-600">Bank-level security with role-based access control and data encryption.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to streamline your invoicing?</h2>
          <p className="text-blue-100 mb-8 text-lg">Join businesses that trust cashpilot for professional invoice management</p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="bg-white hover:bg-slate-50 text-blue-600">
              Sign In to Your Account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">cashpilot</span>
          </div>
          <p className="text-sm">© 2024 cashpilot. Smart invoice management for modern businesses.</p>
        </div>
      </footer>
    </div>
  );
}
