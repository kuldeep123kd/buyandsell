import React from 'react';

import { Link } from 'react-router-dom';

const ClickedResults = () => {

  return (
    <div className="category-products">
      <small><Link to="/">Home</Link>{">"}</small>
      <div className="product-contents">
        <h1>Showing results</h1>
        <div>
          <h2>Sort By</h2>
          <ul className="d-flex">
            <li>Relevance</li>
            <li>Popularity</li>
            <li>Price -- Low to High</li>
            <li>Price -- High to Low</li>
            <li>Newest First</li>
          </ul>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <ul>
              <li>Relevance</li>
              <li>Popularity</li>
              <li>Price -- Low to High</li>
              <li>Price -- High to Low</li>
              <li>Newest First</li>
            </ul>
          </div>
          <div className="col-lg-6">
            <ul>
              <li>Relevance</li>
              <li>Popularity</li>
              <li>Price -- Low to High</li>
              <li>Price -- High to Low</li>
              <li>Newest First</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <ul>
              <li>Relevance</li>
              <li>Popularity</li>
              <li>Price -- Low to High</li>
              <li>Price -- High to Low</li>
              <li>Newest First</li>
            </ul>
          </div>
          <div className="col-lg-6">
            <ul>
              <li>Relevance</li>
              <li>Popularity</li>
              <li>Price -- Low to High</li>
              <li>Price -- High to Low</li>
              <li>Newest First</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClickedResults;