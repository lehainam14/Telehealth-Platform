import { useState } from "react";
import { MapPin, Phone, Shield, User, ChevronDown } from "lucide-react";

export function CreateRecordPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    country: "Việt Nam",
    province: "",
    district: "",
    ward: "",
    address: "",
    phone: "",
    email: "",
    idNumber: "",
    passportNumber: "",
    personalId: "",
    lastName: "",
    firstName: "",
    dateOfBirth: "",
    ethnicity: "",
    gender: "",
    occupation: "",
  });

  const steps = [
    { id: 1, label: "Địa chỉ", icon: MapPin },
    { id: 2, label: "Thông tin liên lạc", icon: Phone },
    { id: 3, label: "Giấy tờ định danh", icon: Shield },
    { id: 4, label: "Thông tin cá nhân", icon: User },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Submit form
      alert("Tạo hồ sơ khám bệnh thành công!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Tạo hồ sơ khám bệnh
        </h2>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => {
              const Icon = s.icon;
              const isActive = step === s.id;
              const isCompleted = step > s.id;
              return (
                <div key={s.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isActive || isCompleted
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        isActive || isCompleted
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        isCompleted ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Step 1: Address */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Địa chỉ</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quốc gia <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none bg-white"
                  >
                    <option>Việt Nam</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tỉnh thành <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.province}
                    onChange={(e) =>
                      setFormData({ ...formData, province: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none bg-white"
                  >
                    <option value="">Chọn tỉnh thành...</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="danang">Đà Nẵng</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quận huyện
                </label>
                <div className="relative">
                  <select
                    value={formData.district}
                    onChange={(e) =>
                      setFormData({ ...formData, district: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none bg-white"
                  >
                    <option value="">Chọn...</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phường xã <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.ward}
                    onChange={(e) =>
                      setFormData({ ...formData, ward: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none bg-white"
                  >
                    <option value="">Chọn...</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số nhà/ Đường/ Khu phố/ Ấp{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Số nhà, tên đường..."
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Phone className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">
                  Thông tin liên lạc
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Số điện thoại..."
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email (không bắt buộc)..."
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          )}

          {/* Step 3: Identity Documents */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">
                  Giấy tờ định danh
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số CCCD
                </label>
                <input
                  type="text"
                  placeholder="Nhập số CCCD..."
                  value={formData.idNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, idNumber: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <p className="text-sm text-gray-500 mt-2">
                  (Nếu chưa có CCCD, vui lòng nhập Số định danh cá nhân hoặc Hộ
                  chiếu)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số Hộ chiếu
                </label>
                <input
                  type="text"
                  placeholder="Hộ chiếu..."
                  value={formData.passportNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      passportNumber: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số định danh cá nhân
                </label>
                <input
                  type="text"
                  placeholder="Số định danh..."
                  value={formData.personalId}
                  onChange={(e) =>
                    setFormData({ ...formData, personalId: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          )}

          {/* Step 4: Personal Information */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">
                  Thông tin cá nhân
                </h3>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <strong>Nhập liệu nhanh</strong> - Sử dụng CCCD để tự động
                  điền thông tin
                </p>
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  QUÉT MÃ
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và chữ lót <span className="text-red-500">*</span>
                  <span className="text-gray-500 font-normal">
                    {" "}
                    (KHÔNG ghi họ hoặc chữ lót)
                  </span>
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  (theo CCCD/Hộ chiếu/Giấy khai sinh)
                </p>
                <input
                  type="text"
                  placeholder="VD: Nguyễn Văn..."
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên người bệnh <span className="text-red-500">*</span>
                  <span className="text-gray-500 font-normal">
                    {" "}
                    (KHÔNG ghi họ hoặc chữ lót)
                  </span>
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  (theo CCCD/Hộ chiếu/Giấy khai sinh)
                </p>
                <input
                  type="text"
                  placeholder="VD: An..."
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày sinh <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dân tộc <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.ethnicity}
                      onChange={(e) =>
                        setFormData({ ...formData, ethnicity: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none bg-white"
                    >
                      <option value="">Chọn...</option>
                      <option value="kinh">Kinh</option>
                      <option value="tay">Tày</option>
                      <option value="thai">Thái</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giới tính <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                        className="w-5 h-5 text-blue-600"
                      />
                      <span className="text-gray-700">Nam</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                        className="w-5 h-5 text-blue-600"
                      />
                      <span className="text-gray-700">Nữ</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nghề nghiệp <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.occupation}
                    onChange={(e) =>
                      setFormData({ ...formData, occupation: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none bg-white"
                  >
                    <option value="">Chọn...</option>
                    <option value="student">Sinh viên</option>
                    <option value="employee">Nhân viên</option>
                    <option value="teacher">Giáo viên</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setStep(Math.max(1, step - 1))}
              className={`px-6 py-3 rounded-lg ${
                step === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              disabled={step === 1}
            >
              Quay lại
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {step === 4 ? "TẠO HỒ SƠ KHÁM BỆNH" : "Tiếp tục"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
