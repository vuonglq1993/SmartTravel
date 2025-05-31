import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
 import AdminSidebar from "../components/AdminSidebar"; // Tạm thời comment nếu nghi lỗi

const AdminDashboard = () => {
  console.log("✅ AdminDashboard is rendering");

  return (
    <>
      <Header />
      <div style={{ padding: "2rem", background: "#f0f0f0" }}>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
