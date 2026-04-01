import {
  Calendar,
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
import { Link } from "react-router";

export function FunctionsPage() {
  const features = [
    {
      icon: Calendar,
      label: "Đặt khám",
      description: "Đặt lịch khám bệnh trực tuyến",
      path: "/create-record",
      color: "blue",
    },
    {
      icon: FileText,
      label: "Lịch sử đặt khám",
      description: "Xem lịch sử các lần khám",
      path: "/appointments",
      color: "green",
    },
    {
      icon: CreditCard,
      label: "Thanh toán viện phí",
      description: "Thanh toán các khoản viện phí",
      path: "/functions",
      color: "purple",
    },
    {
      icon: Receipt,
      label: "Hoá đơn",
      description: "Quản lý hoá đơn thanh toán",
      path: "/functions",
      color: "orange",
    },
    {
      icon: HeartPulse,
      label: "Hồ sơ sức khỏe",
      description: "Theo dõi hồ sơ sức khỏe",
      path: "/functions",
      color: "red",
    },
    {
      icon: FlaskConical,
      label: "Kết quả cận lâm sàng",
      description: "Xem kết quả xét nghiệm",
      path: "/functions",
      color: "teal",
    },
    {
      icon: Hospital,
      label: "Đăng ký nhập viện",
      description: "Đăng ký thủ tục nhập viện",
      path: "/functions",
      color: "indigo",
    },
    {
      icon: Headphones,
      label: "Lắng nghe khách hàng",
      description: "Gửi phản hồi và ý kiến",
      path: "/functions",
      color: "pink",
    },
    {
      icon: LifeBuoy,
      label: "Hỗ trợ",
      description: "Trung tâm hỗ trợ khách hàng",
      path: "/functions",
      color: "cyan",
    },
    {
      icon: Activity,
      label: "Theo dõi sức khỏe tại nhà",
      description: "Giám sát sức khỏe từ xa",
      path: "/functions",
      color: "emerald",
    },
    {
      icon: Syringe,
      label: "Tiêm chủng",
      description: "Đặt lịch tiêm chủng",
      path: "/functions",
      color: "violet",
    },
    {
      icon: MessageCircle,
      label: "Hỏi - đáp (Chatbot)",
      description: "Trợ lý ảo tư vấn sức khỏe",
      path: "/functions",
      color: "blue",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
    teal: "bg-teal-100 text-teal-600",
    indigo: "bg-indigo-100 text-indigo-600",
    pink: "bg-pink-100 text-pink-600",
    cyan: "bg-cyan-100 text-cyan-600",
    emerald: "bg-emerald-100 text-emerald-600",
    violet: "bg-violet-100 text-violet-600",
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Chức năng của hệ thống
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.label}
                to={feature.path}
                className="group p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-300 transition-all"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${
                    colorClasses[feature.color as keyof typeof colorClasses]
                  } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.label}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
