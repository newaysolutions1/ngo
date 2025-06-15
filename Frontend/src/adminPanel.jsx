import React from "react";
import {
  Users,
  Clock3,
  DollarSign,
  Megaphone,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Check,
  X,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const summary = [
  {
    label: "Total Students",
    value: 156,
    change: 12,
    icon: Users,
    trendUp: true,
  },
  {
    label: "Pending Apps",
    value: 23,
    change: -5,
    icon: Clock3,
    trendUp: false,
  },
  {
    label: "Funds Raised",
    value: "$45,000",
    change: 20,
    icon: DollarSign,
    trendUp: true,
  },
  {
    label: "Active Campaigns",
    value: 8,
    change: 2,
    icon: Megaphone,
    trendUp: true,
  },
];

const StatCard = ({ label, value, change, icon: Icon, trendUp }) => (
  <div className="flex flex-col justify-between rounded-xl border bg-white p-6 shadow-sm">
    <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
      {label}
      <Icon size={16} className="text-gray-400" />
    </div>
    <div className="mt-4 flex items-center justify-between">
      <span className="text-3xl font-bold text-gray-900">{value}</span>
      <span
        className={`flex items-center gap-1 text-sm ${
          trendUp ? "text-green-600" : "text-red-600"
        }`}
      >
        {trendUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {trendUp ? "+" : ""}
        {change}%
      </span>
    </div>
  </div>
);

const appsData = [
  { month: "Jan", apps: 40 },
  { month: "Feb", apps: 25 },
  { month: "Mar", apps: 50 },
  { month: "Apr", apps: 45 },
];

const donationsData = [
  { month: "Jan", amount: 4000 },
  { month: "Feb", amount: 3000 },
  { month: "Mar", amount: 5000 },
  { month: "Apr", amount: 4500 },
];

const rows = [
  {
    name: "John Doe",
    email: "john@example.com",
    status: "Pending",
    date: "2024-04-15",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Approved",
    date: "2024-04-10",
  },
  {
    name: "Mike Johnson",
    email: "mike@example.com",
    status: "Rejected",
    date: "2024-04-05",
  },
  {
    name: "Sarah Wilson",
    email: "sarah@example.com",
    status: "Pending",
    date: "2024-04-18",
  },
  {
    name: "David Chen",
    email: "david@example.com",
    status: "Approved",
    date: "2024-04-08",
  },
];

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </section>
      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold text-gray-700">
            New Applications
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={appsData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="apps" fill="#dc2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold text-gray-700">
            Donations Trend
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={donationsData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#dc2626"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className="mt-6 rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">
            Student Applications
          </h2>
          <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
            Add New Student
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] divide-y divide-gray-200 text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Status</th>
                <th className="py-2">Date</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((r) => (
                <tr key={r.email} className="whitespace-nowrap">
                  <td className="py-2 font-medium text-gray-800">{r.name}</td>
                  <td className="py-2 text-gray-700">{r.email}</td>
                  <td className="py-2">
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs ${statusStyles[r.status]}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-2 text-gray-600">{r.date}</td>
                  <td className="py-2">
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-gray-700 hover:bg-gray-100">
                        <Eye size={14} /> View
                      </button>
                      {r.status === "Pending" && (
                        <>
                          <button className="flex items-center gap-1 rounded-md border border-green-700 bg-green-50 px-2 py-1 text-xs text-green-700 hover:bg-green-100">
                            <Check size={14} /> Approve
                          </button>
                          <button className="flex items-center gap-1 rounded-md border border-red-700 bg-red-50 px-2 py-1 text-xs text-red-700 hover:bg-red-100">
                            <X size={14} /> Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
