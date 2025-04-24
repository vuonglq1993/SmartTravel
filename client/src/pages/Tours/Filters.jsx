import React, { useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import { location ,Categories, Duration, PriceRange, Ratings} from "../../utils/data";

import "../Tours/tour.css"
const Filters = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleMinPriceChange = (event) => {
      const value = Number(event.target.value);
      if (value <= maxPrice) setMinPrice(value);
  };

  const handleMaxPriceChange = (event) => {
      const value = Number(event.target.value);
      if (value >= minPrice) setMaxPrice(value);
  };

  return (
      <div className="side_bar">
          <div className="filter_box shadow-sm rounded-2">
              <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                      <Accordion.Header>Location </Accordion.Header>
                      <Accordion.Body>
                          {location.map((location, inx) => {
                              return (
                                  <Form.Check
                                      key={inx}
                                      type="checkbox"
                                      id={location}
                                      label={location}
                                      value={location}
                                  />
                              );
                          })}
                      </Accordion.Body>
                  </Accordion.Item>
              </Accordion>

              <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="1">
                      <Accordion.Header>Categories </Accordion.Header>
                      <Accordion.Body>
                          {Categories.map((category, inx) => {
                              return (
                                  <Form.Check
                                      key={inx}
                                      type="checkbox"
                                      id={category}
                                      label={category}
                                      value={category}
                                  />
                              );
                          })}
                      </Accordion.Body>
                  </Accordion.Item>
              </Accordion>

              <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="1">
                      <Accordion.Header>Duration </Accordion.Header>
                      <Accordion.Body>
                          {Duration.map((days, inx) => {
                              return (
                                  <Form.Check
                                      key={inx}
                                      type="checkbox"
                                      id={days}
                                      label={days}
                                      value={days}
                                  />
                              );
                          })}
                      </Accordion.Body>
                  </Accordion.Item>
              </Accordion>

              <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="1">
                      <Accordion.Header>Price </Accordion.Header>
                      <Accordion.Body>
                          <Form.Label>
                              Price Range: ${minPrice} - ${maxPrice}
                          </Form.Label>

                          {/* Thanh kéo 2 chiều */}
                          <div className="slider-container">
                              <input
                                  type="range"
                                  min="0"
                                  max="1000"
                                  value={minPrice}
                                  onChange={handleMinPriceChange}
                                  className="slider"
                                  id="minRange"
                              />
                              <input
                                  type="range"
                                  min="0"
                                  max="1000"
                                  value={maxPrice}
                                  onChange={handleMaxPriceChange}
                                  className="slider"
                                  id="maxRange"
                              />

                              {/* Thanh màu hiển thị khoảng giá */}
                              <div
                                  className="slider-track"
                                  style={{
                                      left: `${(minPrice / 1000) * 100}%`,
                                      right: `${
                                          100 - (maxPrice / 1000) * 100
                                      }%`,
                                  }}
                              />
                          </div>
                          {PriceRange.map((Price, inx) => {
                              return (
                                  <Form.Check
                                      key={inx}
                                      type="checkbox"
                                      id={Price}
                                      label={Price}
                                      value={Price}
                                  />
                              );
                          })}
                      </Accordion.Body>
                  </Accordion.Item>
              </Accordion>

              <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="1">
                      <Accordion.Header>Rating </Accordion.Header>
                      <Accordion.Body>
                          {Ratings.map((rating, inx) => {
                              return (
                                  <Form.Check
                                      key={inx}
                                      type="checkbox"
                                      id={rating}
                                      label={rating}
                                      value={rating}
                                  />
                              );
                          })}
                      </Accordion.Body>
                  </Accordion.Item>
              </Accordion>
          </div>
      </div>
  );
};

export default Filters;
