import React from 'react';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader/SubHeader';


const SellerDashboard = () => {



  return(
    <>
    <Header />
      <div className="main-content">
        <SubHeader />
        <div className="seller-dashboard">
          <h1>Hello There</h1>
        </div>
      </div>
    <Footer />
    </>
  );
}

export default SellerDashboard;