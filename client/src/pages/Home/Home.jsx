import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../../components/Banner/Banner";
import Features from "../../components/Features/Features";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css";
import Footerapp from "../../assets/images/footerapp/footerapp.png";
import Cards from "../../components/Cards/Cards";
import PopularCard from "../../components/Cards/PopularCard";
import Appstore from "../../assets/images/footerapp/Appstore.png";
import CHPplay from "../../assets/images/footerapp/CHplay.png";

const Home = () => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 6;

  useEffect(() => {
    document.title = "Home";
    window.scrollTo(0, 0);
    fetchTours();
  }, []);

  // Fetch tour data from backend
  const fetchTours = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tours");
      setTours(res.data);
    } catch (error) {
      console.error("Failed to fetch tours:", error);
    }
  };

  // Settings for destination slider
  const sliderSettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, dots: true, autoplay: true } },
      { breakpoint: 991, settings: { slidesToShow: 3, dots: true } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  // Pagination logic for Popular Tours
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = Array.isArray(tours)
  ? tours.slice(indexOfFirstTour, indexOfLastTour)
  : [];  const totalPages = Math.ceil(tours.length / toursPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 700, behavior: "smooth" }); // scroll to popular section
  };

  return (
    <>
      <Banner />
      <Features />

      {/* Destination carousel section */}
      <section className="tours_section slick_slider">
        <Container>
          <Row>
            <Col md="12">
              <div className="main_heading">
                <p className="fs-2 text-uppercase">Destinations</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Slider {...sliderSettings}>
              {Array.isArray(tours) &&
  tours.map((tour, index) => (
    <Cards
      key={index}
      id={tour.id}
      destination={{
        name: tour.destination?.name?.trim(),
        imageUrl: tour.destination?.imageUrl,
      }}
      rating={tour.averageRating}
    />
))}

              </Slider>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Popular Tours section with pagination */}
      <section className="popular py-5">
        <Container>
          <Row>
            <Col md="12">
              <div className="main_heading">
                <p className="fs-2 text-uppercase">Popular Tours</p>
              </div>
            </Col>
          </Row>
          <Row>
          {Array.isArray(currentTours) && currentTours.length > 0 ? (
  currentTours.map((val, idx) => (
    <Col
      md={4}
      sm={6}
      xs={12}
      className="mb-5"
      key={val.id || idx}
    >
      <PopularCard val={val} />
    </Col>
  ))
) : (
  <Col>
    <p>No tours available.</p>
  </Col>
)}

          </Row>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <Row className="justify-content-center mt-3">
              <Col md="auto">
                <div className="pagination">
                  {[...Array(totalPages).keys()].map((number) => (
                    <Button
                      key={number}
                      variant={number + 1 === currentPage ? "primary" : "outline-primary"}
                      onClick={() => handlePageChange(number + 1)}
                      className="me-2"
                    >
                      {number + 1}
                    </Button>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>

      {/* Call-to-action section */}
      <section className="call_us">
        <Container>
          <Row className="align-items-center">
            <Col md="8">
              <h5 className="title">CALL TO ACTION</h5>
              <h2 className="heading">
                READY FOR UNFORGETTABLE TRAVEL. REMEMBER US!
              </h2>
              <p className="text">
                Explore the world like never before! From the serene beaches of Bali to the majestic mountains of the Swiss Alps, every destination offers a unique experience waiting to be discovered. Immerse yourself in vibrant cultures, savor delicious cuisines, and create memories that will last a lifetime. Let us guide you on your next adventure!
              </p>
            </Col>
            <Col md="4" className="text-center mt-3 mt-md-0">
              <Link to="contact-us" style={{ textDecoration: "none" }}>
                <Button className="primaryBtn d-flex justify-content-center">
                  Contact Us
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
        <div className="overlay"></div>
      </section>

      {/* App download section */}
      <section className="download mt-5">
        <Container>
          <Row className="align-items-center mb-5">
            <Col md="6">
              <p className="fs-2">
                Download the <strong>TRAVELSMART</strong> app
              </p>
              <p className="fs-4 mt-2">
                and discover special objects anytime, anywhere
              </p>
              <Row>
                <Col md="6">
                  <a href="/">
                    <img className="img-fluid mt-3" src={Appstore} alt="appstore" />
                  </a>
                </Col>
                <Col md="6">
                  <a href="/">
                    <img className="img-fluid mt-3" src={CHPplay} alt="chplay" />
                  </a>
                </Col>
              </Row>
            </Col>
            <Col md="6">
              <img src={Footerapp} className="img-fluid" alt="footerapp" />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
