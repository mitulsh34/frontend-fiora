import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, Mail, Lock, Building2, Eye, EyeOff } from "lucide-react";

interface Company {
  id: string;
  name: string;
  logo?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"credentials" | "company">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock companies data - in a real app, this would come from the backend
  const companies: Company[] = [
    { id: "1", name: "TechCorp Inc." },
    { id: "2", name: "Digital Solutions LLC" },
    { id: "3", name: "CloudBase Systems" },
    { id: "4", name: "StartUp Ventures" },
  ];

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("company");
    }, 800);
  };

  const handleCompanySelect = async (companyId: string) => {
    setSelectedCompany(companyId);
    setIsLoading(true);
    // Simulate API call and login
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, determine user role and redirect accordingly
      // For now, we'll redirect to a default dashboard
      localStorage.setItem("user", JSON.stringify({ email, companyId }));
      navigate("/dashboard/admin");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 right-10 w-72 h-72 bg-slate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 w-fit hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">cashpilot</span>
          </Link>

          {step === "credentials" ? (
            <>
              {/* Credentials Form */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h1>
                <p className="text-slate-600">Sign in to your cashpilot account</p>
              </div>

              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 py-2 h-10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-10 py-2 h-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                    Forgot password?
                  </a>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 mt-6"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-slate-200"></div>
                <span className="text-sm text-slate-500">Demo accounts</span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </div>

              {/* Demo accounts */}
              <div className="space-y-2 text-sm text-slate-600">
                <p className="font-medium text-slate-700">Try with demo credentials:</p>
                <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1">
                  <p><strong>Super Admin:</strong> admin@cashpilot.com / password</p>
                  <p><strong>Company Admin:</strong> company@cashpilot.com / password</p>
                  <p><strong>Staff:</strong> staff@cashpilot.com / password</p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Company Selection */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Select your company</h1>
                <p className="text-slate-600">Choose which company you want to access</p>
              </div>

              <div className="space-y-3 mb-6">
                {companies.map((company) => (
                  <button
                    key={company.id}
                    onClick={() => handleCompanySelect(company.id)}
                    disabled={isLoading && selectedCompany === company.id}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 text-left ${
                      selectedCompany === company.id && isLoading
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                    } disabled:opacity-50`}
                  >
                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-3 rounded-lg">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900">{company.name}</h3>
                      <p className="text-sm text-slate-500">Company ID: {company.id}</p>
                    </div>
                    {selectedCompany === company.id && isLoading && (
                      <div className="animate-spin">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Back button */}
              <Button
                variant="outline"
                onClick={() => {
                  setStep("credentials");
                  setSelectedCompany("");
                }}
                className="w-full border-slate-300"
              >
                Back to Sign in
              </Button>
            </>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center text-sm text-slate-600">
            <p>
              Don't have an account?{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Contact your administrator
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
