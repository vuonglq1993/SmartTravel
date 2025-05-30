import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../../components/Banner/Banner";
import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch";
import Features from "../../components/Features/Features";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css";
import Footerapp from "../../assets/images/footerapp/footerapp.png";
import Gallery from "../../components/Gallery/Gallery";
import Cards from "../../components/Cards/Cards";
import { destinationsData } from "../../utils/data";  // vẫn dùng data giả cho Top places
import PopularCard from "../../components/Cards/PopularCard";
import Appstore from "../../assets/images/footerapp/Appstore.png";
import CHPplay from "../../assets/images/footerapp/CHplay.png";

const Home = () => {
  // State chứa danh sách tours lấy từ backend
  const [tours, setTours] = useState([]);

  // State cho filter (nếu dùng AdvanceSearch nâng cao)
  const [filters, setFilters] = useState({
    destinationName: "",
    country: "",
    minPrice: "",
    maxPrice: "",
  });

  // Gọi API lấy toàn bộ tour
  const fetchTours = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tours");
      setTours(res.data);
    } catch (error) {
      console.error("Failed to fetch tours:", error);
    }
  };

  // Hàm xử lý khi search (nếu cần)
  const handleSearch = () => {
    console.log("Searching with filters:", filters);
    // Có thể gọi API lọc theo filters ở đây nếu muốn
  };

  useEffect(() => {
    document.title = "Home";
    window.scroll(0, 0);
    fetchTours();
  }, []);

  // Cấu hình slick slider cho Top places
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          prevArrow: false,
          nextArrow: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: false,
          nextArrow: false,
        },
      },
    ],
  };

  return (
    <>
      <Banner />
      <AdvanceSearch
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
      />
      <Features />

      <section className="tours_section slick_slider">
        <Container>
          <Row>
            <Col md="12">
              <div className="main_heading">
                <p className="fs-2 text-uppercase"> Top places</p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <Slider {...settings}>
                {destinationsData.map((destination, inx) => (
                  <Cards destination={destination} key={inx} />
                ))}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Phần Popular Tours sử dụng data từ backend */}
      <section className="popular py-5">
        <Container>
          <Row>
            <Col md="12">
              <div className="main_heading">
                <p className="fs-2 text-uppercase"> Popular Tours</p>
              </div>
            </Col>
          </Row>
          <Row>
            {tours.length > 0 ? (
              tours.map((val, inx) => (
                <Col
                  md={3}
                  sm={6}
                  xs={12}
                  className="mb-5"
                  key={val.id || inx}
                  style={{ maxHeight: "900px", overflowY: "auto" }}
                >
                  <PopularCard val={val} />
                </Col>
              ))
            ) : (
              <p>Không có tour nào.</p>
            )}
          </Row>
        </Container>
      </section>

      <section className="call_us">
        <Container>
          <Row className="align-items-center">
            <Col md="8">
              <h5 className="title">CALL TO ACTION</h5>
              <h2 className="heading">
                READY FOR UNFORGATABLE TRAVEL. REMEMBER US!
              </h2>
              <p className="text">
                Explore the world like never before! From the serene beaches of Bali to the majestic mountains of the Swiss Alps, every destination offers a unique experience waiting to be discovered. Immerse yourself in vibrant cultures, savor delicious cuisines, and create memories that will last a lifetime. Let us guide you on your next adventure!
              </p>
            </Col>
            <Col md="4" className="text-center mt-3 mt-md-0">
              <Link to="contact-us" style={{ textDecoration: "none" }}>
                <Button className="primaryBtn flex-even d-flex justify-content-center">
                  <i className="bi bi-search me-2"></i> Contact Us
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
        <div className="overlay"></div>
      </section>

      <section className="gallery">
        <Container>
          <Row>
            <Col md="12">
              <div className="main_heading">
                <p className="fs-2 text-uppercase"> experience</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Gallery />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="download">
        <Container>
          <Row className="align-items-center mb-5">
            <Col md="6">
              <p className="fs-2">
                Download the <strong>TRAVELSMART</strong> app
              </p>
              <p className="fs-4 mt-2">
                and discover special object anytime, anywhere
              </p>
              <Row>
                <Col md="6">
                  <div>
                    <a href="/" tabIndex="0">
                      <img
                        className="img-fluid mt-3"
                        src={Appstore}
                        alt="appstore"
                      />
                    </a>
                  </div>
                </Col>
                <Col md="6">
                  <div>
                    <a href="/" tabIndex="0">
                      <img
                        className="img-fluid mt-3"
                        src={CHPplay}
                        alt="chplay"
                      />
                    </a>
                  </div>
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
