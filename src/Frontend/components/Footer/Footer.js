import React from 'react';
import { Link } from 'react-router-dom';

// import '../../../assets/css/main.css';
import cardlogo1 from '../../../assets/images/logos_1.png';
import cardlogo2 from '../../../assets/images/logos_2.png';
import cardlogo3 from '../../../assets/images/logos_3.png';
import cardlogo4 from '../../../assets/images/logos_4.png';
import './Footer.scss';

/* *** Footer *** */

const Footer = () => {
  return ( 
    <footer className="footer">
      <div className="container">
        <Link className="navbar-brand" to="/" rel="noopener noreferrer">BuySell</Link>
        <div className="row m-0 foot-pad-top">
          <div className="col-sm-12 p-0">
            <div className="row m-0">
              <div className="col-sm-5 p-0">
                <div className="row m-0">
                  <div className="col foot-cont-heading-parent p-0">
                    <h1 className="foot-cont-heading">About</h1>
                    <div>
                      <Link rel="noopener noreferrer" to="/">About Us</Link>
                      <Link rel="noopener noreferrer" to="/">Jobs</Link>
                      <Link rel="noopener noreferrer" to="/">Contact</Link>
                      <Link rel="noopener noreferrer" to="/public/blog">Blog</Link>
                      <Link rel="noopener noreferrer" to="/">Press</Link>
                    </div>
                  </div>
                  <div className="col foot-cont-heading-parent p-0">
                    <h1 className="foot-cont-heading">Customer Services</h1>
                    <div>
                      <Link rel="noopener noreferrer" to="/">Contact Us</Link>
                      <Link rel="noopener noreferrer" to="/public/support">Help Center</Link>
                      <Link rel="noopener noreferrer" to="/">Policies & Rules</Link>
                      <Link rel="noopener noreferrer" to="/">Report Abuse</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-5 p-0">
                <div className="row m-0">
                  <div className="col foot-cont-heading-parent p-0">
                    <h1 className="foot-cont-heading">Buy</h1>
                    <div>
                      <Link rel="noopener noreferrer" to="/business">All Categories</Link>
                      {/* <Link rel="noopener noreferrer" to="/">Request for Quotation</Link> */}
                      <Link rel="noopener noreferrer" to="/">Ready to Ship</Link>
                    </div>    
                  </div>
                  <div className="col foot-cont-heading-parent p-0">
                    <h1 className="foot-cont-heading">Sell</h1>
                    <div>
                      <Link rel="noopener noreferrer" to="/sellerpage">Supplier Memberships</Link>
                      {/* <Link rel="noopener noreferrer" to="/">Learning Center</Link> */}
                      <Link rel="noopener noreferrer" to="/">Partner Program</Link>
                    </div> 
                  </div>
                </div>
              </div>
              <div className="col-sm-2 p-0">
                <div className="row m-0">
                  {/* <div className="col foot-cont-heading-parent p-0">
                    <h1 className="foot-cont-heading">Trade Services</h1>
                    <div>
                      <Link rel="noopener noreferrer" to="/">Trade Assurance</Link>
                      <Link rel="noopener noreferrer" to="/">Business Identity</Link>
                      <Link rel="noopener noreferrer" to="/">Logistics Service</Link>
                      <Link rel="noopener noreferrer" to="/">Pay Later</Link>
                      <Link rel="noopener noreferrer" to="/">Payment Terms</Link>
                    </div>    
                  </div> */}
                  <div className="col foot-cont-heading-parent p-0">
                    <h1 className="foot-cont-heading">Follow us on</h1>
                    <div className="social-media-icons">
                      <Link rel="noopener noreferrer" to="/"><i className="fab fa-facebook-f" aria-hidden="true"></i></Link>
                      <Link rel="noopener noreferrer" to="/"><i className="fab fa-twitter" aria-hidden="true"></i></Link>
                      <Link rel="noopener noreferrer" to="/"><i className="fab fa-instagram" aria-hidden="true"></i></Link>
                      <Link rel="noopener noreferrer" to="/"><i className="fab fa-linkedin-in" aria-hidden="true"></i></Link>
                      <Link rel="noopener noreferrer" to="/"><i className="fab fa-youtube" aria-hidden="true"></i></Link>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-start flex-row w-100">
            <div className="text-center privacy-tc">
              <p className="privacy-tc-child"> &copy; {(new Date().getFullYear())} BuySell, All rights reserved</p>
            </div>
            <div className="logos ml-sm-auto">
              <ul className="logos_list">
                <li><Link to="/"><img src={cardlogo1} alt="..." /></Link></li>
                <li><Link to="/"><img src={cardlogo2} alt="..." /></Link></li>
                <li><Link to="/"><img src={cardlogo3} alt="..." /></Link></li>
                <li><Link to="/"><img src={cardlogo4} alt="..." /></Link></li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;