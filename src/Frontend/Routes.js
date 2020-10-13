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
import AccountSettings from './containers/UserProfile/AccountSettings/AccountSettings';
import Verification from './containers/UserProfile/Verification/Verification';
import Progress from "./components/ProgressLoader/Progress";
import UserProfile from "./containers/UserProfile/UserProfile";
import LoginSettings from "./containers/UserProfile/LoginSettings/LoginSettings";
import CategoryDetail from './containers/pagedetails/CategoryDetail/CategoryDetail';

const asyncLogin = asyncComponent(() => {
  return import('./containers/Login/Login');
});

const asyncSignup = asyncComponent(() => {
  return import('./containers/Signup/Signup');
});

const Routes = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  window.onload = function () {
    setIsLoading(false);
  };

  return (
    <ScrollToTop>
      <Progress isAnimating={isLoading} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={asyncLogin} />
        <Route path="/signup" component={asyncSignup} />
        <Route path="/sellerpage" component={SellerPages} />
        <Route path="/sellerdashboard" component={SellerDashboard} />
        <Route path="/addproduct" component={AddProduct} />
        <Route path="/sellerform" component={SellerForm} />
        <Route path="/productdetail" component={ProductDetail} />
        <Route path="/accountsettings" component={AccountSettings} />
        <Route exact path="/verification" component={Verification} />
        <Route path="/youraccount/loginsettings" component={LoginSettings} />
        <Route path="/youraccount" component={UserProfile} />
        <Route path="/categorydetail" component={CategoryDetail} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </ScrollToTop>
  );
};

export default Routes;