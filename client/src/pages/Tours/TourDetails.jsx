
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tours/${id}`)
      .then((res) => {
        setTour(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tour:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading tour details...</p>
      </Container>
    );
  }

  if (!tour) {
    return (
      <Container className="text-center mt-5">
        <h4>Tour not found</h4>
      </Container>
    );
  }

  const {
    title = "Untitled Tour",
    price = 0,
    afterDiscount,
    rating = 0,
    reviews = 0,
    startDate,
    days,
    description = "No description available",
    destination = {},
  } = tour;

  const {
    name: destinationName = "Unknown destination",
    country = "Unknown country",
    imageUrl = "https://via.placeholder.com/800x400?text=No+Image",
  } = destination;

  const handleBookNow = () => {
    // 👉 Điều hướng sang trang đặt tour hoặc xử lý sự kiện
    navigate(`/book/${id}`);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <h2 className="mb-3">{title}</h2>

          <img
            src={imageUrl}
            alt={destinationName}
            className="img-fluid rounded mb-4"
            style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
          />

          <p><strong>Destination:</strong> {destinationName}, {country}</p>
          <p><strong>Price:</strong> {afterDiscount && afterDiscount < price ? (
            <>
              <span className="text-muted text-decoration-line-through">${price.toFixed(2)}</span> {" "}
              <span className="text-danger">${afterDiscount.toFixed(2)}</span>
            </>
          ) : (
            <span>${price.toFixed(2)}</span>
          )}</p>
          <p><strong>Rating:</strong> {rating} ⭐ ({reviews} reviews)</p>
          <p><strong>Days:</strong> {days || "N/A"}</p>
          <p><strong>Start Date:</strong> {startDate ? new Date(startDate).toLocaleDateString() : "N/A"}</p>
          <p><strong>Description:</strong> {description}</p>

          <div className="mt-4 text-center">
            <Button variant="primary" size="lg" onClick={handleBookNow}>
              Book Now
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TourDetails;
