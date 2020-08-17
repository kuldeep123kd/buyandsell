import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Login.scss';
import {Link} from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
const Login = () => {
    return (
        <React.Fragment>
            <Header />
            <div className="d-block login-container container">
                <h2 className="text-center">Login</h2>
                <p className="login-cred-small">Don't have an account ? <Link to="/public/signup">Signup</Link></p>
                <div className="login-main-container mt-3 no-gutters">
                    <div className="login-section">
                        <LoginForm />
                    </div>
                </div>
            </div>
            {/* <BusinessHero /> */}
            <Footer />
        </React.Fragment>
    );
};

export default Login;