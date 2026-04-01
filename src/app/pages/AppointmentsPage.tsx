import { useState } from "react";
import { Filter, Search } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("completed");

  const tabs = [
    { id: "completed", label: "Đã thanh toán" },
    { id: "confirmed", label: "Đã tiếp nhận" },
    { id: "examined", label: "Đã khám" },
    { id: "cancelled", label: "Đã hủy" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Phiếu khám</h2>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Lọc
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Số định danh..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1651760680066-db9d32bd0357?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMGNsaXBib2FyZCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NzUwNTQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Empty state"
            className="w-64 h-64 mb-6 object-contain"
          />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Không có dữ liệu!
          </h3>
          <p className="text-gray-600 text-center max-w-md">
            Các phiếu khám sẽ được hiển thị ở đây, bạn quay lại sau nhé.
          </p>
        </div>
      </div>
    </div>
  );
}