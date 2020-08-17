import React from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import './HomePage.scss';
import ControlledCarousel1 from './ControlledCarousel1';

class HomePage extends React.Component {

  render () {
    return (
      <>
        <Header />
        <div className="main">
          <section className="section1">
            <div className="sec1-carousel">
                {/* <div className="carousel"></div> */}
              <div className="sec1-backimg"></div>
              <div className="h-100">
                {/* <div className="row"> */}
                  <div className="w-100 h-100">
                    <ControlledCarousel1  />
                  </div>
                {/* </div> */}
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </>
    )
  }
}

export default HomePage;