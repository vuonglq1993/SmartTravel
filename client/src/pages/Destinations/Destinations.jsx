import React,{useEffect, useState} from 'react'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { Col, Container, Row } from 'react-bootstrap'
import { destinationsData } from '../../utils/data'
import Cards from '../../components/Cards/Cards'
import Pagination from '../../components/Pagination/Pagination'

const Destinations = () => {
  const [curentpage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const offset = curentpage * itemsPerPage;
  const currentItems = destinationsData.slice(offset, offset + itemsPerPage);
  const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
  };

  useEffect(()=>{
    document.title =" Top Places  "
    window.scroll(0, 0)
  },[])


  return (
      <>
          <Breadcrumbs title="Top Places" pagename="top-places" />
          <section className="py-5">
              <Container>
                  <Row>
                      {currentItems.map((destination, inx) => {
                          return (
                              <Col md="3" sm="6" key={inx} className="pb-4">
                                  <Cards destination={destination} key={inx} />
                              </Col>
                          );
                      })}
                  </Row>
                  <Pagination
                      pageCount={Math.ceil(
                          destinationsData.length / itemsPerPage
                      )}
                      onPageChange={handlePageClick}
                  />
              </Container>
          </section>
      </>
  );
}

export default Destinations