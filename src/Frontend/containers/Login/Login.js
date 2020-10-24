import React, { useContext } from 'react';
// import Header from '../../components/Header/Header';
// import Footer from '../../components/Footer/Footer';
import {Link,  Redirect} from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import { STATE_HANDLER } from '../../../shared/STATE_HANDLER';

const Login = () => {

  const {getToken, setPageTitle, setPath} = useContext(STATE_HANDLER)
    
  React.useEffect(() => {
    setPageTitle('Shopping Site - Buy and Sell Products | Login');
    setPath('/login');
  },[setPageTitle, setPath]);

  if(getToken() || localStorage.getItem('token')) {
      if (localStorage.getItem('token')) {
        return <Redirect to={`/`} />
      }
  }
    
  return (
    <React.Fragment>
      {/* <Header /> */}
      <div className="d-block login-container container">
        <h2 className="text-center">Login</h2>
        <p className="login-cred-small">Don't have an account ? <Link to="/signup">Signup</Link></p>
        <div className="login-main-container mt-3 no-gutters">
          <div className="login-section">
              <LoginForm />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default Login;