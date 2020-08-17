import React from 'react';
import {Link} from 'react-router-dom';
import {TextField} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core'
import {THEME, labelProps, inputProps} from '../../../shared/THEME';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import './SignForm.scss';
// import axios from 'axios'
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
    // const [modalType, setModalType] = React.useState();
    // const [isHuman, setIsHuman] = React.useState('');

    React.useEffect(() => {
    //     // load recaptcha
    //     loadReCaptcha();
        
    //     const signupDetails = JSON.parse(localStorage.getItem("credentials"))

    //     // console.log(signupDetails);
    //     if (signupDetails) {
    //         setSignup(signupDetails);
    //     }
    //     let currentState = localStorage.getItem("currentState");
    //     if (currentState === "verify-email") {
    //         // call api for verifying email
            
    //         // ................................................
            
    //         /*  IMPORTANT FOR EMAIL VERIFICATION */
            
    //         if (true) {
    //             // simulation for email verification successful
    //             setModalType(1);
                
    //             // set currentState = "verify-otp"
    //             localStorage.setItem("currentState","verify-otp"); 
                
    //         } else {
    //             //simulation for email verification unsuccessful
    //             setModalType(2);
    //         }

            

    //         // ................................................
    //     } 
    //     else if(currentState === "verify-otp") {
    //         setModalType(3);

    //     }
    }, []);

    // const GiveNotifications = () => {
    //     return <Notifications modalType={modalType} setModalType={setModalType} />
    // }

    // // checking the response from recaptcha
    // const CheckIsHuman = (resp) => {
    //     setIsHuman(resp);
    // }

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
        // localStorage.clear()
        // const res = validateForm();
        // if (res && isHuman) {
        //     // if form validation is successful, make an API call
        //     axios.post(`${BASEURL}/api/signup`,{
        //         first_name: signup.firstName,
        //         last_name: signup.lastName,
        //         email: signup.email,
        //         phone: signup.phone,
        //         password: signup.password,
        //         confirm_password: signup.confirmPassword,
        //         terms_and_conditions: signup.tAndC,
        //         // recaptcha: isHuman,
        //     })
        //     .then(resp => {
        //         // console.log(resp);
        //         if (resp.status === 200) {
        //             if (resp.data?.message === "User Account already exists") {
        //                 // console.log(resp.data?.message);
        //                 // now set every text input as error
        //                 setSignup({...signup,serverError: "The Email id/ Mobile Number is already registered. Login to continue"})
        //             } else if (resp.data?.message === "Signup Succesfull") {
        //                 // console.log("Hello Success!")
        //                 setSignup({...signup,serverError: ''})
        //                 setModalType(0);
        //                 // console.log(signup)
        //                 localStorage.setItem("credentials",JSON.stringify({...signup,serverError: ''}));
                        
        //                 // set current state
        //                 localStorage.setItem("currentState","verify-email")
                        
        //             }
        //             // console.log(resp.data?.message)
        //         } 
        //     })
        //     .catch(err => {
        //         // show errors from server
        //         // console.log(err.response);
        //         // console.log(err.response?.message);
        //     })
        // }
    }

    return (
        <React.Fragment>
            {/* {GiveNotifications()} */}
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
                                    className="form-control"
                                    required
                                    variant="outlined"
                                    label="First Name"
                                    error={signup.firstNameError || signup.serverError ? true : false}
                                    InputLabelProps = {labelProps}
                                    InputProps={inputProps}
                                    value={signup.firstName}
                                    onChange={e => setSignup({...signup,firstName: e.target.value})}
                                    />                
                                </div>
                                <div className="col-6">
                                    <TextField 
                                    className="form-control"
                                    variant="outlined"
                                    label="Last Name"
                                    error={signup.lastNameError || signup.serverError? true : false}
                                    required
                                    InputLabelProps = {labelProps}
                                    InputProps={inputProps}
                                    value={signup.lastName}
                                    onChange={e => setSignup({...signup,lastName: e.target.value})}
                                    />                
                                </div>
                            </div>
                        </div>
                        {/* second row start*/}
                        <div className="form-group">
                            <TextField 
                            className="form-control"
                            label="Email Address"
                            required
                            type="email"
                            color="primary"
                            error={signup.emailError || signup.serverError? true : false}
                            InputLabelProps={labelProps}
                            InputProps={inputProps}
                            variant="outlined"
                            value={signup.email}
                            onChange={e => setSignup({...signup,email: e.target.value})}
                            />
                        </div>
                        {/* third row */}
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-4">
                                    <FormControl
                                    variant="outlined"
                                    className="form-control"
                                    >
                                        <Select
                                        defaultValue={'+91'}
                                        >
                                            {/* for more countries we need to have a separate file with image source and code */}
                                            <MenuItem selected value={'+91'}>
                                                <div className="text-center">
                                                    <img src="..." className="img-fluid mx-2" alt="india"/>
                                                    <span
                                                    style={{
                                                        color: '#6C6C6C',
                                                        fontWeight:'normal',
                                                    }}
                                                    >+91</span>
                                                </div>
                                            </MenuItem>
                                            {/* menu item ends */}
                                        </Select>
                                    </FormControl>
                                </div>
                                {/* TODO: Take input in required format as in design */}
                                <div className="col-8">
                                    <TextField
                                    className="form-control"
                                    label="Mobile Number"
                                    variant="outlined"
                                    required
                                    helperText={signup.phoneError}
                                    InputProps={inputProps}
                                    error={signup.phoneError || signup.serverError? true : false}
                                    style={{
                                        marginBottom: signup.phoneError ? '20px': ''
                                    }}
                                    InputLabelProps={labelProps}
                                    value={signup.phone}
                                    onChange={e => setSignup({...signup,phone: e.target.value})}
                                    >
                                    </TextField>
                                </div>
                            </div>
                        </div>
                        
                        {/* fourth row  */}
                        <div className="form-group">
                            <TextField 
                            className="form-control"
                            type="password"
                            error={signup.passwordError || signup.serverError? true : false}
                            InputProps={inputProps}
                            InputLabelProps={labelProps}
                            label="Password"
                            variant="outlined"
                            value={signup.password}
                            onChange={e => setSignup({...signup,password: e.target.value})}
                            />
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
                            <TextField 
                            className="form-control"
                            type="password"
                            InputProps={inputProps}
                            InputLabelProps={labelProps}
                            variant="outlined"
                            label="Confirm Password"
                            error={signup.cPasswordError || signup.serverError ? true : false}
                            
                            style={{
                                marginBottom: signup.cPasswordError ? '20px': ''
                            }}
                            value={signup.confirmPassword}
                            onChange={e => setSignup({...signup,confirmPassword: e.target.value})}
                            />
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

                        <div className="form-group">
                            <button className="btn frequent-btn d-block mx-auto" type="submit">Submit</button>
                        </div>
                    </form>
                </ThemeProvider>
            </div>
        </React.Fragment>
    );
};

export default SignupForm;