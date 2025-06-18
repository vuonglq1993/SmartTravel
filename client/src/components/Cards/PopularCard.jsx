import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Component to display a single popular tour card
const PopularCard = ({ val }) => {
  // Destructure the tour data
  const {
    id,
    title,
    description,
    price,
    imageUrl,
    averageRating = 0,
    reviewCount = 0,
    destination,
  } = val;

  // Helper function to render star icons based on average rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} color="#ffc107" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} color="#ffc107" />);
      } else {
        stars.push(<FaRegStar key={i} color="#ffc107" />);
      }
    }
    return stars;
  };

  return (
    <Card className="shadow border-0 tour-card">
      {/* Display tour image */}
      <div className="overflow-hidden">
        <Card.Img
          variant="top"
          src={imageUrl || destination?.imageUrl || "/default-image.jpg"}
          alt={title}
          className="card-img-top object-fit-cover"
          style={{ height: "400px" }}
        />
      </div>

      <Card.Body>
        {/* Tour title */}
        <Card.Title className="fw-bold fs-5 text-dark">{title}</Card.Title>

        {/* Short description */}
        <Card.Text className="text-muted mb-2">{description}</Card.Text>

        {/* Star rating or fallback message */}
        {reviewCount > 0 ? (
          <p className="review mb-2">
            {renderStars(averageRating)}{" "}
            <span className="text-muted ms-1">({reviewCount} reviews)</span>
          </p>
        ) : (
          <p className="text-muted mb-2">No reviews yet</p>
        )}

        {/* Price and link to detail page */}
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold text-primary">${price}</span>
          <Link to={`/tours/${id}`} className="btn btn-sm btn-outline-primary">
            View Details
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PopularCard;
