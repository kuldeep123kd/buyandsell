import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader/SubHeader';
import Footer from '../../../components/Footer/Footer';
import './ProductDetail.scss';

const ProductDetail = () => {

  return (
    <>
    <Header />
      <SubHeader />
      <div className="product-detail">
        <div className="row">
          <div className="col-lg-5">
            <ul>
              <li>Relevance</li>
              <li>Popularity</li>
              <li>Price -- Low to High</li>
              <li>Price -- High to Low</li>
              <li>Newest First</li>
            </ul>
          </div>
          <div className="col-lg-7">
            <div>
              <span><Link to="/" >Home</Link>{">"}</span>
            </div>
            <div>
              <h1 className="product-detail-title">Acer Aspire 7 Ryzen 7 Quad Core 3750H - (8 GB/512 GB SSD/Windows 10 Home/4 GB Graphics/NVIDIA Geforce GTX 1650/60 Hz) 
                  A715-41G-R9AE Gaming Laptop  (15.6 inch, Charcoal Black, 2.15 kg)
              </h1>
              <div className="d-flex">
                <span></span>
                <span className="d-flex">
                  <span>172 Ratings</span>
                  <span>&</span>
                  <span>74 Reviews</span>
                </span>
              </div>
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
            <div>
              <div className="row">
                <div className="col-lg-3 col-md-4">
                  <h3>Delivery</h3>
                </div>
                <div className="col-lg-9 col-md-8">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Footer />
    </>
  );
}

export default ProductDetail;
