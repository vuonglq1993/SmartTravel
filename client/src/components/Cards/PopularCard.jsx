import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const PopularCard = ({ val }) => {
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
      <div className="overflow-hidden">
        <Card.Img
          variant="top"
          src={imageUrl || destination?.imageUrl || "/default-image.jpg"}
          alt={title}
          className="card-img-top object-fit-cover"
          style={{ height: "250px" }}
        />
      </div>
      <Card.Body>
        <Card.Title className="fw-bold fs-5 text-dark">{title}</Card.Title>
        <Card.Text className="text-muted mb-2">{description}</Card.Text>

        {reviewCount > 0 ? (
          <p className="review mb-2">
            {renderStars(averageRating)}{" "}
            <span className="text-muted ms-1">({reviewCount} reviews)</span>
          </p>
        ) : (
          <p className="text-muted mb-2">Chưa có đánh giá</p>
        )}

        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold text-primary">${price}</span>
          <Link
            to={`/tours/${id}`}
            className="btn btn-sm btn-outline-primary"
          >
            View Details
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PopularCard;
