# 🌿 Spec Kit & Quy Trình Phát Triển Hướng Đặc Tả (Spec-Driven Development)
**Hệ thống**: Website Giảng Dạy CNTT · CN. Phạm Tiến Đông (`https://phamtiendong.name.vn`)

Dự án này đã được tích hợp hoàn chỉnh bộ công cụ chuẩn quốc tế **GitHub Spec Kit** (`github/spec-kit`) nhằm chuyển đổi từ phong cách "vibe coding" (viết code trước, tài liệu sau) sang quy trình **Phát Triển Hướng Đặc Tả (Spec-Driven Development - SDD)**: biến tài liệu đặc tả thành nguồn chân lý (Single Source of Truth) để điều khiển các AI Agent sinh mã chuẩn xác.

---

## 1. Cấu Trúc Thư Mục Spec Kit Trong Dự Án

```text
├── .specify/
│   ├── memory/
│   │   └── constitution.md        # Hiến chương quản trị tối cao của dự án
│   ├── templates/
│   │   ├── spec-template.md       # Mẫu đặc tả tính năng (User Stories, Acceptance Criteria)
│   │   ├── plan-template.md       # Mẫu thiết kế kỹ thuật (Architecture, Schemas, Gates)
│   │   ├── tasks-template.md      # Mẫu phân rã công việc (Phased checklist, MVP)
│   │   ├── checklist-template.md  # Mẫu bảng kiểm chất lượng & rà soát an toàn
│   │   └── constitution-template.md
│   ├── scripts/
│   │   ├── powershell/            # Bộ script tự động hóa trên Windows
│   │   │   ├── create-new-feature.ps1
│   │   │   ├── setup-plan.ps1
│   │   │   ├── setup-tasks.ps1
│   │   │   └── common.ps1
│   │   └── bash/                  # Bộ script tự động hóa trên Linux / macOS
│   └── README.md                  # Tài liệu hướng dẫn này
├── .agents/
│   └── skills/                    # 9 kỹ năng chuẩn của Antigravity
│       ├── speckit-constitution/
│       ├── speckit-specify/
│       ├── speckit-clarify/
│       ├── speckit-plan/
│       ├── speckit-tasks/
│       ├── speckit-implement/
│       ├── speckit-checklist/
│       ├── speckit-converge/
│       └── speckit-analyze/
└── specs/                         # Kho lưu trữ các bản đặc tả tính năng
    ├── README.md
    └── 001-portal-hub-and-hsg-practical/  # Bản đặc tả mẫu đã hoàn tất & kiểm định
        ├── spec.md
        ├── plan.md
        └── tasks.md
```

---

## 2. Chu Trình Phát Triển 6 Bước (The 6-Step SDD Lifecycle)

Khi Thầy hoặc nhóm kỹ sư muốn phát triển một tính năng mới, hãy thực hiện lần lượt các lệnh kỹ năng sau trong cửa sổ chat với AI:

### Bước 1: Rà Soát Hiến Chương (`/speckit-constitution`)
- **Mục đích**: Nhắc nhở và đối chiếu các quy tắc bất biến trong `.specify/memory/constitution.md` (Tác giả CN. Phạm Tiến Đông, ❌ Cấm đề cập tên trường, chuẩn KTV 1/2/3, Windows 10 mandate, H510/DDR4, 0 lỗi build).

### Bước 2: Viết Đặc Tả Tính Năng (`/speckit-specify <mô-tả>`)
- **Lệnh tắt Terminal**: `npm run spec:new "Tên tính năng mới"`
- **Kết quả sinh ra**: Thư mục `specs/[###-ten-tinh-nang]/spec.md` với các User Story ưu tiên P1 (MVP), P2, P3 cùng điều kiện nghiệm thu độc lập.

### Bước 3: Phỏng Vấn & Làm Rõ Yêu Cầu (`/speckit-clarify`)
- **Mục đích**: AI sẽ chủ động đặt các câu hỏi trọng tâm để làm rõ các điểm còn mơ hồ, giải quyết các giả định ngầm và phân định phạm vi (In-Scope vs Out-of-Scope).

### Bước 4: Thiết Kế Kỹ Thuật (`/speckit-plan`)
- **Lệnh tắt Terminal**: `npm run spec:plan`
- **Kết quả sinh ra**: File `plan.md`, `data-model.md` và các hợp đồng API trong thư mục của spec. Cổng Constitution Gate sẽ kiểm tra xem thiết kế có vi phạm Windows 10 mandate hay phần cứng H510 không.

### Bước 5: Phân Rã Nhiệm Vụ Thi Công (`/speckit-tasks`)
- **Lệnh tắt Terminal**: `npm run spec:tasks`
- **Kết quả sinh ra**: File `tasks.md` chia nhỏ từng đầu việc nguyên tử (atomic tasks), có thể đánh dấu `[P]` cho các tác vụ chạy song song độc lập.

### Bước 6: Triển Khai & Kiểm Định (`/speckit-implement` & `/speckit-converge`)
- AI lần lượt thực thi từng task trong `tasks.md`, cập nhật trạng thái `[x]`.
- Chạy cổng kiểm định chất lượng: `npm run build` đảm bảo **0 lỗi (0 errors) và 0 cảnh báo (0 warnings)**.
- Kiểm thử hiển thị trên màn hình di động thông qua Browser Subagent.

---

## 3. Lệnh Nhanh Trong `package.json`

Thầy có thể gõ trực tiếp từ Terminal:
- `npm run spec:new -- "Mô tả tính năng"` : Khởi tạo nhánh đặc tả mới
- `npm run spec:plan` : Khởi tạo bản thiết kế kỹ thuật từ spec hiện tại
- `npm run spec:tasks` : Sinh danh sách nhiệm vụ từ plan hiện tại
