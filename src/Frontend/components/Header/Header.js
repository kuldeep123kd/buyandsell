import React from 'react';
import { Link } from 'react-router-dom';

import {Form, FormControl, Button } from 'react-bootstrap';

import SubHeader from './SubHeader/SubHeader';

import './Header.scss';

export default class Header extends React.Component {

  constructor(){
    super();

    this.state = {
      displayMenu: false,
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

  };

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }

render() {
  return (
    <>
    <div className="nav-bar d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col-sm-3 col-3 order-1 pl-0">
            <Link className="logo" to="#home">BuySell</Link>
          </div>
          <div className="col-lg-6 col-12 order-lg-2 order-3 align-self-center">
            <Form className="w-100 justify-content-center search-inp-parent" inline>
              <div className="search-inpt form-inline w-80">
                <FormControl type="text" placeholder="Search" className="mr-sm-2 inputsearch w-100" />
                <div className="prod-supl position-relative">
                  <div className="prod-supl-selected d-flex align-items-center" onClick={this.showDropdownMenu}>
                    <span className="selected-option">Products</span>
                    <i className="fa fa-chevron-down"></i>
                  </div>
                  { this.state.displayMenu ? (
                  <ul className={`prod-supl-list ${this.state.displayMenu ? "active" : "" }`}>
                    <li>Products</li>
                    <li>Suppliers</li>
                  </ul>):
                  (null)}
                </div>
                <Button className="search-btn" variant="outline-success"><i className="fa fa-search" aria-hidden="true"></i></Button>
              </div>
            </Form>
          </div>
          <div className="col-lg-4 col-9 order-lg-3 order-2 quick-options text-right pr-0">
            <div className="d-flex align-items-center justify-content-end">
              <div className="user-signupin d-flex align-items-center">
                <i className="fa fa-user-circle" aria-hidden="true"></i>
                <div className="user-signin">
                  <Link className="d-block text-left" to="/">Sign</Link>
                  <Link className="d-block text-left" to="/">Join Free</Link>
                </div>
              </div>
              {/* <Link className="text-center messages" to="/src">
                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                <span className="d-block">Messages</span>
              </Link> */}
              <Link className="text-center orders" to="/">
                <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                <span className="d-block">Orders</span>
              </Link>
              <Link to="/" className="cart">
                <div className="user-cart position-relative">
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  <div className="user-cart-items">
                    <span>0</span>
                  </div>
                </div>
                <div className="user-cart-tprice">
                  <p className="">Cart</p>
                </div>
              </Link>
            </div>
          </div>
        {/* </Navbar.Collapse> */}
        </div>
      </div>
    </div>
    <SubHeader />
    </>
  )}
}