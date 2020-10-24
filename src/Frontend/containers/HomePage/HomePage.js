import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SubHeader from '../../components/Header/SubHeader/SubHeader';
import Footer from '../../components/Footer/Footer';
import CircularProgress from '@material-ui/core/CircularProgress';
import './HomePage.scss';
import ControlledCarousel from './ControlledCarousel';
import {STATE_HANDLER} from '../../../shared/STATE_HANDLER';
import kitchenimg1 from '../../../assets/images/sec2-kitchen-img2.png';
import bottlesimg1 from '../../../assets/images/sec2-bottles-img1.png';
import laptoppcimg1 from '../../../assets/images/sec2-laptop-pc-img1.png';
import CategoryCarousel from './CategoryCarousel';
import Axios from 'axios';
import ProgressLoader from '../../components/ProgressLoader/ProgressLoader';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      isLoading: false
    };
  }

  static contextType = STATE_HANDLER;

  componentDidMount() {
    this.context.setPageTitle('Shopping Site - Buy and Sell Products');
    this.context.setPath('/');
  }

  render () {
    if (this.context.getToken()) {
      return (
        <>
          <ProgressLoader isTrue={this.state.isLoading} />
          <Header />
          <div className="main-content">
            <SubHeader />
            <div className="main">
              <section className="section1">
                <div className="sec1-carousel">
                  <div className="sec1-backimg"></div>
                  <div className="h-100">
                    <div className="w-100 h-100 sec1-carousel-pad">
                      <ControlledCarousel  />
                    </div>
                  </div>
                </div>
              </section>
              <section className="section2">
                <div className="sec2">
                  <div className="row sec2-row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                      <div className="sec2-product1">
                        <Link to="/" ><img src={kitchenimg1} alt="Kitchen" /></Link>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                      <div className="sec2-product1">
                        <Link to="/" ><img src={bottlesimg1} alt="Bottles" /></Link>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                      <div className="sec2-product1">
                        <Link to="/" ><img src={laptoppcimg1} alt="Laptops" /></Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="section3">
                <div className="sec3">
                  <div className="view-all d-flex align-items-center justify-content-between">
                    <h1>Home Appliances</h1>
                    <button>View All</button>
                  </div>
                  <hr></hr>
                  <CategoryCarousel />
                </div>
              </section>
              <section className="section3">
                <div className="sec3">
                  <div className="view-all d-flex align-items-center justify-content-between">
                    <h1>Best of Electronics</h1>
                    <button>View All</button>
                  </div>
                  <hr></hr>
                  <CategoryCarousel />
                </div>
              </section>
            </div>
          </div>
          <Footer />
        </>
      )
    }
    else if(localStorage.getItem('token') || sessionStorage.getItem('token')) {
      return (
        <div className="loader">
          <CircularProgress />
        </div>
      )
    }

    return <Redirect to={'/login'} />
  }
}

export default HomePage;