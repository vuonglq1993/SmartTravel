# 🚀 SmartTravel - Nền tảng Du lịch Thông minh

![Java](https://img.shields.io/badge/Java-21-orange) 
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green) 
![React](https://img.shields.io/badge/React-18-blue) 
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1)

**SmartTravel** là nền tảng du lịch thông minh giúp người dùng **lên kế hoạch, tìm kiếm và đặt tour** một cách dễ dàng. Hệ thống cung cấp gợi ý cá nhân hóa, quản lý lịch trình và thanh toán trực tuyến.

**Link repo:** [github.com/vuonglq1993/SmartTravel](https://github.com/vuonglq1993/SmartTravel)

## ✨ Tính năng chính
- Tìm kiếm tour theo địa điểm, giá, thời gian
- Gợi ý tour cá nhân hóa dựa trên sở thích
- Đặt tour & thanh toán trực tuyến
- Quản lý kế hoạch du lịch (lịch trình cá nhân)
- Quản trị viên (Admin panel) quản lý tour, user, đơn hàng
- Đăng ký/đăng nhập, bảo mật JWT

## 🛠️ Công nghệ sử dụng (Tech Stack)

**Backend**  
- Java 21 + Spring Boot 3  
- Spring Data JPA + Hibernate  
- MySQL  
- RESTful API + JWT Authentication  

**Frontend**  
- React 18 + TypeScript (nếu có)  
- Bootstrap 5 + React Bootstrap  
- React Router, Axios, React Icons  

**Tools**  
- Maven | Git | IntelliJ IDEA | VS Code | Postman  

## 🚀 Hướng dẫn cài đặt & chạy

### 1. Yêu cầu hệ thống
- Java JDK 21 [](https://adoptium.net/)
- Node.js 18+ & npm
- MySQL 8.0

### 2. Chạy Backend (Spring Boot)
```bash
cd server
# Windows
./mvnw spring-boot:run
# Hoặc
mvnw.cmd spring-boot:run

### 3. Chạy frontend(react)
cd client
npm install
npm start
