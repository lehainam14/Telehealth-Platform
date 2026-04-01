import { ChevronRight, User, Key, Bell, FileText, Shield, BookOpen } from "lucide-react";
import { Link } from "react-router";

export function ProfilePage() {
  const profileItems = [
    { icon: User, label: "Thông tin cá nhân", path: "/profile/personal" },
    { icon: Key, label: "Thay đổi mật khẩu", path: "/profile/password" },
  ];

  const settingsItems = [
    { icon: Bell, label: "Nhận thông báo", path: "/profile/notifications", hasSwitch: true, enabled: true },
  ];

  const legalItems = [
    { icon: FileText, label: "Điều khoản dịch vụ", path: "/profile/terms" },
    { icon: Shield, label: "Chính sách bảo mật", path: "/profile/privacy" },
    { icon: BookOpen, label: "Quy định sử dụng", path: "/profile/rules" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Header with Profile Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-8 mb-8 text-white">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-blue-600">UMC</span>
            </div>
            <h2 className="text-2xl font-bold mb-1">039****634</h2>
          </div>
        </div>

        {/* Account Section */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Tài khoản</h3>
          <div className="space-y-2">
            {profileItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-900 font-medium">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Settings Section */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Cài đặt</h3>
          <div className="space-y-2">
            {settingsItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.path}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-900 font-medium">
                      {item.label}
                    </span>
                  </div>
                  {item.hasSwitch && (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={item.enabled}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Thông tin pháp lý
          </h3>
          <div className="space-y-2">
            {legalItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-900 font-medium">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <button className="w-full py-3 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors">
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}
