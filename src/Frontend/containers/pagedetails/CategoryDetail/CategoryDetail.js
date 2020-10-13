import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import SubHeader from "../../../components/Header/SubHeader/SubHeader";
import ProgressLoader from "../../../components/ProgressLoader/ProgressLoader";
import './CategoryDetail.scss';
import FilterAccordion from "./FilterAccordion";
const CategoryDetail = () => {

  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div>
      <ProgressLoader isTrue={isLoading} />
      <Header />
        <div className="main-content">
          <SubHeader />
          <div className="category-detail">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                <div className="category-filter">
                  <h1>Filters</h1>
                  <hr />
                </div>
                <div>
                  <FilterAccordion text1={'CUSTOMER RATINGS'} text2={'CUSTOMER RATINGS'} />
                  <FilterAccordion text1={'BRANDS'} text2={'BRANDS'} />
                  <FilterAccordion text1={'BRANDS'} text2={'BRANDS'} />
                  <FilterAccordion text1={'BRANDS'} text2={'BRANDS'} />
                </div>
              </div>
              <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                <div className="category-products">
                  <small><Link to="/">Home</Link>{">"}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  );
}

export default CategoryDetail;