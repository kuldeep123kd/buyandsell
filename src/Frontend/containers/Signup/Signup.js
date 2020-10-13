import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import SignupForm from '../../components/SignupForm/SignupForm';

import { STATE_HANDLER } from '../../../shared/STATE_HANDLER'

const Signup = () => {

  const {getToken} = React.useContext(STATE_HANDLER)

  // const email = localStorage.getItem('email')
  

  if(getToken() || localStorage.getItem('token')) {
    if (localStorage.getItem('token')) {
      return <Redirect to={`/`} />
    }
  }
  // main signup page
  return (
  <React.Fragment>
    <div className="d-block login-container container">
      <h2 className="text-center">Sign up for a new account</h2>
      <p className="login-cred-small">Already have an account ? <Link to="/login">Login</Link></p>
      <div className="login-main-container mt-3 no-gutters">
        <div className="login-section">
          <SignupForm />
        </div>
      </div>
    </div>
  </React.Fragment>
  );
};

export default Signup;