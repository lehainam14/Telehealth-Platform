import { Link } from "react-router";
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
  ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function HomePage() {
  const features = [
    { icon: Calendar, label: "Đặt khám", path: "/create-record" },
    { icon: FileText, label: "Lịch sử đặt khám", path: "/appointments" },
    { icon: CreditCard, label: "Thanh toán viện phí", path: "/functions" },
    { icon: Receipt, label: "Hoá đơn", path: "/functions" },
    { icon: HeartPulse, label: "Hồ sơ sức khỏe", path: "/functions" },
    { icon: FlaskConical, label: "Kết quả cận lâm sàng", path: "/functions" },
    { icon: Hospital, label: "Đăng ký nhập viện", path: "/functions" },
    { icon: Headphones, label: "Lắng nghe khách hàng", path: "/functions" },
    { icon: LifeBuoy, label: "Hỗ trợ", path: "/functions" },
    { icon: Activity, label: "Theo dõi sức khỏe tại nhà", path: "/functions" },
    { icon: Syringe, label: "Tiêm chủng", path: "/functions" },
    { icon: MessageCircle, label: "Hỏi - đáp (Chatbot)", path: "/functions" },
  ];

  const news = [
    {
      id: 1,
      title:
        "Xác nhận bảo hiểm y tế ngay khi đặt khám trên UMC Care - Giảm thời gian chờ tại bệnh viện",
      image:
        "https://images.unsplash.com/photo-1619590530358-d4f0c3f8bbec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaW5zdXJhbmNlJTIwY2FyZHxlbnwxfHx8fDE3NzUwNTI3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      title:
        'Chương trình sinh hoạt Câu lạc bộ Người bệnh "Bảo vệ thận - Giữ gìn môi trường: chặn nguy cơ bệnh thận mạn"',
      image:
        "https://images.unsplash.com/photo-1651789824174-1ebaa14ad7ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcHJvbW90aW9uJTIwYmFubmVyfGVufDF8fHx8MTc3NTA1Mjc3MHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Chào mừng đến với Telehealth Platform
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Nền tảng khám bệnh trực tuyến hiện đại, giúp bạn dễ dàng đặt lịch
              khám, quản lý hồ sơ sức khỏe và theo dõi kết quả khám bệnh mọi
              lúc, mọi nơi.
            </p>
            <Link
              to="/create-record"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Đặt khám ngay
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1769147555720-71fc71bfc216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzc1MDUyNzY5fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Hospital"
              className="w-full h-[300px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Tin tức nổi bật</h3>
          <Link
            to="/functions"
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Xem thêm
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {news.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-gray-900 font-medium line-clamp-3">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Chức năng khác</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.label}
                to={feature.path}
                className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <span className="text-sm text-center text-gray-700 font-medium">
                  {feature.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
