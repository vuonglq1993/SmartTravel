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
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setUserId(storedUser.id);
    }
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (rating && comment && userId) {
      const newReview = {
        rating,
        comment,
        tour: { id: parseInt(id) },
        user: { id: userId },
      };

      try {
        const response = await axios.post("http://localhost:8080/api/admin/reviews", newReview);
        setComments([...comments, response.data]);

        const tourRes = await axios.get(`http://localhost:8080/api/tours/${id}`);
        setTourDetails(tourRes.data);

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
      .get(`http://localhost:8080/api/tours/${id}`)
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

  if (!tourDetails) return <p>Loading...</p>;

  const galleryImages = tourDetails.imageUrl
    ? [{ original: tourDetails.imageUrl, thumbnail: tourDetails.imageUrl }]
    : [];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bi bi-star-fill text-warning"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star text-warning"></i>);
    }
    return stars;
  };

  const renderStarSelect = () => {
    return (
      <div className="d-flex gap-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <i
            key={num}
            className={`bi ${rating >= num ? "bi-star-fill" : "bi-star"} text-warning`}
            style={{ cursor: "pointer", fontSize: "1.5rem" }}
            onClick={() => setRating(num)}
          ></i>
        ))}
      </div>
    );
  };

  return (
    <>
      <Breadcrumbs
        title={tourDetails.title}
        pagename={<NavLink to="/tours">Tours</NavLink>}
        childpagename={tourDetails.title}
      />

      <section className="tour_details py-5">
        <Container>
          <Row>
            <h1 className="fs-2 font-bold mb-4">{tourDetails.title}</h1>

            <ImageGallery
              items={galleryImages}
              showNav={false}
              showBullets={false}
              showPlayButton={false}
            />

            <Tab.Container defaultActiveKey="1">
              <Row className="py-5">
                <Col md={8} className="mb-3 mb-md-0">
                  <Nav variant="pills" className="flex-row nav_bars rounded-2">
                    <Nav.Item>
                      <Nav.Link eventKey="1">Overview</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="2">Reviews {renderStars(tourDetails.averageRating)}</Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content className="mt-4">
                    <Tab.Pane eventKey="1">
                      <div className="tour_details">
                        <h1 className="font-bold mb-2 h3 border-bottom pb-2">Overview</h1>
                        <p className="body-text">{tourDetails.description}</p>

                        <h5 className="font-bold mb-2 h5 mt-3">Tour Info</h5>
                        <ListGroup>
                          <ListGroup.Item className="border-0 pt-0 body-text">
                            Start Date: {new Date(tourDetails.startDate).toLocaleDateString()}
                          </ListGroup.Item>
                          <ListGroup.Item className="border-0 pt-0 body-text">
                            End Date: {new Date(tourDetails.endDate).toLocaleDateString()}
                          </ListGroup.Item>
                          <ListGroup.Item className="border-0 pt-0 body-text">
                            Capacity: {tourDetails.capacity}
                          </ListGroup.Item>
                        </ListGroup>

                        <h5 className="font-bold mb-2 h5 mt-3">Destination</h5>
                        <p><strong>{tourDetails.destination.name.trim()}</strong> - {tourDetails.destination.country}</p>
                        <p>{tourDetails.destination.description}</p>
                        <img src={tourDetails.destination.imageUrl} alt={tourDetails.destination.name.trim()} className="img-fluid rounded" />
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="2">
                      <Row>
                        <h1 className="h3 mb-2">Post your own review</h1>
                        <form onSubmit={handleCommentSubmit} className="border rounded p-3">
                          <div className="mb-3">
                            <label className="form-label">Rating</label>
                            {renderStarSelect()}
                          </div>

                          <div className="mb-3">
                            <label htmlFor="comment" className="form-label">Comment</label>
                            <textarea
                              id="comment"
                              className="form-control"
                              rows="3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              required
                              placeholder="Write your review here..."
                            ></textarea>
                          </div>

                          <button type="submit" className="btn btn-primary mb-3">Submit</button>
                        </form>

                        <div className="mt-4">
                          <h2 className="h5 mb-3">Other Reviews</h2>
                          {comments.map((review, index) => (
                            <div key={index} className="border rounded p-3 mb-2">
                              <strong>Rating:</strong> {renderStars(review.rating)}
                              <p className="mb-0">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>

                <Col md={4}>
                  <aside>
                    <Card className="rounded-3 p-2 shadow-sm mb-4 price-info">
                      <Card.Body>
                        <Stack gap={2} direction="horizontal">
                          <h1 className="font-bold mb-0 h2">${tourDetails.price}</h1>
                          <span className="fs-4"> /person</span>
                        </Stack>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <ListGroup horizontal>
                            <ListGroup.Item className="border-0 me-2 fw-bold">
                              {tourDetails.averageRating}
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              {renderStars(tourDetails.averageRating)}
                            </ListGroup.Item>
                          </ListGroup>
                          <h5 className="h6">({tourDetails.reviewCount})</h5>
                        </div>

                        <NavLink
                          to="/booking"
                          className="primaryBtn w-100 d-flex justify-content-center fw-bold"
                        >
                          Book Now
                        </NavLink>
                      </Card.Body>
                    </Card>
                  </aside>
                </Col>
              </Row>
            </Tab.Container>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TourDetails;
