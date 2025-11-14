import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-slate-900">404</h1>
          <p className="text-2xl font-semibold text-slate-700">Page Not Found</p>
        </div>
        <p className="text-slate-600 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors font-medium text-slate-700 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
