export default function TeamPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">مدیریت تیم</h1>
        <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          افزودن عضو جدید
        </button>
      </div>
      <p className="text-gray-500">لیست اعضای تیم در اینجا نمایش داده می‌شود.</p>
    </div>
  );
}