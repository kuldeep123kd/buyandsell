import React from 'react';
import {Carousel} from 'react-bootstrap';

import chimney from '../../../assets/images/chimney.png';
import laptoppc from '../../../assets/images/laptop-pc.png';
import refrigerator from '../../../assets/images/refrigerator.png';
import toaster from '../../../assets/images/multipurpose-toaster.jpg';



export default  function ControlledCarousel() {
  const [index, setIndex] = React.useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <div className="row">
          <div className="col-6 align-self-center">
            <div className="carousel-imgs">
            <img
              className="d-block w-100"
              src={laptoppc}
              alt="First slide"
            />
            </div>
            
          </div>
          <div className="col-6 align-self-center">
            <div className="laptop-pc">
              <h1>THE ULTIMATE NOTEBOOKS GAMING PLATFORM</h1>
              <p>Get Game Ready with GeForce® RTX. <br></br>FASTEST 120HZ/5MS DISPLAY</p>
              <p>Cooler boost Dual Cooling System</p>
            </div>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="row">
          <div className="col-6 align-self-center">
            <div className="carousel-imgs">
            <img
              className="d-block w-100"
              src={chimney}
              alt="First slide"
            />
            </div>
            
          </div>
          <div className="col-6 align-self-center">
            <div className="chimney">
              <h1>Elica 60 cm 880 m3/hr Chimney</h1>
              <p>(Strip CF 60 Nero, 2 Cassette Filters, Black) <br></br>₹ 4,799.00</p>
            </div>
          </div>
            
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="row">
        <div className="col-6 align-self-center">
            <div className="carousel-imgs">
            <img
              className="d-block w-100"
              src={refrigerator}
              alt="First slide"
            />
            </div>
            
          </div>
          <div className="col-6 align-self-center">
            <div className="refrigerator">
              <h1>Red Godrej Double Door Refrigerator</h1>
              <p>(290 ltr) <br></br>₹ 24,990</p>
            </div>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="row">
        <div className="col-6 align-self-center">
            <div className="carousel-imgs">
            <img
              className="d-block w-100"
              src={toaster}
              alt="First slide"
            />
            </div>
            
          </div>
          <div className="col-6 align-self-center">
            <div className="toaster">
              <h1>Multipurpose Toaster</h1>
              {/* <p>(Strip CF 60 Nero, 2 Cassette Filters, Black) <br></br>₹ 4,799.00</p> */}
            </div>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}
