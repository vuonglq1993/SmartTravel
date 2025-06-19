import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../AdvanceSearch/search.css";

const AdvanceSearch = ({ filters, setFilters, onSearch }) => {
  const handleChange = (field, value) => {
    // Ép kiểu number nếu là min/max price
    if (field === "minPrice" || field === "maxPrice") {
      const parsed = value ? parseFloat(value) : undefined;
      setFilters((prev) => ({ ...prev, [field]: isNaN(parsed) ? undefined : parsed }));
    } else {
      setFilters((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(); // Gọi API tìm kiếm sau khi người dùng ấn nút
  };

  return (
    <section className="box-search-advance">
      <Container>
        <Row>
          <Col md={12} xs={12}>
            <Form onSubmit={handleSubmit}>
              <div className="box-search shadow-sm p-3 d-flex flex-wrap align-items-center gap-3">
                
                <Form.Control
                  type="text"
                  placeholder="Destination Name"
                  value={filters.destinationName || ""}
                  onChange={(e) => handleChange("destinationName", e.target.value)}
                  style={{ maxWidth: 200 }}
                />
                <Form.Control
                  type="text"
                  placeholder="Country"
                  value={filters.country || ""}
                  onChange={(e) => handleChange("country", e.target.value)}
                  style={{ maxWidth: 200 }}
                />
                <Form.Control
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice ?? ""}
                  onChange={(e) => handleChange("minPrice", e.target.value)}
                  style={{ maxWidth: 150 }}
                  min={0}
                />
                <Form.Control
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice ?? ""}
                  onChange={(e) => handleChange("maxPrice", e.target.value)}
                  style={{ maxWidth: 150 }}
                  min={0}
                />
                <Form.Control
  type="number"
  placeholder="Duration (days)"
  value={filters.durationDays || ""}
  onChange={(e) =>
    setFilters(prev => ({ ...prev, durationDays: e.target.value }))
  }
  style={{ maxWidth: 150 }}
  min={1}
/>
                <Button
                  type="submit"
                  variant="primary"
                  className="ms-auto"
                  style={{ minWidth: 120 }}
                >
                  <i className="bi bi-search me-2"></i> Search
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AdvanceSearch;
