import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import "../Tours/tour.css";
import { NavLink, useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import axios from "axios";

import {
  Container,
  Row,
  Nav,
  Col,
  Tab,
  ListGroup,
  Card,
  Stack,
} from "react-bootstrap";

const TourDetails = () => {
  const { id } = useParams();
  const [tourDetails, setTourDetails] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (rating && comment) {
      const newReview = {
        rating,
        comment,
        tour: { id: parseInt(id) },
        user: { id: 1 }, // replace with actual logged-in user ID
      };

      try {
        const response = await axios.post("/api/admin/reviews", newReview);
        setComments([...comments, response.data]);
        setRating(0);
        setComment("");
      } catch (error) {
        console.error("Failed to post review:", error);
        alert("Failed to post review. Please try again later.");
      }
    } else {
      alert("Please enter rating and comment.");
    }
  };

  useEffect(() => {
    document.title = "Tours Details";
    window.scrollTo(0, 0);

    axios
      .get(`/api/tours/${id}`)
      .then((res) => setTourDetails(res.data))
      .catch((err) => console.error("Error fetching tour details:", err));

    axios
      .get(`/api/admin/reviews`)
      .then((res) => setComments(res.data.filter((r) => r.tour.id == id)))
      .catch((err) => console.error("Error fetching reviews:", err));

    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
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
    navigate(`/booking/${id}`); // chuyển sang trang booking có id tour
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

          <p>
            <strong>Destination:</strong> {destinationName}, {country}
          </p>
          <p>
            <strong>Price:</strong>{" "}
            {afterDiscount && afterDiscount < price ? (
              <>
                <span className="text-muted text-decoration-line-through">
                  ${price.toFixed(2)}
                </span>{" "}
                <span className="text-danger">
                  ${afterDiscount.toFixed(2)}
                </span>
              </>
            ) : (
              <span>${price.toFixed(2)}</span>
            )}
          </p>
          <p>
            <strong>Rating:</strong> {rating} ⭐ ({reviews} reviews)
          </p>
          <p>
            <strong>Days:</strong> {days || "N/A"}
          </p>
          <p>
            <strong>Start Date:</strong>{" "}
            {startDate ? new Date(startDate).toLocaleDateString() : "N/A"}
          </p>
          <p>
            <strong>Description:</strong> {description}
          </p>

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
