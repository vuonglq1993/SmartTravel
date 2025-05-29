import React, { useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import {
    location,
    Categories,
    Duration,
    PriceRange,
    Ratings,
} from "../../utils/data";

import "../Tours/tour.css";

const Filters = () => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [selectedLocations, setSelectedLocations] = useState([location[0]]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedDurations, setSelectedDurations] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);

    // Price slider handlers
    const handleMinPriceChange = (event) => {
        const value = Number(event.target.value);
        if (value <= maxPrice) setMinPrice(value);
    };

    const handleMaxPriceChange = (event) => {
        const value = Number(event.target.value);
        if (value >= minPrice) setMaxPrice(value);
    };

    // Location checkbox
    const handleLocationChange = (event) => {
        const value = event.target.value;
        setSelectedLocations((prev) =>
            prev.includes(value)
                ? prev.filter((loc) => loc !== value)
                : [...prev, value]
        );
    };

    // Generic handler for checkbox arrays
    const handleCheckboxChange = (value, selectedArray, setSelectedArray) => {
        setSelectedArray((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    return (
        <div className="side_bar">
            <div className="filter_box shadow-sm rounded-2">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Location</Accordion.Header>
                        <Accordion.Body>
                            <Form.Text className="text-muted">
                                Please select one or more locations:
                            </Form.Text>
                            {location.map((loc, inx) => (
                                <Form.Check
                                    key={inx}
                                    type="checkbox"
                                    id={`location-${inx}`}
                                    label={loc}
                                    value={loc}
                                    checked={selectedLocations.includes(loc)}
                                    onChange={handleLocationChange}
                                />
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Categories</Accordion.Header>
                        <Accordion.Body>
                            {Categories.map((category, inx) => (
                                <Form.Check
                                    key={inx}
                                    type="checkbox"
                                    id={`category-${inx}`}
                                    label={category}
                                    value={category}
                                    checked={selectedCategories.includes(category)}
                                    onChange={() =>
                                        handleCheckboxChange(
                                            category,
                                            selectedCategories,
                                            setSelectedCategories
                                        )
                                    }
                                />
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Duration</Accordion.Header>
                        <Accordion.Body>
                            {Duration.map((days, inx) => (
                                <Form.Check
                                    key={inx}
                                    type="checkbox"
                                    id={`duration-${inx}`}
                                    label={days}
                                    value={days}
                                    checked={selectedDurations.includes(days)}
                                    onChange={() =>
                                        handleCheckboxChange(
                                            days,
                                            selectedDurations,
                                            setSelectedDurations
                                        )
                                    }
                                />
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
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
                            {PriceRange.map((price, inx) => (
                                <Form.Check
                                    key={inx}
                                    type="checkbox"
                                    id={`price-${inx}`}
                                    label={price}
                                    value={price}
                                    checked={selectedPriceRanges.includes(price)}
                                    onChange={() =>
                                        handleCheckboxChange(
                                            price,
                                            selectedPriceRanges,
                                            setSelectedPriceRanges
                                        )
                                    }
                                />
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Rating</Accordion.Header>
                        <Accordion.Body>
                            {Ratings.map((rating, inx) => (
                                <Form.Check
                                    key={inx}
                                    type="checkbox"
                                    id={`rating-${inx}`}
                                    label={rating}
                                    value={rating}
                                    checked={selectedRatings.includes(rating)}
                                    onChange={() =>
                                        handleCheckboxChange(
                                            rating,
                                            selectedRatings,
                                            setSelectedRatings
                                        )
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
