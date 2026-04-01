import { useState } from "react";
import { BellOff, CheckCheck } from "lucide-react";

export function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "Tất cả" },
    { id: "unread", label: "Chưa đọc" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Thông báo</h2>
          <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
            <CheckCheck className="w-5 h-5" />
            Đọc tất cả
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <BellOff className="w-16 h-16 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Không có thông báo
          </h3>
          <p className="text-gray-600 text-center max-w-md">
            Các thông báo mới của bạn sẽ được hiển thị ở đây.
          </p>
        </div>
      </div>
    </div>
  );
}
