import React from 'react';
// import Header from '../../components/Header/Header';
// import Footer from '../../components/Footer/Footer';
import {Link} from 'react-router-dom';
import SignupForm from '../../components/SignupForm/SignupForm';

const Signup = () => {
  // main signup page
  return (
  <React.Fragment>
    {/* <Header /> */}
    <div className="d-block login-container container">
      <h2 className="text-center">Sign up for a new account</h2>
      <p className="login-cred-small">Already have an account ? <Link to="/login">Login</Link></p>
      <div className="login-main-container mt-3 no-gutters">
        <div className="login-section">
          <SignupForm />
        </div>
      </div>
    </div>
    {/* <Footer /> */}
  </React.Fragment>
  );
};

export default Signup;