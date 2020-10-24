import React from 'react';

import { Link } from 'react-router-dom';

import Productimg from '../../../../assets/images/sec3-crsl-kitchen-img10.png';
import Productimg1 from '../../../../assets/images/sec3-crsl-kitchen-img8.png';

const SearchResults = () => {

  return (
    <div className="category-products">
      <small><Link to="/">Home</Link>{">"}</small>
      <div className="product-contents">
        <h1>Showing results</h1>
        <div className="sortby d-flex align-items-center">
          <ul className="sortby-list d-flex w-100">
            <li>Sort by</li>
            <li>Relevance</li>
            <li>Popularity</li>
            <li>Price -- Low to High</li>
            <li>Price -- High to Low</li>
            <li>Newest First</li>
          </ul>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-6 col-sm-6 col-xs-12">
            <div className="row product-clickable">
              <div className="col-lg-2">
                <div className="d-flex align-items-center justify-content-between">
                  <span>BestSeller</span>
                  <span><img src="..." alt="..." /></span>
                </div>
                <div className="product-image">
                  <img src={Productimg} width="100%" alt="img1" />
                </div>
              </div>
              <div className="col-lg-6">
                <h1 className="product-title">Acer Aspire 7 Ryzen 7 Quad Core 3750H - (8 GB/512 GB SSD/Windows 10 Home/4 GB Graphics/NVIDIA Geforce GTX 1650/60 Hz) 
                  A715-41G-R9AE Gaming Laptop  (15.6 inch, Charcoal Black, 2.15 kg)</h1>
                <div className="d-flex">
                  <span></span>
                  <span className="d-flex">
                    <span>172 Ratings</span>
                    <span>&</span>
                    <span>74 Reviews</span>
                  </span>
                </div>
                <ul className="product-features">
                  <li>Relevance</li>
                  <li>Popularity</li>
                  <li>Price -- Low to High</li>
                  <li>Price -- High to Low</li>
                  <li>Newest First</li>
                </ul>
              </div>
              <div className="col-lg-4">
                <div>
                  <h2 className="product-price">₹54,990</h2>
                  <span className="product-total-price d-flex">
                    <span>
                      ₹79,990
                    </span>
                    <span>31% off</span>
                  </span>
                  <p className="product-emi-related-info">
                    <span>
                      Upto ₹15,650 Off on Exchange
                    </span>
                    <span>
                      No cost EMI
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-6 col-sm-6 col-xs-12 product-hr">
            <div className="row product-clickable">
              <div className="col-lg-2">
                <div className="d-flex align-items-center justify-content-between">
                  <span>BestSeller</span>
                  <span><img src="..." alt="..." /></span>
                </div>
                <div className="product-image">
                  <img src={Productimg1} width="100%" alt="img2" />
                </div>
              </div>
              <div className="col-lg-6">
                <h1 className="product-title">Acer Aspire 7 Ryzen 7 Quad Core 3750H - (8 GB/512 GB SSD/Windows 10 Home/4 GB Graphics/NVIDIA Geforce GTX 1650/60 Hz) 
                  A715-41G-R9AE Gaming Laptop  (15.6 inch, Charcoal Black, 2.15 kg)</h1>
                <div className="d-flex">
                  <span></span>
                  <span className="d-flex">
                    <span>172 Ratings</span>
                    <span>&</span>
                    <span>74 Reviews</span>
                  </span>
                </div>
                <ul className="product-features">
                  <li>Relevance</li>
                  <li>Popularity</li>
                  <li>Price -- Low to High</li>
                  <li>Price -- High to Low</li>
                  <li>Newest First</li>
                </ul>
              </div>
              <div className="col-lg-4">
                <div>
                  <h2 className="product-price">₹54,990</h2>
                  <span className="product-total-price d-flex">
                    <span>
                      ₹79,990
                    </span>
                    <span>31% off</span>
                  </span>
                  <p className="product-emi-related-info">
                    <span>
                      Upto ₹15,650 Off on Exchange
                    </span>
                    <span>
                      No cost EMI
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default SearchResults;