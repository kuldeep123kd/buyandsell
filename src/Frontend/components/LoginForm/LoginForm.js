import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {ThemeProvider} from '@material-ui/core/styles';
import '../SignupForm/SignForm.scss';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios'
import {THEME} from '../../../shared/THEME';
import {STATE_HANDLER} from '../../../shared/STATE_HANDLER';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
import Input from '@material-ui/core/Input';

const initialState = {
  email: '',
  password: '',
  // rememberMe: false,
  error: null,
  errorMessage: '',
  redirect: false,
  returnSecureToken: true
}

const LoginForm = (props) => {
  const [login,setLogin] = useState(initialState);

  const {ModifyToken,getToken} = React.useContext(STATE_HANDLER)

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  React.useEffect(()=>{
    const token = getToken()
    if (token) {
      setLogin({...login,redirect: true});
    }
  },[getToken, login]);

  const formSubmit = (e) => {
    e.preventDefault();
    Axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,login)
    .then(resp => {
      console.log(resp);
      if (resp.status === 200) {
        const token = resp.data.idToken
        localStorage.setItem("session_start",new Date());
        ModifyToken(token)
        localStorage.setItem('refreshToken',resp.data.refreshToken);
        localStorage.setItem('userEmail',resp.data.email);
        localStorage.setItem('userId', resp.data.localId);
        // localStorage.setItem('expiresIn', resp.data.expiresIn);
        setLogin({...initialState, redirect:true});
      }
    })
    .catch(err => {
      console.log(err.response);
      if(err.response.data.error.message === "EMAIL_NOT_FOUND") {
        setLogin({...login,error: true, errorMessage: "Email not registered. Please create new account."});
      } 
      else if(err.response.data.error.message === "INVALID_PASSWORD") {
        setLogin({...login,error: true, errorMessage: "Invalid credentials entered"});
      }
    })
  }
  const RaiseError = () => {
    if (login.error){
      return (
      <small className="login-error">{login.errorMessage}</small>
      )
    }
  }

  const red = () => {
    if (login.redirect) {
      return <Redirect to="/" />
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
                color = "primary"
                type="email"
              />
            </div>
            <div className="form-group">
              <FormControl label="Password" >
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={login.password}
                  required
                  error={login.error}
                  onChange={e => setLogin({...login,password: e.target.value})}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="form-group">
              <div className="row no-gutters">
                {/* <div className="col-6">
                  <input type="checkbox" id="remember-me" checked={login.rememberMe} onChange={e => setLogin({...login,rememberMe:e.target.checked})}/>
                  <label htmlFor="remember-me" className="ml-2 text-muted">Remember me</label>
                </div> */}
                <div className="col-12 text-right">
                  <Link to="/public/forgot/password">Forgot Password</Link>
                </div>
              </div>
            </div>
            <div className="form-group text-center">
              <Button variant="contained" type="submit" color="primary">
                Login
              </Button>
            </div>
          </ThemeProvider>
        </form>
      </React.Fragment>
    );
};

export default LoginForm;