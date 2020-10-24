import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import SubHeader from "../../../components/Header/SubHeader/SubHeader";
import ProgressLoader from "../../../components/ProgressLoader/ProgressLoader";
import './CategoryDetail.scss';
import ClickedResults from "./ClickedResults";
import FilterAccordion from "./FilterAccordion";
import SearchResults from "./SearchResults";


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
              <div className="col-xl-2 col-lg-3 col-md-12 col-sm-12 col-xs-12">
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
              <div className="col-xl-10 col-lg-9 col-md-12 col-sm-12 col-xs-12">
                <SearchResults />
                {/* <ClickedResults /> */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  );
}

export default CategoryDetail;