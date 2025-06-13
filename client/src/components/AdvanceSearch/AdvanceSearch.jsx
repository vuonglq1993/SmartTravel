import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../AdvanceSearch/search.css";
const AdvanceSearch = ({ filters, setFilters, onSearch }) => {
  return (
    <section className="box-search-advance">
      <Container>
        <Row>
          <Col md={12} xs={12}>
            <div className="box-search shadow-sm p-3 d-flex flex-wrap align-items-center gap-3">
              <Form.Control
                type="text"
                placeholder="Destination Name"
                value={filters.destinationName || ""}
                onChange={(e) =>
                  setFilters({ ...filters, destinationName: e.target.value })
                }
                style={{ maxWidth: 250 }}
              />
              <Form.Control
                type="text"
                placeholder="Country"
                value={filters.country || ""}
                onChange={(e) =>
                  setFilters({ ...filters, country: e.target.value })
                }
                style={{ maxWidth: 250 }}
              />
              <Form.Control
                type="number"
                placeholder="Min Price"
                value={filters.minPrice || ""}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
                style={{ maxWidth: 150 }}
                min={0}
              />
              <Form.Control
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice || ""}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
                style={{ maxWidth: 150 }}
                min={0}
              />
              <Button
                variant="primary"
                onClick={onSearch}
                className="ms-auto"
                style={{ minWidth: 120 }}
              >
                <i className="bi bi-search me-2"></i> Search
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AdvanceSearch;
