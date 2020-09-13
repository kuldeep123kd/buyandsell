import React, { useContext } from 'react';
// import Header from '../../components/Header/Header';
// import Footer from '../../components/Footer/Footer';
import {Link,  Redirect} from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import { TOKEN_HANDLER } from '../../../shared/TOKEN_HANDLER';

const Login = () => {


  const {getToken} = useContext(TOKEN_HANDLER)

    // const email = localStorage.getItem('email')
    

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