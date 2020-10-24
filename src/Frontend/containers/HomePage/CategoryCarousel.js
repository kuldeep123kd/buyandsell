import React from 'react';
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';

import img1 from '../../../assets/images/sec3-crsl-kitchen-img1.png';
import img2 from '../../../assets/images/sec3-crsl-kitchen-img2.png';
import img3 from '../../../assets/images/sec3-crsl-kitchen-img3.png';
import img4 from '../../../assets/images/sec3-crsl-kitchen-img4.png';
import img5 from '../../../assets/images/sec3-crsl-kitchen-img5.png';
import img6 from '../../../assets/images/sec3-crsl-kitchen-img6.png';
import img7 from '../../../assets/images/sec3-crsl-kitchen-img7.png';
import img8 from '../../../assets/images/sec3-crsl-kitchen-img8.png';
import img9 from '../../../assets/images/sec3-crsl-kitchen-img9.png';
import img10 from '../../../assets/images/sec3-crsl-kitchen-img10.png';

const CategoryCarousel = () => {

  return (
    <>
    <OwlCarousel
      className="owl-theme"
      loop={false}
      nav={true}
      responsive={
        {0:{
          items:1
        },
        600:{
          items:3
        },
        992:{
          items:4
        },
        1200:{
          items:5
        }}
      }
      dots={false}
    >
      <div className="products">
        <Link to="/">
          <img src={img1} alt="..." />
          <h4>Top Deals</h4>
          <span>Shop Now</span>
          <p>For Kitchen</p>
        </Link>
      </div>
      <div className="products">
        <Link to="/">
          <img src={img2} alt="..." />
          <h4>Top Deals</h4>
          <span>Shop Now</span>
          <p>For Kitchen</p>
        </Link>
      </div>
      <div className="products">
        <Link to="/">
          <img src={img3} alt="..." />
          <h4>Top Deals</h4>
          <span>Shop Now</span>
          <p>For Kitchen</p>
        </Link>
      </div>
      <div className="products">
        <Link to="/">
          <img src={img4} alt="..." />
          <h4>Top Deals</h4>
          <span>Shop Now</span>
          <p>For Kitchen</p>
        </Link>
      </div>
      <div className="products">
        <Link to="/">
          <img className="products--img5" src={img5} alt="..." />
          <h4>Top Deals</h4>
          <span>Shop Now</span>
          <p>For Kitchen</p>
        </Link>
      </div>
      <div className="products">
        <Link to="/">
          <img className="products--img6" src={img6} alt="..." />
          <h4>Top Deals</h4>
          <span>Shop Now</span>
          <p>For Kitchen</p>
        </Link>
      </div>
      <div className="products">
        <Link to="/">
          <img src={img7} alt="..." />
          <h4>Top Deals</h4>
          <span>Shop Now</span>
          <p>For Kitchen</p>
        </Link>
      </div>
      <div className="products">
        <Link to="/">
          <img src={img8} alt="..." />
          <h4>Top Deals</h4>
          <span>Shop Now</span>
          <p>For Kitchen</p>
        </Link>
      </div>
      <div className="products">
        <Link to="/">
          <img src={img9} alt="..." />
          <h4>Top Deals</h4>
          <span>Shop Now</span>
          <p>For Kitchen</p>
        </Link>
      </div>
      <div className="products">
        <Link to="/">
          <img src={img10} alt="..." />
          <h4>Top Deals</h4>
          <span>Shop Now</span>
          <p>For Kitchen</p>
        </Link>
      </div>
    </OwlCarousel>
    </>
  );
};


export default CategoryCarousel;