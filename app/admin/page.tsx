"use client";

import Link from "next/link";

// SVG Icons
const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const ImageIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const stats = [
  {
    title: "تعداد مشتریان",
    value: "۱۲۴",
    icon: <UsersIcon />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    change: "+۱۲٪ این ماه",
  },
  {
    title: "خدمات فعال",
    value: "۸",
    icon: <BriefcaseIcon />,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    change: "+۲ نسبت به ماه قبل",
  },
  {
    title: "پیام‌های جدید",
    value: "۱۴",
    icon: <ChatIcon />,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    change: "۵ مورد پاسخ داده نشده",
  },
  {
    title: "تصاویر گالری",
    value: "۳۲",
    icon: <ImageIcon />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    change: "+۸ این ماه",
  },
];

const recentMessages = [
  { name: "علی رضایی", email: "ali@example.com", message: "درخواست مشاوره امنیتی", date: "۱۰ دقیقه پیش", status: "جدید" },
  { name: "سارا محمدی", email: "sara@example.com", message: "استعلام قیمت خدمات تشریفاتی", date: "۱ ساعت پیش", status: "خوانده شده" },
  { name: "رضا کریمی", email: "reza@example.com", message: "درخواست همکاری", date: "۳ ساعت پیش", status: "جدید" },
];

const quickActions = [
  { label: "افزودن مشتری جدید", href: "/admin/clients/new", color: "bg-blue-600" },
  { label: "افزودن خدمت جدید", href: "/admin/services/new", color: "bg-emerald-600" },
  { label: "بارگذاری تصویر", href: "/admin/gallery/new", color: "bg-purple-600" },
  { label: "مدیریت تیم", href: "/admin/team", color: "bg-amber-600" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">سلام، مدیر سیستم 👋</h1>
        <p className="text-gray-500 mt-1">
          خوش آمدید. امروز چه کاری می‌خواهید انجام دهید؟
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, idx) => (
          <Link
            key={idx}
            href={action.href}
            className={`${action.color} text-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-center`}
          >
            <span className="font-medium">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <span className={stat.color}>{stat.icon}</span>
              </div>
              <span className="text-xs text-gray-400">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-3">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">پیام‌های اخیر</h2>
          <Link href="/admin/messages" className="text-sm text-blue-600 hover:text-blue-700">
            مشاهده همه
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {recentMessages.map((msg, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{msg.name}</p>
                <p className="text-sm text-gray-500">{msg.message}</p>
              </div>
              <div className="text-left">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  msg.status === "جدید" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                }`}>
                  {msg.status}
                </span>
                <p className="text-xs text-gray-400 mt-1">{msg.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}