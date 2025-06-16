import React from 'react';
import "../Cards/card.css";
import { Card, Stack } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const PopularCard = ({ val }) => {
  if (!val) return null;

  const {
    id = "",
    title = "Untitled tour",
    rating = 0,
    reviews = 0,
    category = [],
    price = 0,
    afterDiscount = null,
    days = "N/A",
    startDate = "",
    destination = {}
  } = val;
  const country = destination.country || "Unknown country";
  const destinationName = destination.name || "Unknown destination";
  const imageUrl = destination.imageUrl || "https://i.postimg.cc/02pXsCdq/Ulun-Danu-Beratan-Temple.png";

  // Nếu category là string, tách thành mảng
  const categories = Array.isArray(category)
    ? category
    : typeof category === "string"
      ? category.split(",").map((c) => c.trim())
      : [];

  return (
    <Card className="rounded-2 shadow-sm popular">
      <Card.Img
        variant="top"
        src={imageUrl}
        className="img-fluid"
        alt="Tour Image"
      />
      <Card.Body>
        <Card.Text>

          <span className="text ms-1">{destinationName}, {country}</span>
        </Card.Text>

        <Card.Title>
          <NavLink
            className="body-text text-dark text-decoration-none"
            to={`/tours/${id}`}
          >
            {title}
          </NavLink>
        </Card.Title>

        <p className="reviwe">
          <i className="bi bi-star-fill me-1 text-warning"></i>
          {rating} <span className="text-muted">({reviews} reviews)</span>
        </p>
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
        {afterDiscount !== null && afterDiscount < price && (
          <p className="text-decoration-line-through text-muted mb-1">
            ${price.toFixed(2)}
          </p>
        )}

        <Stack direction="horizontal" className="justify-content-between mt-1">
          <p className="mb-0">
            From <b>${(afterDiscount !== null && afterDiscount < price ? afterDiscount : price).toFixed(2)}</b>
          </p>
          <p className="mb-0">
            <i className="bi bi-clock me-1"></i> {days}
          </p>
        </Stack>

        <p className="mt-2">
          <small>Startdate: {startDate ? new Date(startDate).toLocaleDateString() : "N/A"}</small>
        </p>
      </Card.Footer>
    </Card>
  );
};

export default PopularCard;
