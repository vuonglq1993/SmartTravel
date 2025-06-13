import React, { useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import { location, Duration, Ratings } from "../../utils/data";

import "../Tours/tour.css";

const Filters = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
    
  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    if (value <= maxPrice) {
      setMinPrice(value);
      triggerFilterChange({ minPrice: value, maxPrice });
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    if (value >= minPrice) {
      setMaxPrice(value);
      triggerFilterChange({ minPrice, maxPrice: value });
    }
  };

  const handleCheckboxChange = (value, list, setList, key) => {
    let updatedList;
    if (list.includes(value)) {
      updatedList = list.filter((item) => item !== value);
    } else {
      updatedList = [...list, value];
    }
    setList(updatedList);
    triggerFilterChange({ [key]: updatedList });
  };

  const triggerFilterChange = (changedFields) => {
    onFilterChange({
      minPrice,
      maxPrice,
      locations: selectedLocations,
      durations: selectedDurations,
      ratings: selectedRatings,
      ...changedFields,
    });
  };

  return (
    <div className="side_bar">
      <div className="filter_box shadow-sm rounded-2">
        <Accordion defaultActiveKey="0" alwaysOpen>

          {/* Location */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>Location</Accordion.Header>
            <Accordion.Body>
              {location.map((loc, idx) => (
                <Form.Check
                  key={idx}
                  type="checkbox"
                  id={`loc-${idx}`}
                  label={loc}
                  value={loc}
                  checked={selectedLocations.includes(loc)}
                  onChange={() =>
                    handleCheckboxChange(loc, selectedLocations, setSelectedLocations, "locations")
                  }
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>

          {/* Duration */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>Duration</Accordion.Header>
            <Accordion.Body>
              {Duration.map((dur, idx) => (
                <Form.Check
                  key={idx}
                  type="checkbox"
                  id={`dur-${idx}`}
                  label={dur}
                  value={dur}
                  checked={selectedDurations.includes(dur)}
                  onChange={() =>
                    handleCheckboxChange(dur, selectedDurations, setSelectedDurations, "durations")
                  }
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>

          {/* Price */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>Price</Accordion.Header>
            <Accordion.Body>
              <Form.Label>
                Price Range: ${minPrice} - ${maxPrice}
              </Form.Label>
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  className="slider"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  className="slider"
                />
                <div
                  className="slider-track"
                  style={{
                    left: `${(minPrice / 1000) * 100}%`,
                    right: `${100 - (maxPrice / 1000) * 100}%`,
                  }}
                />
              </div>
            </Accordion.Body>
          </Accordion.Item>

          {/* Ratings */}
          <Accordion.Item eventKey="3">
            <Accordion.Header>Rating</Accordion.Header>
            <Accordion.Body>
              {Ratings.map((rate, idx) => (
                <Form.Check
                  key={idx}
                  type="checkbox"
                  id={`rate-${idx}`}
                  label={rate}
                  value={rate}
                  checked={selectedRatings.includes(rate)}
                  onChange={() =>
                    handleCheckboxChange(rate, selectedRatings, setSelectedRatings, "ratings")
                  }
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default Filters;
