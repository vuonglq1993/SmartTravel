import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ReviewManagement.css";

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/reviews");
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  const deleteReview = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await axios.delete(`http://localhost:8080/api/reviews/${id}`);
        setReviews(reviews.filter((r) => r.id !== id));
      } catch (error) {
        console.error("Failed to delete review:", error);
      }
    }
  };

  return (
    <div className="review-container">
      <h2>Review Management</h2>
      <table className="review-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Tour ID</th>
            <th>Rating</th>
            <th>Content</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.username}</td>
              <td>{r.tourId}</td>
              <td>{"⭐".repeat(r.rating)}</td>
              <td>{r.comment}</td>
              <td>{new Date(r.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteReview(r.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewManagement;