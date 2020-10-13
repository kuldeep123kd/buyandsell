import React from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import {TextField} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core';
import {THEME} from '../../../shared/THEME';
import Button from '@material-ui/core/Button';
import './SignForm.scss';
import Axios from 'axios';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
import Input from '@material-ui/core/Input';
import { STATE_HANDLER } from '../../../shared/STATE_HANDLER';

// import {BASEURL} from '../../../shared/BASEURL'
// import Notifications from './Notifications';
// import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-google'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  firstNameError: false,
  lastNameError: false,
  emailError: false,
  tAndC: false,
  phoneError: null,
  passwordError: null,
  cPasswordError: null,
  tAndCError: null,
  error: false,
  serverError: '',
}

const SignupForm = () => {

  const [signup, setSignup] = React.useState(initialState);
  const [isSignup, setIsSignup] = React.useState(false);
  // const [modalType, setModalType] = React.useState();
  // const [isHuman, setIsHuman] = React.useState('');

  const history = useHistory();

  // // checking the response from recaptcha
  // const CheckIsHuman = (resp) => {
  //     setIsHuman(resp);
  // }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [showcPassword, setShowcPassword] = React.useState(false);

  const handleClickShowcPassword = () => {
    setShowcPassword(!showcPassword);
  };

  const handleMouseDowncPassword = (event) => {
    event.preventDefault();
  };

  // advanced password format checking
  const IsPasswordValid = password => {
    // regex for checking a-z
    let regex_1 = /[a-z]+/;
    let regex_2 = /[A-Z]+/;
    let regex_3 = /[0-9]+/;

    if (!regex_1.test(password)) {
      return false;
    }

    if (!regex_2.test(password)) {
      return false;
    }

    if (!regex_3.test(password)) {
      return false;
    }

    if (password.length < 8) {
      return false;
    }

    return true;

  }

  const validateForm = () => {
    let initialError = {
      phoneError: null,
      passwordError: null,
      cPasswordError: null,
      tAndCError: null,
      error: null
    }
    // regex for phone validation
    let phoneReg = /\d{10}/;
    
    if (!phoneReg.test(signup.phone) || signup.phone.length !== 10) {
      initialError.phoneError = "Please enter a valid phone number"
      initialError.error = true;
    }

    // check for password and confirm password
    if(signup.password !== signup.confirmPassword) {
      initialError.cPasswordError = "Passwords not matched";
      initialError.error = true;
    }

    // check for password length and regex
    if(!IsPasswordValid(signup.password)) {
      initialError.passwordError = true;
      initialError.error = true;
    }

    // Terms and conditions checking
    if(!signup.tAndC) {
      initialError.tAndCError = "Please accept terms and conditions"
      initialError.error = true;
    }

    // console.log(initialError)
    setSignup({...signup,...initialError});
    return !initialError.error;
      
  }

  const formHandling = event => {
    event.preventDefault()
    // clear the localStorage
    localStorage.clear()
    const res = validateForm();
    if (res) {
      // if form validation is successful, make an API call
      Axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`,{
        email: signup.email,
        password: signup.password,
        confirm_password: signup.confirmPassword,
        displayName: signup.firstName + ' ' + signup.lastName,
        returnSecureToken: true
      })
      .then(resp => {
        console.log(resp);
        if (resp.status === 200) {
          localStorage.setItem('token', resp.data.idToken);
          localStorage.setItem('userId', resp.data.localId);
          localStorage.setItem('userEmail',resp.data.email);
          localStorage.setItem('refreshToken', resp.data.refreshToken);
          // if form validation is successful, make an API call
          setIsSignup(true);
          const formData = {
            user: {
              id: resp.data.localId,
              data: {
                name: resp.data.displayName,
                email: resp.data.email,
                mobile: signup.phone,
              }
            }
          }

          Axios.post('https://buysell-612c1.firebaseio.com/usersdata.json?auth=' + resp.data.idToken, formData)
            .then(resp => {
              console.log(resp);
              if (resp.status === 200) {
                console.log(resp);
                console.log(resp.data);
              }
            }).catch(err => {
              console.log(err);
              console.log(err.response);
            })
          // history.push('/');
        } 
      })
      .catch(err => {
        // show errors from server
        // console.log(err.response);
        const errors = {
          emailError: false,
          phoneError: null,
          recaptchaError: null,
        }
        if(err.response?.status === 400) {
          const errorData = err.response.data
          if(errorData.error.message === "EMAIL_EXISTS") {
            errors.emailError = "The email address provided has an account linked to it. Please login to your existing account."
          }
          setSignup({...signup,...{
            phoneError: null,
            passwordError: null,
            cPasswordError: null,
            tAndCError: null,
            error: null,
            emailError: null,
          },...errors})
          // history.push('/signup');
        }
      })
    };
  }

  // const {getToken} = React.useContext(STATE_HANDLER)

  // React.useEffect(() => {
  //   //     // load recaptcha
  //   // loadReCaptcha();

  //   // const email = localStorage.getItem('email')
    

  // if(getToken() || localStorage.getItem('token')) {
  //     if (localStorage.getItem('token')) {
  //       return <Redirect to={`/`} />
  //     }
  // }
  // }, [getToken]);

  const signSuccess = () => {
    if (isSignup) {
      return <Redirect to="/" />
    }
  }

  return (
    <React.Fragment>
      {/* {GiveNotifications()} */}
      {signSuccess()}
      {/* <p className="login-cred-small mt-5">Already have an account ? <Link to="/public/login">Login</Link></p> */}
      <div className="py-3">
        <ThemeProvider theme={THEME}>
          <div className="text-center">
            <small className="text-center error-text font-weight-bold">{signup.serverError}</small>
          </div>
          <form onSubmit={formHandling}>
              <div className="form-group">
                  <div className="form-row">
                      <div className="col-6">
                          <TextField 
                            required
                            label="First Name"
                            error={signup.firstNameError || signup.serverError ? true : false}
                            value={signup.firstName}
                            onChange={e => setSignup({...signup,firstName: e.target.value})}
                          />                
                      </div>
                      <div className="col-6">
                          <TextField 
                            label="Last Name"
                            error={signup.lastNameError || signup.serverError? true : false}
                            required
                            value={signup.lastName}
                            onChange={e => setSignup({...signup,lastName: e.target.value})}
                          />                
                      </div>
                  </div>
              </div>
              <div className="form-group">
                  <TextField 
                    label="Email Address"
                    required
                    type="email"
                    color="primary"
                    error={signup.emailError || signup.serverError? true : false}
                    value={signup.email}
                    onChange={e => setSignup({...signup,email: e.target.value})}
                  />
              </div>
              <div className="mt-3">
                <small className="error-text">
                  {
                    <small className="error-text">{signup.emailError}</small>
                  }
                </small>
            </div>
            <div className="form-group">
              <TextField
                label="Mobile Number"
                required
                helperText={signup.phoneError}
                error={signup.phoneError || signup.serverError? true : false}
                style={{
                    marginBottom: signup.phoneError ? '20px': ''
                }}
                value={signup.phone}
                onChange={e => setSignup({...signup,phone: e.target.value})}
              >
              </TextField>
            </div>
            
            <div className="form-group">
              <FormControl label="Password" >
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={signup.password}
                  required
                  error={signup.passwordError || signup.serverError? true : false}
                  onChange={e => setSignup({...signup,password: e.target.value})}
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

            {/* disabled password  */}
            <div style={{display: signup.passwordError ? 'block': 'none'}}>
                <div className="" style={{backgroundColor: '#F9F9F9',marginTop: '-.94rem',marginBottom: '1rem',border: '1px solid #C6C6C6',borderTop: 'none'}}>
                  <small style={{paddingLeft: '20px',color: '#6C6C6C',fontSize: '10px'}} >Suggested Password</small>
                  <input type="text" disabled style={{border:'none',backgroundColor:'#F9F9F9',paddingLeft: '20px',color: 'black',marginTop: '-.5rem'}} className="form-control" value="754fg5@"/>
                </div>
                <div className="" style={{marginTop: '-.9rem',marginBottom: '1rem'}}>
                  <small className="error-text">Password should be alphanumeric at least 8 characters long</small> <br/>
                  <small className="error-text">Password must contain at least one capital letter, one small letter and one number</small>
                </div>
            </div>
            
            {/* confirm password starts */}
            <div className="form-group">
              <FormControl label="Confirm Password" >
                <InputLabel htmlFor="standard-adornment-password1">Confirm Password</InputLabel>
                <Input
                  id="standard-adornment-password1"
                  type={showcPassword ? 'text' : 'password'}
                  value={signup.confirmPassword}
                  required
                  error={signup.cPasswordError || signup.serverError ? true : false}
                  onChange={e => setSignup({...signup,confirmPassword: e.target.value})}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowcPassword}
                        onMouseDown={handleMouseDowncPassword}
                      >
                        {showcPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {/* raise error if password not matched */}
              <div className="" style={{display: signup.cPasswordError? 'block' :'none'}}>
                <small className="error-text">{signup.cPasswordError}</small>
              </div>
            </div>
            
            {/* check box */}
            <div className="form-group">
              <div className="form-check">
                <input type="checkbox" id="t&c" 
                checked={signup.tAndC}
                onChange={e => setSignup({...signup,tAndC: e.target.checked})}
                className="form-check-input"/>
                <label htmlFor="t&c" style={{color:'#6C6C6C'}}>I accept the <Link to="/public/legal" className="terms-conditions">Terms & Conditions</Link> and <Link className="terms-conditions" to="/public/legal">Privacy Policy</Link></label>
              </div>
              {/* raise error if not accepted t&c */}
              <small 
                style={{display: signup.tAndCError ? 'block' : 'none'}}
                className="error-text">{signup.tAndCError}</small>
            </div>

            {/* recaptcha */}
            {/* <ReCaptcha
              size="normal"
              render="explicit"
              sitekey="6Le1tbIZAAAAAHEvI-urGjqEEsf6EmToB14HNUTH"
              verifyCallback={CheckIsHuman}
            /> */}

            <div className="form-group text-center">
              <Button variant="contained" type="submit" color="primary">
                Signup
              </Button>
            </div>
          </form>
        </ThemeProvider>
      </div>
    </React.Fragment>
  );
};

export default SignupForm;