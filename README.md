# SmartTravel

## Tổng quan:

### Chủ đề: 
SmartTravel
SmartTravel là nền tảng du lịch thông minh, cung cấp các công cụ để người dùng lên kế hoạch, tìm kiếm và đặt tour, giúp tối ưu hóa hành trình du lịch với những gợi ý cá nhân hóa và dịch vụ tiện lợi.

### Các công nghệ sử dụng:

- Frontend: Sử dụng React để làm việc, kết hợp với thư viện Bootstrap để trang trí

- Backend: Sử dụng Java (Springboot), kết hợp mySQL


## 🚀 Yêu cầu trước khi chạy

- **Java JDK** (21): https://adoptium.net/

---

## 🖥️ Chạy frontend (React - chạy bằng VSCode)

### Client (giao diện chính)


cd client

### Cài thư viện

npm install  

### Cài đặt các thư viện cần thiết

npm install react-router-dom react-datepicker react-bootstrap react-lightbox-gallery react-paginate react-slick slick-carousel react-image-gallery bootstrap --legacy-peer-deps 

### Chạy frontend tại http://localhost:3000

npm start

---


## 🧰 Chạy backend (Spring Boot - Chạy bằng Intelij Idea)

### Trỏ vào thư mục Folder

cd server

### Dành cho Linux/macOS

./mvnw spring-boot:run  

### Windows:

mvnw.cmd spring-boot:run


