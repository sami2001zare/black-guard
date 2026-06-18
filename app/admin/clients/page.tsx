export default function ClientsPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">مدیریت مشتریان</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          افزودن مشتری جدید
        </button>
      </div>
      {/* Table or list of clients */}
      <p className="text-gray-500">لیست مشتریان در اینجا نمایش داده می‌شود.</p>
    </div>
  );
}