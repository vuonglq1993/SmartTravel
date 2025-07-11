// Tours.jsx
import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch";
import Pagination from "../../components/Pagination/Pagination";
import PopularCard from "../../components/Cards/PopularCard";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [filters, setFilters] = useState({
    destinationName: "",
    country: "",
    minPrice: "",
    maxPrice: "",
    durationDays: ""
  });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const fetchFilteredTours = async () => {
    try {
      const params = {};
      if (filters.destinationName.trim()) params.destinationName = filters.destinationName.trim();
      if (filters.country.trim()) params.country = filters.country.trim();
      if (filters.minPrice !== "" && !isNaN(filters.minPrice)) params.minPrice = parseFloat(filters.minPrice);
      if (filters.maxPrice !== "" && !isNaN(filters.maxPrice)) params.maxPrice = parseFloat(filters.maxPrice);
      if (filters.durationDays !== "" && !isNaN(filters.durationDays)) params.durationDays = parseInt(filters.durationDays);
      params.page = 0;
      params.size = 100;
      params.sortBy = "price";
      params.sortDir = "asc";

      const res = await axios.get("http://localhost:8080/api/tours/search", { params });
      setTours(res.data);
      setCurrentPage(0);
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };

  const fetchAll = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tours");
      setTours(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSearch = () => fetchFilteredTours();
  const currentItems = tours.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <>
      <Breadcrumbs title="Tours" pagename="Tours" />
      <AdvanceSearch filters={filters} setFilters={setFilters} onSearch={handleSearch} />
      <Container className="pt-4">
        <Row>
          {currentItems.length
            ? currentItems.map((t) => (
                <Col key={t.id} xl={4} lg={6} md={6} sm={6} className="mb-4">
                  <PopularCard val={t} />
                </Col>
              ))
            : <p>No tours found</p>}
        </Row>
        {tours.length > itemsPerPage && (
          <Pagination
            pageCount={Math.ceil(tours.length / itemsPerPage)}
            onPageChange={handlePageClick}
          />
        )}
      </Container>
    </>
  );
};

export default Tours;
