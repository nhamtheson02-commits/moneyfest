export type PersonaKey = "giu-lua" | "tham-hiem" | "xay-nen" | "dong-hanh";

export const personaOrder: PersonaKey[] = ["giu-lua", "tham-hiem", "xay-nen", "dong-hanh"];

export type Persona = {
  key: PersonaKey;
  name: string;
  tagline: string;
  image: string;
  strengths: string;
  watch: string;
  next: { label: string; href: string };
};

export const personas: Record<PersonaKey, Persona> = {
  "giu-lua": {
    key: "giu-lua",
    name: "Người giữ lửa",
    tagline: "Bạn đặt sự an toàn và bình yên lên trước. Với bạn, tiền trước hết là tấm khiên cho gia đình.",
    image: "/images/moneyfest/thumbnails/ebooks/ebook-04-hieu-dung-bao-hiem-v4.jpg",
    strengths: "Kỷ luật, bình tĩnh trước biến động và luôn có sự chuẩn bị cho những điều bất ngờ.",
    watch: "Giữ quá nhiều tiền ở dạng an toàn tuyệt đối có thể khiến sức mua bị bào mòn theo thời gian.",
    next: { label: "Xem ebook về bảo hiểm và phân bổ an toàn", href: "/ebooks" },
  },
  "tham-hiem": {
    key: "tham-hiem",
    name: "Nhà thám hiểm",
    tagline: "Bạn nhìn thấy cơ hội nhanh và không ngại thử điều mới. Tiền với bạn là công cụ để mở rộng.",
    image: "/images/moneyfest/thumbnails/blog/blog-01-ban-do-phan-bo-tien-nhan-roi-v4.jpg",
    strengths: "Nhạy bén, chủ động học hỏi và sẵn sàng bắt đầu sớm hơn nhiều người.",
    watch: "Dễ bị cuốn theo xu hướng. Một tấm bản đồ phân bổ rõ ràng sẽ giúp mỗi quyết định có điểm tựa.",
    next: { label: "Đọc ebook Bản đồ phân bổ tiền nhàn rỗi", href: "/ebooks" },
  },
  "xay-nen": {
    key: "xay-nen",
    name: "Người xây nền",
    tagline: "Bạn thích có kế hoạch và đi từng bước chắc chắn. Mỗi khoản tiền của bạn đều có nhiệm vụ.",
    image: "/images/moneyfest/thumbnails/ebooks/ebook-07-money-map-workbook-v4.jpg",
    strengths: "Có hệ thống, theo dõi đều đặn và biết điều chỉnh khi hoàn cảnh thay đổi.",
    watch: "Đừng để việc chuẩn bị kéo dài quá lâu. Khi nền đã vững, hãy chọn một bước tiếp theo và bắt đầu.",
    next: { label: "Dùng Money Map Workbook để lập kế hoạch", href: "/ebooks" },
  },
  "dong-hanh": {
    key: "dong-hanh",
    name: "Người đồng hành",
    tagline: "Bạn quyết định tài chính cùng những người thân yêu. Với bạn, tiền là cách chăm lo cho tương lai chung.",
    image: "/images/moneyfest/thumbnails/ebooks/ebook-05-cam-nang-gia-dinh-tre-v4.jpg",
    strengths: "Biết lắng nghe, đặt mục tiêu chung lên trước và tạo được sự đồng thuận trong gia đình.",
    watch: "Cần một khung chung rõ ràng để các quyết định không phụ thuộc vào cảm xúc từng thời điểm.",
    next: { label: "Xem cẩm nang quyết định cho gia đình trẻ", href: "/ebooks" },
  },
};

export const personaQuestions: { q: string; options: { label: string; value: PersonaKey }[] }[] = [
  {
    q: "Bạn nhận được khoản thưởng bất ngờ bằng ba tháng lương. Việc đầu tiên bạn làm là gì?",
    options: [
      { label: "Cất vào quỹ dự phòng để yên tâm", value: "giu-lua" },
      { label: "Tìm cơ hội để khoản tiền này bắt đầu “làm việc”", value: "tham-hiem" },
      { label: "Chia theo kế hoạch đã có: quỹ, mục tiêu và đầu tư", value: "xay-nen" },
      { label: "Bàn với người thân để dùng cho mục tiêu chung", value: "dong-hanh" },
    ],
  },
  {
    q: "Mọi người xung quanh đều nói về một kênh đầu tư mới. Bạn phản ứng thế nào?",
    options: [
      { label: "Chờ thêm, khi nào hiểu rõ và thấy yên tâm hãy tính", value: "giu-lua" },
      { label: "Tò mò, tìm hiểu ngay và thử với một khoản nhỏ", value: "tham-hiem" },
      { label: "Xem kênh đó có phù hợp mục tiêu và kế hoạch của mình không", value: "xay-nen" },
      { label: "Hỏi ý kiến những người mình tin tưởng", value: "dong-hanh" },
    ],
  },
  {
    q: "Cuối tháng, điều bạn thường làm với số tiền còn lại là gì?",
    options: [
      { label: "Giữ lại một phần tiền mặt cho yên tâm", value: "giu-lua" },
      { label: "Nghĩ cách để tăng thu nhập hoặc tìm thêm cơ hội", value: "tham-hiem" },
      { label: "Đối chiếu chi tiêu với ngân sách đã đặt", value: "xay-nen" },
      { label: "Cùng người thân xem lại các khoản chi chung", value: "dong-hanh" },
    ],
  },
  {
    q: "Khi thị trường biến động mạnh, bạn thấy mình giống ai nhất?",
    options: [
      { label: "Muốn giữ thật chắc những gì đang có", value: "giu-lua" },
      { label: "Xem đây là lúc có thể xuất hiện cơ hội", value: "tham-hiem" },
      { label: "Mở lại kế hoạch và xem tỷ trọng đã hợp lý chưa", value: "xay-nen" },
      { label: "Bàn bạc với gia đình để cùng giữ bình tĩnh", value: "dong-hanh" },
    ],
  },
  {
    q: "Mục tiêu tài chính lớn nhất của bạn hiện nay là gì?",
    options: [
      { label: "Sự an tâm, không phải lo khi có biến cố", value: "giu-lua" },
      { label: "Gia tăng tài sản và có thêm sự tự do", value: "tham-hiem" },
      { label: "Hoàn thành từng mục tiêu theo một lộ trình rõ ràng", value: "xay-nen" },
      { label: "Một tương lai ổn định cho cả gia đình", value: "dong-hanh" },
    ],
  },
  {
    q: "Điều nào về tiền bạc khiến bạn khó chịu nhất?",
    options: [
      { label: "Phải chi một khoản lớn mà không có sự chuẩn bị", value: "giu-lua" },
      { label: "Bỏ lỡ một cơ hội tốt vì hành động chậm", value: "tham-hiem" },
      { label: "Chi tiêu mà không biết tiền đã đi đâu", value: "xay-nen" },
      { label: "Mỗi người một ý, thiếu thống nhất về tiền chung", value: "dong-hanh" },
    ],
  },
];

export const quizAreas = [
  {
    key: "emergencyFund",
    name: "Quỹ dự phòng",
    q: "Quỹ dự phòng của bạn hiện ở mức nào?",
    options: ["Chưa có", "Dưới 3 tháng chi tiêu", "Khoảng 3–6 tháng chi tiêu", "Từ 6 tháng chi tiêu trở lên"],
    tip: "Ưu tiên xây quỹ dự phòng bằng 3–6 tháng chi tiêu trước khi tăng tỷ trọng đầu tư.",
  },
  {
    key: "tracking",
    name: "Theo dõi chi tiêu",
    q: "Bạn có theo dõi chi tiêu hằng tháng không?",
    options: ["Chưa bao giờ", "Thỉnh thoảng", "Khá thường xuyên", "Hằng tháng và có ngân sách rõ ràng"],
    tip: "Bắt đầu bằng việc ghi lại chi tiêu trong 30 ngày. Chỉ cần nhìn thấy tiền đi đâu là đã thay đổi rất nhiều.",
  },
  {
    key: "debt",
    name: "Kiểm soát nợ",
    q: "Tình trạng nợ hiện tại của bạn như thế nào?",
    options: ["Nợ nhiều, khó xoay xở", "Có nợ, trả đều nhưng còn áp lực", "Nợ nhỏ, kiểm soát được", "Không có nợ cần lo"],
    tip: "Liệt kê các khoản nợ theo lãi suất và xử lý khoản có chi phí cao nhất trước.",
  },
  {
    key: "investing",
    name: "Đầu tư dài hạn",
    q: "Bạn đã bắt đầu đầu tư dài hạn chưa?",
    options: ["Chưa bắt đầu", "Đang tìm hiểu", "Đã bắt đầu với số nhỏ", "Đầu tư đều đặn theo kế hoạch"],
    tip: "Hiểu luật chơi của từng kênh trước, rồi bắt đầu bằng số nhỏ và đều đặn.",
  },
  {
    key: "goal",
    name: "Mục tiêu tài chính",
    q: "Mục tiêu tài chính của bạn rõ đến đâu?",
    options: ["Chưa nghĩ tới", "Có ý tưởng nhưng chưa cụ thể", "Có mục tiêu, chưa có số tiền và thời hạn", "Rõ cả số tiền lẫn thời hạn"],
    tip: "Viết mục tiêu theo dạng: bao nhiêu tiền, trước khi nào. Công cụ “Mục tiêu của tôi cần bao nhiêu?” sẽ giúp bạn.",
  },
] as const;
