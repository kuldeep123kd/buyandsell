import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {ThemeProvider} from '@material-ui/core/styles';
import './LoginForm.scss';
import { Link, Redirect } from 'react-router-dom';
// import axios from 'axios'
// import {BASEURL} from '../../../../shared/BASEURL';
import {THEME, labelProps, inputProps} from '../../../shared/THEME';
// import {TOKEN_HANDLER} from '../../../../shared/TOKEN_HANDLER';

const initialState = {
    email: '',
    password: '',
    rememberMe: false,
    error: null,
    redirect: false,
}
const LoginForm = (props) => {
    const [login,setLogin] = useState(initialState);

    // const {ModifyToken,getToken} = React.useContext(TOKEN_HANDLER)

    React.useEffect(()=>{
        // const token = getToken()
        // if (token) {
            setLogin({...login,redirect: true});
        // }
    },[]);

    const formSubmit = (e) => {
        // e.preventDefault();
        // // console.log(`${BASEURL}/api/token/`)
        // // console.log(login);
        // axios.post(`${BASEURL}/api/token/`,login)
        // .then(resp => {
        //     // console.log(resp);
        //     if (resp.status === 200) {
        //         const token = resp.data?.
        //         // console.log(token);
        //         // ModifyToken(token)
        //         setLogin(initialState);
        //         setLogin({...login,redirect: true})
        //         // localStorage.setItem("session_start",new Date())
        //     }
        // })
        // .catch(err => {
        //     // console.log(err.response?.status)
        //     if(err.response?.data?.detail === "No active account found with the given credentials") {
        //         setLogin({...login,error: true});
        //     }
        // })
        setLogin(initialState);
        setLogin({...login,redirect: true})
    }
    const RaiseError = () => {
        if (login.error){
            return (
                <small className="login-error">Invalid credentials entered</small>
            )
        }
    }

    const red = () => {
        if (login.redirect) {
            // return <Redirect to="/public/userprofile" />
        }
    }

    return (
        <React.Fragment>
            {red()}
            {/* <p className="login-cred-small mt-5">Don't have an account ? <Link to="/public/signup">Signup</Link></p> */}
            {RaiseError()}
            <form onSubmit={formSubmit}>
                <ThemeProvider theme={THEME}>
                    <div className="form-group">
                        <TextField 
                        label="Email Address"
                        error={login.error}
                        required
                        value={login.email}
                        onChange={e => setLogin({...login,email: e.target.value})}
                        className="form-control"
                        variant="outlined"
                        color = "primary"
                        type="email"
                        InputProps={inputProps}
                        InputLabelProps = {labelProps}
                        />
                    </div>
                    <div className="form-group">
                        <TextField 
                        label="Password"
                        type="password"
                        required
                        value={login.password}
                        onChange={e => setLogin({...login,password: e.target.value})}
                        error={login.error}
                        className="form-control"
                        variant="outlined"
                        color="primary"
                        InputProps={inputProps}
                        InputLabelProps = {labelProps}
                        />
                    </div>
                    <div className="form-group">
                        <div className="row no-gutters">
                            <div className="col-6">
                                <input type="checkbox" id="remember-me" checked={login.rememberMe} onChange={e => setLogin({...login,rememberMe:e.target.checked})}/>
                                <label htmlFor="remember-me" className="ml-2 text-muted">Remember me</label>
                            </div>
                            <div className="col-6 text-right">
                                <Link to="/public/forgot/password">Forgot Password</Link>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit"
                        className="btn frequent-btn d-block mx-auto">Login</button>
                    </div>
                </ThemeProvider>
            </form>
        </React.Fragment>
    );
};

export default LoginForm;