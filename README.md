# SmartTravel

## 🚀 Yêu cầu trước khi chạy

- **Java JDK** (21): https://adoptium.net/

---

## 🖥️ Chạy frontend (React - chạy bằng VSCode)

### Client (giao diện chính)


cd client


npm install   # Cài thư viện
npm install react-router-dom react-datepicker react-bootstrap react-lightbox-gallery react-paginate react-slick slick-carousel react-image-gallery bootstrap --legacy-peer-deps #Cài đặt các thư viện cần thiết

npm start  # Chạy frontend tại http://localhost:3000

---


## 🧰 Chạy backend (Spring Boot - Chạy bằng Intelij Idea)

cd server
./mvnw spring-boot:run   # Dành cho Linux/macOS

hoặc nếu dùng Windows:

mvnw.cmd spring-boot:run
