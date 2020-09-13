import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {ThemeProvider} from '@material-ui/core/styles';
import '../SignupForm/SignForm.scss';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios'
import {THEME, labelProps, inputProps} from '../../../shared/THEME';
import {TOKEN_HANDLER} from '../../../shared/TOKEN_HANDLER';
import { makeStyles } from '@material-ui/core/styles';

const initialState = {
  email: '',
  password: '',
  // rememberMe: false,
  error: null,
  errorMessage: '',
  redirect: false,
  returnSecureToken: true
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& label.MuiInputLabel-outlined': {
      display: 'flex'
    },
    '& label.Mui-focused': {
      color: '#3772FF',
      backgroundColor: '#fff',
      padding: '0 5px',
      marginLeft: '-3.5px',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#CED4DA',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3772FF',
        borderWidth: "1px",
        boxShadow: '0 0 5px rgba(55, 114, 255, 0.5)',
      },
    },
  },
}));

const LoginForm = (props) => {
  const [login,setLogin] = useState(initialState);

  const classes = useStyles();

  const {ModifyToken,getToken} = React.useContext(TOKEN_HANDLER)

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
                className={classes.root}
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
                className={classes.root}
                variant="outlined"
                color="primary"
                InputProps={inputProps}
                InputLabelProps = {labelProps}
              />
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