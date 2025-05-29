import React from 'react';
import "../Cards/card.css";
import { Card, Stack } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const PopularCard = ({ val }) => {
  if (!val) return null;

  const {
    id = "",
    image = "https://via.placeholder.com/300x200?text=No+Image",
    location = "Unknown location",
    title = "Untitled",
    rating = 0,
    reviews = 0,
    category = [],
    price = 0,
    afterDiscount = null,
    days = "N/A"
  } = val;

  const categories = Array.isArray(category)
    ? category
    : typeof category === "string"
    ? category.split(",").map((c) => c.trim())
    : [];

  return (
    <Card className="rounded-2 shadow-sm popular">
      <Card.Img
        variant="top"
        src={image}
        className="img-fluid"
        alt="Tour Image"
      />
      <Card.Body>
        <Card.Text>
          <i className="bi bi-geo-alt"></i>
          <span className="text ms-1">{location}</span>
        </Card.Text>

        <Card.Title>
          <NavLink
            className="body-text text-dark text-decoration-none"
            to={`/tour-details/${id || 1}`} // Điều hướng đúng ID
          >
            {title}
          </NavLink>
        </Card.Title>

        <p className="reviwe">
          <i className="bi bi-star-fill me-1 text-warning"></i>
          {rating} <span className="text-muted">({reviews} reviews)</span>
        </p>

        {/* Hiển thị danh sách category dưới dạng badge */}
        {categories.map((cat, index) => (
          <span
            key={index}
            className={(cat.replace(/ .*/, "") || "category") + " badge me-1"}
          >
            {cat}
          </span>
        ))}
      </Card.Body>

      <Card.Footer className="py-4">
        {afterDiscount && (
          <p className="text-decoration-line-through text-muted mb-1">
            ${price.toFixed(2)}
          </p>
        )}

        <Stack direction="horizontal" className="justify-content-between mt-1">
          <p className="mb-0">
            From <b>${(afterDiscount || price).toFixed(2)}</b>
          </p>
          <p className="mb-0">
            <i className="bi bi-clock me-1"></i> {days}
          </p>
        </Stack>
      </Card.Footer>
    </Card>
  );
};

export default PopularCard;
