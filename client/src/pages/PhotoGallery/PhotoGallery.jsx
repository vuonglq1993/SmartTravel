import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Gallery from "../../components/Gallery/Gallery";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const PhotoGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    document.title = "Gallery";
    window.scrollTo(0, 0);

    // ⚠️ fetch từ backend Spring Boot
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
      <Breadcrumbs title="Gallery" pagename="Gallery" />
      <section className="py-5" style={{ overflow: "hidden" }}>
        <Container>
          <Row>
            <Col>
              <Gallery images={images} />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PhotoGallery;