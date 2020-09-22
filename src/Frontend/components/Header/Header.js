import React from 'react';
import { Link } from 'react-router-dom';

import {Form, FormControl, Button } from 'react-bootstrap';

import { TOKEN_HANDLER } from '../../../shared/TOKEN_HANDLER';
import './Header.scss';

export default class Header extends React.Component {

  constructor(){
    super();
    this.state = {
      displayMenu: false,
      displayUser: false,
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    this.showUserDropdownMenu = this.showUserDropdownMenu.bind(this);
    this.hideUserDropdownMenu = this.hideUserDropdownMenu.bind(this);
    this.showJoinDropdownMenu = this.showJoinDropdownMenu.bind(this);
    this.hideJoinDropdownMenu = this.hideJoinDropdownMenu.bind(this);

  };

  static contextType = TOKEN_HANDLER;

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

  showUserDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayUser: true }, () => {
    document.addEventListener('click', this.hideUserDropdownMenu);
    });
  }

  hideUserDropdownMenu() {
    this.setState({ displayUser: false }, () => {
      document.removeEventListener('click', this.hideUserDropdownMenu);
    });
  }

  showJoinDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayJoin: true }, () => {
    document.addEventListener('click', this.hideJoinDropdownMenu);
    });
  }

  hideJoinDropdownMenu() {
    this.setState({ displayJoin: false }, () => {
      document.removeEventListener('click', this.hideJoinDropdownMenu);
    });
  }

  // resetPassword() {
  //   const useremail = localStorage.getItem("userEmail");
  //   if(this.context.getToken() || localStorage.getItem("token")) {
  //     axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_API_KEY}`,{
  //       requestType:"PASSWORD_RESET",email: useremail
  //     }).then(resp => {
  //       console.log(resp);
  //     }).catch(err => {
  //       console.log(err);
  //     })
  //   }
  // }

render() {
  return (
    <>
    <div className="nav-bar d-flex align-items-center" id="top-nav-bar">
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col-sm-3 col-3 order-1 pl-0  search-inp-parent d-flex">
            <div className="burger-cat h-100 d-flex align-items-center justify-content-start" >
              <div className="burger">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <Link className="logo" to="/">BuySell</Link>
          </div>
          <div className="col-lg-6 col-12 order-lg-2 order-3 align-self-center search-burger">
          <div className="categories">
            <div className="burger-cat h-100 d-flex align-items-center justify-content-start" onClick={this.context.showCat} >
              <div className="burger">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
            <Form className="w-100 justify-content-center" inline>
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
          <div className="col-lg-4 col-9 order-lg-3 order-2 quick-options text-right pr-0  search-inp-parent">
            <div className="d-flex align-items-center justify-content-end">
              <div className="user-signupin d-flex align-items-center">
                {(this.context.getToken()) ? (null) : (<i className="fa fa-user-circle" aria-hidden="true"></i>)}
                {
                  (this.context.getToken()) ? (
                    <div className="user-signin">
                      <span className="d-block text-left" onClick={this.showUserDropdownMenu}><i className="fa fa-user-circle" aria-hidden="true"></i>User</span>
                      { this.state.displayUser ? (
                        <ul className={`prod-supl-list ${this.state.displayUser ? "active" : "" }`}>
                          <li className="join-service"><Link to="/youraccount" className="d-block text-left" >Your Account</Link></li>
                          <li>Your Orders</li>
                          {/* <li onClick={() => this.resetPassword()}>Reset Password</li> */}
                          <li className="join-service"><Link className="d-block text-left" to="/sellerpage">Your Seller Account</Link></li>
                          <li><div onClick={this.context.DeleteToken}>Logout</div></li>
                        </ul>):
                        (null)}
                    </div>
                  )
                  :
                  (
                    <div className="user-signin">
                      <Link className="d-block text-left" to="/login">Sign</Link>
                      <span className="d-block text-left" onClick={this.showJoinDropdownMenu} >Join Free</span>
                      { this.state.displayJoin ? (
                        <ul className={`prod-supl-list prod-supl-list1 ${this.state.displayJoin ? "active" : "" }`}>
                          <li className="join-service"><Link className="d-block text-left" to="/signup">SignUp</Link></li>
                          <li>Your Account</li>
                          <li>Your Orders</li>
                          <li className="join-service"><Link className="d-block text-left" to="/sellerpage">Your Seller Account</Link></li>
                          {/* <li><div onClick={this.context.DeleteToken}>Logout</div></li> */}
                        </ul>):
                        (null)}
                    </div>
                  )
                }
                
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
        </div>
      </div>
      <div className="mob-sidebar">
        <div>
          
        </div>
      </div>
    </div>
    </>
  )}
}