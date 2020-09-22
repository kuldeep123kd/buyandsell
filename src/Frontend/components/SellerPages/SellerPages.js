import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import SubHeader from '../Header/SubHeader/SubHeader';
import Footer from '../Footer/Footer';
import CategoryCarousel from "../../containers/HomePage/CategoryCarousel";
import './SellerPages.scss';
import ProgressLoader from '../ProgressLoader/ProgressLoader';
// import Progress from '../ProgressLoader/Progress';

const SellerPage = () => {
  return (
    <>
      {/* <Progress isAnimating={document.readyState === 'complete' ? false : true} /> */}
      <ProgressLoader />
      <Header />
      <div className="main-content">
        <SubHeader />
        <div className="sellerpage">
          <div className="container">
            <div className="sellerpage-sec1 text-center m-auto">
              <h1>
                "Since last year, my business on Buysell has grown more than 9
                times.”
              </h1>
              <Link to="/sellerform">Start Selling</Link>
              <p>It only takes 15 minutes to setup your account</p>
            </div>
            <div className="sellerpage-sec2">
              <h1>Why sell on Buysell?</h1>
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <img src="..." alt="..." />
                  <h2>E-Commerce: Your next big sales channel</h2>
                  <p>
                    Start selling on Buysell - without building a website.
                    Register now to start selling on Buysell.com.
                  </p>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <img src="..." alt="..." />
                  <h2>Reach crores of customers</h2>
                  <p>
                    Sell to crores of engaged customer visiting Buysell.com on
                    desktop and through our mobile app.
                  </p>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <img src="..." alt="..." />
                  <h2>Receive timely payments</h2>
                  <p>
                    Buysell ensures your payments for your delivered orders are
                    deposited directly in your bank account every 7 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="sellerpage-sec3 text-center">
            <img src="..." alt="..." />
          </div>
          <div className="container">
            <div className="sellerpage-sec4 text-center">
              <Link to="/sellerform">Start Selling</Link>
              <p>
                No fixed subsription fee | Pay only when your product is ordered
              </p>
              <Link to="/addproduct">Learn More about Selling on Amazon</Link>
            </div>
          </div>
          <CategoryCarousel />
          <CategoryCarousel />
        </div>
      </div>
      <Footer />
    </>
  ); 
}

export default SellerPage;