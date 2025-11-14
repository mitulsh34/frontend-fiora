import DashboardLayout from "@/components/DashboardLayout";

export default function Placeholder({ title }) {
  return (
    <DashboardLayout userRole="company_admin" userName="John Doe" companyName="Demo Company">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{title}</h1>
          <p className="text-slate-600 text-lg mb-8">
            This page is currently under development. Continue prompting to fill in this page contents if you want it.
          </p>
          <div className="inline-block bg-slate-100 rounded-lg p-8">
            <p className="text-slate-500 text-sm">Page: {title}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
