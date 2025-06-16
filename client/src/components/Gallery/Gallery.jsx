import React from "react";
import { Row, Col, Image } from "react-bootstrap";

const Gallery = ({ images }) => {
  if (!images || images.length === 0) return <p>No images to display.</p>;

  return (
    <Row>
      {images.map((img, index) => (
        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Image
            src={img.url}
            alt={`Gallery image ${index}`}
            thumbnail
            fluid
          />
        </Col>
      ))}
    </Row>
  );
};

export default Gallery;
