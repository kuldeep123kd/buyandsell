import React from "react";
import Axios from "axios";
import Header from "../../components/Header/Header";
import SubHeader from "../../components/Header/SubHeader/SubHeader";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import ProgressLoader from "../../components/ProgressLoader/ProgressLoader";

const UserProfile = () => {
  const tk = localStorage.getItem("token");

  const sendLink = () => {
    Axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_API_KEY}`,
      {
        requestType: "VERIFY_EMAIL",
        idToken: tk,
      }
    )
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };

  return (
    <>
      <ProgressLoader />
      <Header />
      <div className="main-content">
        <SubHeader />
        <div className="accountsettings">
          <div className="email-verify">
            <h1>Verify Email</h1>
            <button type="button" onClick={sendLink}>
              Send
            </button>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <Link to="/yourorders">
                  <img src="..." alt="..." />
                  <div>
                    <h1>Your Orders</h1>
                    <p>Track, return or buy things again</p>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <Link to="/youraccount/loginsettings">
                  <img src="..." alt="..." />
                  <div>
                    <h1>Login and security</h1>
                    <p>Edit login, name, and mobile number</p>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <Link to="/youraccount/addresses">
                  <img src="..." alt="..." />
                  <div>
                    <h1>Your Addresses</h1>
                    <p>Edit addresses for orders and gifts</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
