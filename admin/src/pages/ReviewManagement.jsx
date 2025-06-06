import React, { useState } from "react";

import "../styles/ReviewManagement.css";

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "Nguyễn Văn A",
      tour: "Hạ Long Bay",
      content: "Tour rất tuyệt vời, HDV nhiệt tình!",
      rating: 5,
      date: "2024-08-20",
      visible: true,
    },
    {
      id: 2,
      user: "Trần Thị B",
      tour: "Đà Lạt",
      content: "Dịch vụ tạm ổn, xe đến muộn.",
      rating: 3,
      date: "2024-08-15",
      visible: true,
    },
  ]);

  const toggleVisibility = (id) => {
    setReviews(
      reviews.map((r) =>
        r.id === id ? { ...r, visible: !r.visible } : r
      )
    );
  };

  const deleteReview = (id) => {
    if (window.confirm("Bạn có chắc muốn xoá đánh giá này?")) {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  return (
    <>
     
      <div className="review-container">
        <h2>Review Management</h2>
        <table className="review-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Tour</th>
              <th>Rating</th>
              <th>Content</th>
              <th>Date</th>
              <th>Visible</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.user}</td>
                <td>{r.tour}</td>
                <td>{"⭐".repeat(r.rating)}</td>
                <td>{r.content}</td>
                <td>{r.date}</td>
                <td>{r.visible ? "Hiện" : "Ẩn"}</td>
                <td>
                  <button className="toggle-btn" onClick={() => toggleVisibility(r.id)}>
                    {r.visible ? "Ẩn" : "Hiện"}
                  </button>
                  <button className="delete-btn" onClick={() => deleteReview(r.id)}>
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
    </>
  );
};

export default ReviewManagement;
