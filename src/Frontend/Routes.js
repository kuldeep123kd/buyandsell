import React from 'react';
import { Route, Switch } from "react-router-dom";

import ScrollToTop from './ScrollToTop';
import HomePage from '../Frontend/containers/HomePage/HomePage';

import asyncComponent from '../shared/asyncComponent';
import ProductDetail from './containers/pagedetails/ProductDetail/ProductDetail';
import SellerPages from './components/SellerPages/SellerPages';
import SellerForm from './containers/Seller/SellerForm/SellerForm';
import SellerDashboard from './containers/Seller/SellerDashboard/SellerDashboard';
import NoMatch from './components/404/404';
import AddProduct from './containers/Seller/AddProduct/AddProduct';

const asyncLogin = asyncComponent(() => {
  return import('./containers/Login/Login');
});

const asyncSignup = asyncComponent(() => {
  return import('./containers/Signup/Signup');
});

class Routes extends React.Component {

  render () {
    return (
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={asyncLogin} />
          <Route path="/signup" component={asyncSignup} />
          <Route path="/sellerpage" component={SellerPages} />
          <Route path="/sellerdashboard" component={SellerDashboard} />
          <Route path="/addproduct" component={AddProduct} />
          <Route path="/sellerform" component={SellerForm} />
          <Route path="/productdetail" component={ProductDetail} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </ScrollToTop>
    )
  }
}

export default Routes;