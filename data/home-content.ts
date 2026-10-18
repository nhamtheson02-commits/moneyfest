export type HomeDetail = {
  kicker: string;
  title: string;
  badge?: string;
  lead: string;
  points: string[];
  cta?: { href: string; label: string };
};

export type HomeCard = {
  id: string;
  title: string;
  description: string;
  icon?: "map" | "target" | "scale" | "compass" | "briefcase" | "users" | "book";
  meta?: string;
  featured?: boolean;
  detail: HomeDetail;
};

export const processSteps: HomeCard[] = [
  {
    id: "dang-ky",
    title: "Đăng ký",
    description: "Chọn lịch phù hợp và điền thông tin cơ bản",
    detail: {
      kicker: "Bước 1",
      title: "Đăng ký buổi trao đổi",
      lead: "Bạn để lại thông tin cơ bản và khung giờ thuận tiện. Moneyfest sẽ liên hệ lại để xác nhận lịch.",
      points: [
        "Điền họ tên, email, số điện thoại và mục tiêu bạn quan tâm nhất.",
        "Chọn khung giờ phù hợp; đội ngũ sẽ xác nhận lại với bạn.",
        "Thông tin của bạn chỉ dùng để chuẩn bị cho buổi làm việc.",
      ],
      cta: { href: "/contact", label: "Đăng ký ngay" },
    },
  },
  {
    id: "chuan-bi",
    title: "Chuẩn bị",
    description: "Điền bảng câu hỏi tài chính trước buổi tư vấn",
    detail: {
      kicker: "Bước 2",
      title: "Chuẩn bị trước buổi làm việc",
      lead: "Một bảng câu hỏi ngắn giúp chuyên gia hiểu hoàn cảnh của bạn trước, để buổi trao đổi đi thẳng vào điều quan trọng.",
      points: [
        "Thu nhập, các khoản chi chính và khoản tiết kiệm hiện có.",
        "Các khoản nợ hoặc cam kết tài chính đang theo.",
        "Mục tiêu trong 1–5 năm tới và điều bạn còn băn khoăn.",
      ],
      cta: { href: "/contact", label: "Trao đổi cùng chuyên gia" },
    },
  },
  {
    id: "buoi-tu-van",
    title: "Buổi tư vấn 1:1",
    description: "Nhìn rõ dòng tiền, phân tích và xác định ưu tiên",
    detail: {
      kicker: "Bước 3",
      title: "Buổi làm việc riêng 60–90 phút",
      lead: "Chuyên gia cùng bạn xem lại bức tranh tài chính hiện tại và sắp xếp việc nào nên làm trước.",
      points: [
        "Nhìn rõ dòng tiền: thu nhập, chi tiêu, tiết kiệm và nợ.",
        "Nhận diện điểm mạnh, điểm cần cải thiện và rủi ro.",
        "Chốt 3–5 việc ưu tiên cho 90 ngày tới.",
      ],
      cta: { href: "/contact", label: "Đặt lịch" },
    },
  },
  {
    id: "money-map",
    title: "Nhận Money Map",
    description: "Nhận bản đồ 90 ngày và hướng dẫn triển khai",
    detail: {
      kicker: "Bước 4",
      title: "Bản đồ tài chính 90 ngày",
      lead: "Sau buổi làm việc, bạn nhận một bản tóm tắt rõ ràng để bắt tay vào thực hiện.",
      points: [
        "Bản đồ dòng tiền và danh sách việc ưu tiên theo thứ tự.",
        "Hướng dẫn từng bước và công cụ phù hợp với bạn.",
        "Có thể trao đổi lại để điều chỉnh khi hoàn cảnh thay đổi.",
      ],
      cta: { href: "/contact", label: "Bắt đầu" },
    },
  },
];

export const miniTools: HomeCard[] = [
  {
    id: "dong-tien",
    title: "Bảng tính dòng tiền cá nhân",
    description: "Theo dõi thu nhập, chi tiêu, tiết kiệm.",
    icon: "map",
    meta: "Xem chi tiết →",
    detail: {
      kicker: "Công cụ miễn phí",
      title: "Bảng tính dòng tiền cá nhân",
      badge: "Dùng được ngay",
      lead: "Nhập thu nhập và các khoản chi hằng tháng để thấy rõ mỗi tháng còn lại bao nhiêu.",
      points: [
        "Tự tính tỷ lệ tiết kiệm và phần chi tiêu so với thu nhập.",
        "Dùng ngay trên trình duyệt, không cần cài đặt.",
        "Để lại email nếu muốn nhận kết quả.",
      ],
      cta: { href: "/tools#cashflow", label: "Mở bảng tính" },
    },
  },
  {
    id: "muc-tieu",
    title: "Máy tính mục tiêu tài chính",
    description: "Tính số tiền và thời gian để đạt mục tiêu.",
    icon: "target",
    meta: "Xem chi tiết →",
    detail: {
      kicker: "Công cụ miễn phí",
      title: "Máy tính mục tiêu tài chính",
      badge: "Sắp ra mắt",
      lead: "Cho biết cần tiết kiệm bao nhiêu mỗi tháng và mất bao lâu để đạt mục tiêu như mua nhà, quỹ dự phòng hay học tập.",
      points: [
        "Nhập số tiền mục tiêu và thời gian mong muốn.",
        "Xem nhiều kịch bản để chọn nhịp độ phù hợp.",
      ],
      cta: { href: "/contact", label: "Nhận thông báo khi ra mắt" },
    },
  },
  {
    id: "so-sanh",
    title: "So sánh phương án đầu tư",
    description: "So sánh kịch bản và đánh giá rủi ro.",
    icon: "scale",
    meta: "Xem chi tiết →",
    detail: {
      kicker: "Công cụ miễn phí",
      title: "So sánh phương án đầu tư",
      badge: "Sắp ra mắt",
      lead: "Đặt các phương án cạnh nhau để cân nhắc lợi ích và rủi ro trước khi quyết định.",
      points: [
        "So sánh theo thời gian, mức vốn và mức chấp nhận rủi ro.",
        "Chỉ mang tính tham khảo, không phải lời khuyên mua bán.",
      ],
      cta: { href: "/contact", label: "Nhận thông báo khi ra mắt" },
    },
  },
];

export const productCards: HomeCard[] = [
  {
    id: "starter",
    title: "Money Map Starter",
    description: "Quiz, workbook và checklist 90 ngày.",
    icon: "compass",
    meta: "Miễn phí",
    detail: {
      kicker: "Sản phẩm",
      title: "Money Map Starter",
      badge: "Miễn phí",
      lead: "Bộ khởi đầu giúp bạn tự nhìn lại tài chính của mình trước khi cần đến tư vấn.",
      points: ["Quiz khám phá phong cách tài chính.", "Workbook thực hành ngân sách.", "Checklist 90 ngày để bắt đầu."],
      cta: { href: "/tools", label: "Khám phá ngay" },
    },
  },
  {
    id: "money-map-1-1",
    title: "Money Map 1:1",
    description: "Tư vấn cá nhân 1 buổi, bản đồ tài chính 90 ngày.",
    icon: "briefcase",
    meta: "Từ 1.500.000đ",
    featured: true,
    detail: {
      kicker: "Dịch vụ chủ lực",
      title: "Money Map 1:1",
      badge: "Từ 1.500.000đ / buổi",
      lead: "Một buổi làm việc riêng 60–90 phút để lập bản đồ tài chính cá nhân và 3–5 bước ưu tiên trong 90 ngày.",
      points: ["Bản đồ dòng tiền: thu nhập, chi tiêu, tiết kiệm, nợ.", "Đánh giá điểm mạnh, điểm yếu và rủi ro.", "Gợi ý giải pháp và công cụ phù hợp."],
      cta: { href: "/contact", label: "Đặt lịch ngay" },
    },
  },
  {
    id: "membership",
    title: "Moneyfest Membership",
    description: "Cộng đồng, template và Q&A hằng tháng.",
    icon: "users",
    meta: "Sắp ra mắt",
    detail: {
      kicker: "Sản phẩm",
      title: "Moneyfest Membership",
      badge: "Sắp ra mắt",
      lead: "Không gian học và trao đổi tài chính cá nhân cùng cộng đồng.",
      points: ["Cộng đồng cùng học và chia sẻ.", "Template mới mỗi tháng.", "Buổi hỏi đáp định kỳ với chuyên gia."],
      cta: { href: "/community", label: "Tìm hiểu cộng đồng" },
    },
  },
  {
    id: "dashboard",
    title: "Moneyfest Dashboard",
    description: "Theo dõi dòng tiền, tài sản, nợ và mục tiêu.",
    icon: "book",
    meta: "Sắp ra mắt",
    detail: {
      kicker: "Sản phẩm",
      title: "Moneyfest Dashboard",
      badge: "Sắp ra mắt",
      lead: "Một nơi để theo dõi toàn bộ bức tranh tài chính của bạn.",
      points: ["Dòng tiền, tài sản và nợ trong cùng một màn hình.", "Theo dõi tiến độ từng mục tiêu."],
      cta: { href: "/contact", label: "Nhận thông báo khi ra mắt" },
    },
  },
];
