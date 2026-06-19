"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface TeamMember {
  id: string;
  nameEn: string;
  nameFa: string;
  nameAr: string;
  roleEn: string;
  imageMedia?: { path: string };
  order: number;
  published: boolean;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/team');
      if (res.ok) {
        const data = await res.json();
        setMembers(data);
      }
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این عضو تیم مطمئن هستید؟')) return;
    try {
      const res = await fetch(`/api/team/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMembers(members.filter(m => m.id !== id));
      } else {
        alert('خطا در حذف');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('خطا در حذف');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">مدیریت تیم</h1>
        <Link
          href="/admin/team/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + افزودن عضو جدید
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : members.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">هیچ عضوی در تیم تعریف نشده است.</p>
          <Link
            href="/admin/team/new"
            className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium"
          >
            اولین عضو را اضافه کنید
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-right p-3 font-medium text-gray-600">تصویر</th>
                <th className="text-right p-3 font-medium text-gray-600">نام (EN)</th>
                <th className="text-right p-3 font-medium text-gray-600">نام (FA)</th>
                <th className="text-right p-3 font-medium text-gray-600">نقش (EN)</th>
                <th className="text-right p-3 font-medium text-gray-600">وضعیت</th>
                <th className="text-right p-3 font-medium text-gray-600">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3">
                    {member.imageMedia ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={member.imageMedia.path}
                          alt={member.nameEn}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xs">
                        بدون
                      </div>
                    )}
                  </td>
                  <td className="p-3 font-medium">{member.nameEn}</td>
                  <td className="p-3">{member.nameFa}</td>
                  <td className="p-3">{member.roleEn}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      member.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {member.published ? 'فعال' : 'غیرفعال'}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <Link
                      href={`/admin/team/${member.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ویرایش
                    </Link>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}