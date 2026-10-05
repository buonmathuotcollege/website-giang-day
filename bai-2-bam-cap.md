# Bài 2: Kỹ Thuật Bấm Cáp Mạng RJ45 (Chuẩn T568A & T568B)

## 1. Chuẩn Bấm Dây & Ứng Dụng Thực Tiễn

Cáp mạng UTP gồm 8 lõi chia thành 4 cặp màu: **Cam, Xanh lá, Xanh dương, Nâu**.

### Bảng thứ tự 8 chân màu:
* **Chuẩn T568A:** 1. Trắng Xanh lá | 2. Xanh lá | 3. Trắng Cam | 4. Xanh dương | 5. Trắng Xanh dương | 6. Cam | 7. Trắng Nâu | 8. Nâu
* **Chuẩn T568B (Thông dụng nhất):** 1. Trắng Cam | 2. Cam | 3. Trắng Xanh lá | 4. Xanh dương | 5. Trắng Xanh dương | 6. Xanh lá | 7. Trắng Nâu | 8. Nâu

> **Mẹo ghi nhớ chuẩn B:** Cặp Xanh lá bị cặp Xanh dương ôm vào giữa (Chân 3: Trắng Xanh lá, chân 6: Xanh lá).

### Khi nào dùng cáp thẳng? Khi nào dùng cáp chéo?
* **Cáp thẳng (2 đầu cùng chuẩn B):** Nối 2 thiết bị **khác loại** (Máy tính nối vào Switch, Switch nối vào Router). Đây là loại cáp chiếm 95% trong thực tế văn phòng.
* **Cáp chéo (1 đầu chuẩn A, 1 đầu chuẩn B):** Nối 2 thiết bị **cùng loại** (Máy tính nối trực tiếp Máy tính, Switch nối Switch).

---

## 2. Quy Trình 5 Bước Bấm Cáp Mạng Chuẩn B

### Bước 1: Tuốt vỏ ngoài cáp mạng
* Đặt đầu dây vào rãnh tuốt của kìm, cách mép dây khoảng **2.5 – 3 cm**.
* Xoay nhẹ kìm 1 vòng tròn, sau đó rút lớp vỏ nhựa bên ngoài ra.
* *Lưu ý:* Không bóp kìm quá mạnh tránh cứa đứt lớp vỏ bọc của 8 lõi đồng bên trong.

<!-- Vị trí đặt ảnh minh họa thao tác tuốt dây -->
> 📷 *Hình ảnh minh họa: Đặt cáp vào rãnh kìm và tuốt vỏ 3cm*  
> `![Thao tác tuốt cáp](images/tuot-cap.jpg)`

### Bước 2: Tách cặp và vuốt thẳng dây
* Tách rời 4 cặp dây xoắn thành 8 sợi riêng lẻ.
* Dùng thân kìm hoặc ngón tay miết từng sợi dây thật thẳng để khi xếp vào rãnh hạt không bị chéo đè lên nhau.

### Bước 3: Sắp xếp theo chuẩn T568B
* Xếp 8 sợi sát nhau từ trái qua phải:  
  **Trắng Cam – Cam – Trắng Xanh lá – Xanh dương – Trắng Xanh dương – Xanh lá – Trắng Nâu – Nâu**.
* Dùng ngón cái và ngón trỏ giữ chặt và kiểm tra lại đúng thứ tự màu.

<!-- Vị trí đặt ảnh minh họa sắp xếp màu dây -->
> 📷 *Hình ảnh minh họa: 8 sợi dây sau khi vuốt thẳng và xếp đúng thứ tự màu*  
> `![Sắp xếp chuẩn màu B](images/xep-mau-chuan-b.jpg)`

### Bước 4: Cắt bằng đầu dây và tra vào hạt RJ45
* Cắt ngang bằng đầu dây sao cho đoạn hở chỉ còn khoảng **1.2 – 1.4 cm**.
* Cầm hạt mạng: mặt có chốt nhựa gạt quay xuống dưới, mặt có lá đồng kim loại hướng lên trên.
* Đẩy thẳng bó dây vào hạt sao cho:
  * 8 sợi đồng chạm khít vào đáy hạt mạng.
  * Phần vỏ bọc ngoài của dây mạng phải lọt sâu qua ngàm giữ của hạt.

<!-- Vị trí đặt ảnh minh họa đưa dây vào hạt mạng -->
> 📷 *Hình ảnh minh họa: Bó dây lọt sâu vào hạt RJ45, vỏ cáp nằm qua ngàm khóa*  
> `![Tra dây vào hạt mạng](images/tra-hat-rj45.jpg)`

### Bước 5: Bấm kìm cố định
* Đưa hạt vào khe 8P trên kìm bấm mạng, bóp kìm dứt khoát một lực vừa đủ cho đến khi ngàm kẹp giữ chặt vỏ cáp.
* Làm tương tự với đầu dây còn lại.

---

## 3. Video Hướng Dẫn Thao Tác Mẫu
> Xem kỹ chuyển động tay khi vuốt thẳng và góc cắt đầu dây:

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 8px; margin: 16px 0;">
  <iframe src="https://www.youtube.com/embed/MA_VIDEO_YOUTUBE" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

---

## 4. Kiểm Tra Bằng Máy Test Cáp & Lỗi Bị Trừ Điểm Khi Thi

* Cắm 2 đầu dây vào 2 cổng của máy test cáp, bật công tắc nguồn:
  * **Đạt chuẩn:** Cả 2 hàng đèn LED cùng sáng tuần tự từ **1 đến 8**.
  * **Lỗi đứt ngầm:** Đèn tương ứng không sáng (ví dụ đèn số 3 tắt do chân đồng chưa tiếp xúc lõi).
  * **Lỗi đảo màu:** Đèn nhấp nháy lộn xộn (ví dụ đèn 1-2 sáng nhưng đèn 4 sáng trước đèn 3).
  * **Lỗi tụt vỏ cáp:** Vỏ ngoài không nằm dưới ngàm kẹp của hạt RJ45 (bị trừ 50% điểm bài thực hành).
