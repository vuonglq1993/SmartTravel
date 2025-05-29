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

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const offset = currentPage * itemsPerPage;
  const currentItems = tours.slice(offset, offset + itemsPerPage);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Fetch toàn bộ tours từ backend
  const fetchTours = async () => {
    try {
      const res = await axios.get("localhost:8080/api/tours");
      setTours(res.data);
    } catch (error) {
      console.error("Failed to fetch tours:", error);
    }
  };

  useEffect(() => {
    document.title = "Tours";
    window.scroll(0, 0);
    fetchTours();
  }, []);

  return (
    <>
      <Breadcrumbs title="Tours" pagename="Tours" />
      <AdvanceSearch />
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
