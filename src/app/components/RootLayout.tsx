import { Outlet, Link, useLocation } from "react-router";
import {
  Home,
  Calendar,
  Bell,
  User,
  Grid3x3,
  FileText,
  CreditCard,
  Receipt,
  HeartPulse,
  FlaskConical,
  Hospital,
  Headphones,
  LifeBuoy,
  Activity,
  Syringe,
  MessageCircle,
} from "lucide-react";

export function RootLayout() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const mainNavItems = [
    { path: "/", icon: Home, label: "Trang chủ" },
    { path: "/appointments", icon: Calendar, label: "Phiếu khám" },
    { path: "/notifications", icon: Bell, label: "Thông báo" },
    { path: "/functions", icon: Grid3x3, label: "Chức năng" },
    { path: "/profile", icon: User, label: "Cá nhân" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-600">
                Telehealth Platform
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Bệnh viện Đại học Y Dược TP. Hồ Chí Minh
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/notifications"
                className="p-2 rounded-full hover:bg-gray-100 relative"
              >
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  039****634
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-80px)] sticky top-[80px]">
          <nav className="p-4 space-y-2">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
