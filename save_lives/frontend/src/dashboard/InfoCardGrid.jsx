
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Pagination from "react-js-pagination";


import Card from './InfoCard';


  const products = [
    "Product 1",
    "Product 2",
    "Product 3",
    "Product 4",
    "Product 5",
    "Product 6",
    "Product 7",
    "Product 8",
    "Product 9",
    "Product 10",
    "Product 11",
    "Product 11",
    "Product 11",
    "Product 11",
    "Product 11",
    "Product 11",
    "Product 11",
    "Product 11",
    "Product 11",
    "Product 11",
    "Product 11",
    "Product 11",
    "Product 12",
  ];


const Grid = () => {
  const [activePage, setActivePage] = useState(1);
  // const [products, setProducts] = useState([]);

  
  const productsPerPage = 6; // Display 9 products per page (3 rows of 3)
  const pagesVisited = (activePage - 1) * productsPerPage;
  const displayedProducts = products.slice(pagesVisited, pagesVisited + productsPerPage);
  const pageCount = Math.ceil(products.length / productsPerPage);


  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
  };


  const chunkArray = (myArray, chunk_size) => {
    let results = [];
    for (let i = 0; i < myArray.length; i += chunk_size) {
      results.push(myArray.slice(i, i + chunk_size));
    }
    return results;
  };


  return (
    <Container>
      {chunkArray(displayedProducts, 3).map((productRow, rowIndex) => (
        <Row key={rowIndex}>
          {productRow.map((product, index) => (
            <Col lg={3} key={index} style={{margin: '35px'}}>
              <Card />
            </Col>
          ))}
        </Row>
      ))}
      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={productsPerPage}
        totalItemsCount={products.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
      </div>
    </Container>
  );
};

export default Grid;
