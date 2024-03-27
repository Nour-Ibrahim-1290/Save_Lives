import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Select from 'react-select';
import Pagination from "react-js-pagination";
import axios from 'axios';

import Card from './InfoCard';

const GridReciever = () => {
  const [activePage, setActivePage] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [products, setProducts] = useState([]);

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

  const options = [
    { value: 'O-', label: 'O-' },
    { value: 'O+', label: 'O+' },
    { value: 'A-', label: 'A-' },
    { value: 'A+', label: 'A+' },
    { value: 'B-', label: 'B-' },
    { value: 'B+', label: 'B+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'AB+', label: 'AB+' },
  ];
  
  const customStyles = {
    control: (provided) => ({
      ...provided,
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isHovered ? '#ff2222' : provided.color,
      fontWeight: state.isHovered ? 'bold' : provided.fontWeight,
      fontSize: state.isHovered ? '20px' : provided.fontSize,
    }),
  };

  const handleSearchClick = async () => {
    console.log('handleSearchClick');
    console.log(selectedOption);
    if (selectedOption) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.post('http://localhost:8000/asks/filter/', {
          blood_type: selectedOption.value
        }, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log('Respond of Filter....');
        console.log(response);
        console.log('Response Data:');
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    }
  };

  return (
    <Container>
      <div className="request-blood">
        <h3>Which Blood type you need donation for?</h3>
        <Select className='request-blood-select' options={options} styles={customStyles} onChange={setSelectedOption} />
        <button className="request-search-btn" onClick={handleSearchClick}>Search</button>
      </div>
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
}
export default GridReciever;