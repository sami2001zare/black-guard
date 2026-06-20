"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const fetchMessages = async (status = 'all') => {
    setLoading(true);
    try {
      const url = status !== 'all' ? `/api/admin/messages?status=${status}` : '/api/admin/messages';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages);
        setTotal(data.total);
      } else {
        // If unauthorized, redirect to login
        if (res.status === 401) {
          router.push('/admin/login');
        }
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages(statusFilter);
  }, [statusFilter]);

  const updateStatus = async (id: string, newStatus: 'read' | 'replied') => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setMessages(messages.map(msg =>
          msg.id === id ? { ...msg, status: newStatus } : msg
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('آیا از حذف این پیام مطمئن هستید؟')) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages(messages.filter(msg => msg.id !== id));
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const classes = {
      unread: 'bg-red-100 text-red-700',
      read: 'bg-blue-100 text-blue-700',
      replied: 'bg-green-100 text-green-700',
    };
    const labels = {
      unread: 'خوانده نشده',
      read: 'خوانده شده',
      replied: 'پاسخ داده شده',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${classes[status as keyof typeof classes]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getStatusCount = (status: string) => {
    return messages.filter(m => status === 'all' || m.status === status).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">پیام‌های تماس</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-xl border border-gray-200">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            statusFilter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          همه ({total})
        </button>
        <button
          onClick={() => setStatusFilter('unread')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            statusFilter === 'unread'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          خوانده نشده ({getStatusCount('unread')})
        </button>
        <button
          onClick={() => setStatusFilter('read')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            statusFilter === 'read'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          خوانده شده ({getStatusCount('read')})
        </button>
        <button
          onClick={() => setStatusFilter('replied')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            statusFilter === 'replied'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          پاسخ داده شده ({getStatusCount('replied')})
        </button>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">هیچ پیامی یافت نشد.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-bold text-gray-800">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-blue-600 text-sm">
                      {msg.email}
                    </a>
                    {msg.phone && (
                      <span className="text-gray-500 text-sm">{msg.phone}</span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2 whitespace-pre-wrap">{msg.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(msg.createdAt).toLocaleString('fa-IR')}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getStatusBadge(msg.status)}
                  <div className="flex gap-2">
                    {msg.status === 'unread' && (
                      <button
                        onClick={() => updateStatus(msg.id, 'read')}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        علامت‌گذاری به عنوان خوانده
                      </button>
                    )}
                    {msg.status !== 'replied' && (
                      <button
                        onClick={() => updateStatus(msg.id, 'replied')}
                        className="text-green-600 hover:text-green-800 text-sm"
                      >
                        پاسخ داده شد
                      </button>
                    )}
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}