"use client";
import { useAdmin } from "../components/admin/AdminContext";
import {
  IoPeopleOutline,
  IoMedkitOutline,
  IoDocumentTextOutline,
  IoTrendingUpOutline,
  IoArrowUpOutline,
} from "react-icons/io5";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const userGrowthData = [
  { month: "Sep", users: 42 },
  { month: "Oct", users: 68 },
  { month: "Nov", users: 95 },
  { month: "Dec", users: 124 },
  { month: "Jan", users: 156 },
  { month: "Feb", users: 198 },
  { month: "Mar", users: 230 },
];

const articleActivityData = [
  { month: "Sep", published: 3, drafts: 1 },
  { month: "Oct", published: 5, drafts: 2 },
  { month: "Nov", published: 4, drafts: 3 },
  { month: "Dec", published: 6, drafts: 1 },
  { month: "Jan", published: 7, drafts: 2 },
  { month: "Feb", published: 5, drafts: 4 },
  { month: "Mar", published: 8, drafts: 2 },
];

const recentActivity = [
  { name: "Hanane Belkacem", action: "registered as a new client", time: "2 hours ago" },
  { name: "Dr. Fatima Mansouri", action: "published a new article", time: "4 hours ago" },
  { name: "Lynda Bensalem", action: "submitted midwife verification", time: "6 hours ago" },
  { name: "Leila Rahimi", action: "updated her profile", time: "1 day ago" },
  { name: "Meriem Kebir", action: "published a new article", time: "1 day ago" },
];

export default function AdminDashboard() {
  const { stats } = useAdmin();

  const summaryCards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      change: "+12%",
      icon: IoPeopleOutline,
      lightColor: "bg-[#F46A6A]/10",
      iconColor: "text-[#F46A6A]",
    },
    {
      label: "Total Midwives",
      value: stats.totalMidwives,
      change: "+8%",
      icon: IoMedkitOutline,
      lightColor: "bg-[#F46A6A]/10",
      iconColor: "text-[#F46A6A]",
    },
    {
      label: "Total Articles",
      value: stats.totalArticles,
      change: "+15%",
      icon: IoDocumentTextOutline,
      lightColor: "bg-[#F46A6A]/10",
      iconColor: "text-[#F46A6A]",
    },
    {
      label: "New Users This Week",
      value: stats.newUsersThisWeek,
      change: "+5%",
      icon: IoTrendingUpOutline,
      lightColor: "bg-[#F46A6A]/10",
      iconColor: "text-[#F46A6A]",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here&apos;s an overview of your platform.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${card.lightColor} flex items-center justify-center ${card.iconColor} group-hover:bg-[#F46A6A] group-hover:text-white transition-colors duration-300`}>
                <card.icon size={24} />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#F46A6A] bg-[#F46A6A]/10 px-2.5 py-0.5 rounded-full">
                <IoArrowUpOutline size={12} />
                {card.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-sm text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 text-base mb-1">User Growth</h3>
            <p className="text-sm text-gray-500">Monthly registration trends</p>
          </div>
          <div className="h-70">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F46A6A" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#F46A6A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "1px solid #f3f4f6",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                    fontSize: "13px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#F46A6A"
                  strokeWidth={2.5}
                  fill="url(#userGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Article Activity Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 text-base mb-1">Article Activity</h3>
            <p className="text-sm text-gray-500">Published vs draft articles</p>
          </div>
          <div className="h-70">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={articleActivityData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "1px solid #f3f4f6",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                    fontSize: "13px",
                  }}
                />
                <Bar dataKey="published" fill="#F46A6A" radius={[6, 6, 0, 0]} maxBarSize={28} />
                <Bar dataKey="drafts" fill="#FBC4AB" radius={[6, 6, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-900 text-base mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#F46A6A] to-[#FBC4AB] flex items-center justify-center shrink-0">
                <span className="text-white font-semibold text-xs">
                  {item.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-semibold">{item.name}</span>{" "}
                  <span className="text-gray-500">{item.action}</span>
                </p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
