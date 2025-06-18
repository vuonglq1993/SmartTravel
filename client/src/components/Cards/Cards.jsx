import React from "react";
import { Card } from "react-bootstrap";
import "../Cards/card.css";
import { NavLink } from "react-router-dom";

const Cards = ({ id, destination }) => {
  return (
    <div className="img-box">
      <NavLink
        className="body-text text-dark text-decoration-none"
        to={`/tours/${id}`}
      >
        <Card style={{ height: "400px", overflow: "hidden", borderRadius: "12px" }}>
          <Card.Img
            variant="top"
            src={destination.imageUrl}
            className="img-fluid"
            alt={destination.name}
          />
          <Card.Title className="text-center p-2">
            {destination.name}
          </Card.Title>
        </Card>
      </NavLink>
    </div>
  );
};

export default Cards;
