import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Gallery from "../../components/Gallery/Gallery";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const PhotoGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Set page title and scroll to top
    document.title = "Gallery";
    window.scrollTo(0, 0);

    // Fetch image data from backend (Spring Boot)
    fetch("http://localhost:8080/api/images")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch images");
        return res.json();
      })
      .then((data) => setImages(data))
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  return (
    <>
      {/* Breadcrumb navigation */}
      <Breadcrumbs title="Gallery" pagename="Gallery" />

      {/* Image gallery section */}
      <section className="py-5" style={{ overflow: "hidden" }}>
        <Container>
          <Row>
            <Col>
              {/* Render the gallery with fetched images */}
              <Gallery images={images} />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PhotoGallery;
