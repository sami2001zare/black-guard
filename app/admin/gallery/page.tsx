export default function GalleryPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">مدیریت گالری</h1>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          بارگذاری تصویر جدید
        </button>
      </div>
      <p className="text-gray-500">تصاویر گالری در اینجا نمایش داده می‌شوند.</p>
    </div>
  );
}