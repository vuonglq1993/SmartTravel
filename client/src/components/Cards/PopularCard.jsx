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

  const categories = Array.isArray(category)
    ? category
    : typeof category === "string"
      ? category.split(",").map((c) => c.trim())
      : [];

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    const stars = [];
    for (let i = 0; i < full; i++) {
      stars.push(<i key={`full-${i}`} className="bi bi-star-fill text-warning"></i>);
    }
    if (half) {
      stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
    }
    for (let i = 0; i < empty; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star text-warning"></i>);
    }
    return stars;
  };

  return (
    <Card className="rounded-2 shadow-sm popular h-100 d-flex flex-column">
      <div
        style={{
          width: "100%",
          height: "300px",
          overflow: "hidden",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
        }}
      >
        <Card.Img
          variant="top"
          src={imageUrl}
          alt="Tour Image"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <Card.Body className="flex-grow-1 d-flex flex-column">
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

        <p className="reviwe mb-2">
          {renderStars(rating)} <span className="text-muted ms-1">({reviews} reviews)</span>
        </p>

        <div className="mb-2">
          {categories.map((cat, index) => (
            <span
              key={index}
              className={(cat.replace(/ .*/, "") || "category") + " badge me-1"}
            >
              {cat}
            </span>
          ))}
        </div>
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

        <p className="mt-2 mb-0">
          <small>Start date: {startDate ? new Date(startDate).toLocaleDateString() : "N/A"}</small>
        </p>
      </Card.Footer>
    </Card>
  );
};

export default PopularCard;
