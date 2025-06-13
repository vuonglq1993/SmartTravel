import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination/Pagination";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch";
import { Container, Row, Col, Offcanvas } from "react-bootstrap";
import PopularCard from "../../components/Cards/PopularCard";
import Filters from "./Filters";
import "../Tours/tour.css";
import axios from "axios";

const Tours = () => {
  const [show, setShow] = useState(false);
  const [tours, setTours] = useState([]);
  const [filters, setFilters] = useState({
    destinationName: "",
    country: "",
    minPrice: "",
    maxPrice: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const handleFilterChange = async (filters) => {
    try {
      const params = {
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        destinationName: filters.locations?.[0], // ví dụ lấy location đầu tiên
        // có thể thêm country, durations, ratings nếu muốn
      };

      const response = await axios.get("/api/tours/search", { params });
      setTours(response.data);
    } catch (error) {
      console.error("Lỗi khi fetch tours:", error);
    }
  };

  const itemsPerPage = 6;
  const offset = currentPage * itemsPerPage;
  const currentItems = tours.slice(offset, offset + itemsPerPage);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Fetch toàn bộ tours không filter
  const fetchTours = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tours");
      setTours(res.data);
    } catch (error) {
      console.error("Failed to fetch tours:", error);
    }
  };

  // Fetch tours theo filter
  const fetchFilteredTours = async () => {
    try {
      const params = {};
      if (filters.destinationName) params.destinationName = filters.destinationName;
      if (filters.country) params.country = filters.country;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;

      const res = await axios.get("http://localhost:8080/api/tours/search", {
        params: {
          ...params,
          page: 0,
          size: 100,
          sortBy: "price",
          sortDir: "asc",
        },
      });

      setTours(res.data);
      setCurrentPage(0);
      setShow(false); // ẩn filter panel nếu mở trên mobile
    } catch (error) {
      console.error("Failed to search tours:", error);
    }
  };

  // Khi click nút Search trên AdvanceSearch
  const handleSearch = () => {
    fetchFilteredTours();
  };

  useEffect(() => {
    document.title = "Tours";
    window.scroll(0, 0);
    fetchTours();
  }, []);

  return (
    <>
      <Breadcrumbs title="Tours" pagename="Tours" />
      <AdvanceSearch filters={filters} setFilters={setFilters} onSearch={handleSearch} />

      <section className="py-5 tour_list">
        <Container>
          <Row>
            <Col xl="3" lg="4" md="12" sm="12">
              <div className="d-lg-none d-block">
                <button className="primaryBtn mb-4" onClick={handleShow}>
                  <i className="bi bi-funnel"></i> Filters
                </button>
              </div>
              <div className="filters d-lg-block d-none">
                <Filters />
              </div>
            </Col>
            <Col xl="9" lg="8" md="12" sm="12">
              <Row>
                {currentItems.length > 0 ? (
                  currentItems.map((tour, index) => (
                    <Col
                      xl={4}
                      lg={6}
                      md={6}
                      sm={6}
                      className="mb-5"
                      key={tour.id || index}
                    >
                      <PopularCard val={tour} />
                    </Col>
                  ))
                ) : (
                  <p>Không có tour nào.</p>
                )}
              </Row>

              {tours.length > itemsPerPage && (
                <Pagination
                  pageCount={Math.ceil(tours.length / itemsPerPage)}
                  onPageChange={handlePageClick}
                />
              )}
            </Col>
          </Row>
        </Container>
      </section>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Filters />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Tours;
