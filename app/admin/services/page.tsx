export default function ServicesPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">مدیریت خدمات</h1>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          افزودن خدمت جدید
        </button>
      </div>
      <p className="text-gray-500">لیست خدمات در اینجا نمایش داده می‌شود.</p>
    </div>
  );
}