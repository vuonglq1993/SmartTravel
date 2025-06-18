import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { Col, Container, Row } from "react-bootstrap";
import Cards from "../../components/Cards/Cards";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";

const Destinations = () => {
    const [tours, setTours] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 6;
    const offset = currentPage * itemsPerPage;
    const currentItems = tours.slice(offset, offset + itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const fetchTours = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/tours");
            setTours(res.data);
        } catch (error) {
            console.error("Failed to fetch tours:", error);
        }
    };

    useEffect(() => {
        document.title = "Top Places";
        window.scrollTo(0, 0);
        fetchTours();
    }, []);

    return (
        <>
            <Breadcrumbs title="Top Places" pagename="top-places" />
            <section className="py-5">
                <Container>
                    <Row>
                        <Row>
                            {currentItems.map((tour, index) => (
                                <Col md="4" sm="6" key={index} className="pb-4">
                                    <Cards
                                        key={index}
                                        id={tour.id}
                                        destination={{
                                            name: tour.destination?.name?.trim(),
                                            imageUrl: tour.destination?.imageUrl,
                                        }}
                                        rating={tour.averageRating}
                                    />
                                </Col>
                            ))}
                        </Row>

                    </Row>
                    <Pagination
                        pageCount={Math.ceil(tours.length / itemsPerPage)}
                        onPageChange={handlePageClick}
                    />
                </Container>
            </section>
        </>
    );
};

export default Destinations;
