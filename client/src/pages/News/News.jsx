import React, { useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { Container, Row } from "react-bootstrap";
import "../About/about.css";
import img01 from "../../assets/images/new/01.jpg";
import img04 from "../../assets/images/new/04.jpg";
import img08 from "../../assets/images/new/08.jpg";

const News = () => {
    const articles = [
        {
            id: 1,
            title: "Travel Guide Bali",
            img: img01,
            link: "https://www.travelandleisure.com/travel-guide/bali",
            desc: "Check out this travel guide for Bali on Travel & Leisure ",
        },
        {
            id: 2,
            title: "The Best (and Worst) Times to Visit Vietnam, According to Experts",
            img: img04,
            link: "https://www.travelandleisure.com/best-times-to-visit-vietnam-8546761",
            desc: "Here's when to visit Vietnam for sunny weather, lower prices, and excellent sightseeing",
        },
        {
            id: 3,
            title: "Ideal destinations to enjoy autumn in Northern Việt Nam",
            img: img08,
            link: "https://vietnamnews.vn/travel/1661738/ideal-destinations-to-enjoy-autumn-in-northern-viet-nam.html",
            desc: "From plains to high mountains or to the sea - Hà Nội, Kim Bôi (Hòa Bình), Sa Pa (Lào Cai) and Hạ Long (Quảng Ninh), the seasonal change from summer to autumn is the best time to explore destinations in Northern Việt Nam.",
        },
        {
            id: 4,
            title: "Khuôn Thần Lake to be awakened to develop Bắc Giang tourism",
            img: img08,
            link: "https://vietnamnews.vn/travel/1661738/ideal-destinations-to-enjoy-autumn-in-northern-viet-nam.html",
            desc: "Bắc Giang is a mountainous region rich in natural beauty and tourism potential.",
        },
        {
            id: 5,
            title: "11 Best Cities to Visit in Italy, According to a Local",
            img: "https://www.travelandleisure.com/thmb/K6AWXlwazUT6rfAEd8As0pCP5So=/1750x874/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/TAL-florence-ITCITIES0924-6aada9377bca4896a4338ab8950cca39.jpg",
            link: "https://www.travelandleisure.com/cities-in-italy-8708839",
            desc: "Everyone should visit these essential Italian cities at least once in their lifetime.",
        },
        {
            id: 6,
            title: "This 34-mile Scenic Highway Is One of the Best Places to See Fall Foliage in the U.S.",
            img: "https://www.travelandleisure.com/thmb/vqnngm5O1qulAgPTYbtgNJWkD98=/1750x874/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/TAL-kancamagus-highway-new-hampshire-FALLHIGHWAY0824-7253d47f3beb46d2a6b3dfbdee60eb68.jpg",
            link: "https://www.travelandleisure.com/kancamagus-highway-new-hampshire-scenic-fall-foliage-route-8703554",
            desc: "The fall colors on the Kancamagus Highway in New Hampshire have to be seen to be believed.",
        },
    ];
    useEffect(() => {
        document.title = "News";
        window.scroll(0, 0);
    }, []);

    return (
        <>
            <Breadcrumbs title="Travel News" pagename="News" />
            <section className="py-5">
                <Container>
                    <h1 className="h1 my-4">Latest Travel News</h1>

                    <Row>
                        {articles.map((article) => (
                            <div
                                className="col-md-4 d-flex align-items-stretch pb-5"
                                key={article.id}
                            >
                                {" "}
                                <div className="card mb-4 d-flex flex-column h-100">
                                    {" "}
                                    <img
                                        src={article.img}
                                        className="card-img-top img-fluid"
                                        alt={article.title}
                                    />{" "}
                                    <div className="card-body flex-grow-1">
                                        <h5 className="card-title">
                                            {article.title}
                                        </h5>
                                        <p className="card-text">
                                            {article.desc}
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <a
                                            href={article.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary w-33.3"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default News;
