import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader/SubHeader';
import Footer from '../../../components/Footer/Footer';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import infoicon from '../../../../assets/images/info_icon.svg';
import './SellerForm.scss';
import { STATE_HANDLER } from '../../../../shared/STATE_HANDLER';
import {THEME} from '../../../../shared/THEME';
import Axios from 'axios';
import { Button, ThemeProvider } from '@material-ui/core';
import ProgressLoader from '../../../components/ProgressLoader/ProgressLoader';

const initialState = {
  buscompName: '',
  storeName: '',
  pcategory: '',
  address: '',
  gstNumber: '',
  panNumber: '',
  buscompNameError: false,
  storeNameError: false,
  pcategoryError: false,
  addressError: false,
  gstNumberError: null,
  panNumberError: null,
  error: false,
  serverError: '',
}

const SellerForm = () => {

  const Options = require('../../../../shared/Data/productscategory.json');

  const {getToken} = React.useContext(STATE_HANDLER);

  // const [option, setOption] = React.useState('');
  const [sellerForm, setSellerForm] = React.useState(initialState);
  const [formSubmit, setFormSubmit] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const validateForm = () => {
    let initialError = {
      buscompNameError: null,
      storeNameError: null,
      pcategoryError: null,
      addressError: null,
      gstNumberError: null,
      panNumberError: null,
      error: null
    }
    // regex for phone validation
    let gstReg = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    let panReg = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    
    if (!gstReg.test(sellerForm.gstNumber)) {
      initialError.gstNumberError = "Please enter a valid GST number."
      initialError.error = true;
    }

    // check for password and confirm password
    if(!panReg.test(sellerForm.panNumber)) {
      initialError.panNumberError = "Please enter a valid PAN number.";
      initialError.error = true;
    }

    // check for password length and regex
    if(sellerForm.buscompName === "") {
      initialError.buscompNameError = "PLease enter business/company name.";
      initialError.error = true;
    }

    // Terms and conditions checking
    if(sellerForm.storeName === "") {
      initialError.storeNameError = "Please enter store name."
      initialError.error = true;
    }

    if(sellerForm.address === "") {
      initialError.addressError = "Please enter address."
      initialError.error = true;
    }
    if(sellerForm.pcategory === "") {
      initialError.pcategoryError = "Please  product category."
      initialError.error = true;
    }

    // console.log(initialError)
    setSellerForm({...sellerForm,...initialError});
    return !initialError.error;
  }

  const formHandling = event => {
    event.preventDefault()
    // clear the localStorage
    // localStorage.clear()
    const res = validateForm();
    if (res) {
      setIsLoading(true);
      let userId = localStorage.getItem('userId');
      // if form validation is successful, make an API call
      const formData = {
        seller: {
          id: userId,
          data: {
            buscompName: sellerForm.buscompName,
            storeName: sellerForm.storeName,
            pcategory: sellerForm.pcategory,
            address: sellerForm.address,
            gstNumber: sellerForm.gstNumber,
            panNumber: sellerForm.panNumber,
          }
        }
      }
      
      let token = localStorage.getItem('token');
      Axios.post('https://buysell-612c1.firebaseio.com/sellerdata.json?auth=' + token, formData)
      .then(resp => {
        console.log(resp);
        if (resp.status === 200) {
          console.log(resp.data);
          setFormSubmit(true);
          setIsLoading(false);
        } 
      })
      .catch(err => {
        // show errors from server
        console.log(err.response);
        console.log(err);
        // const errors = {
        //   emailError: false,
        //   phoneError: null,
        //   recaptchaError: null,
        // }
        // if(err.response?.status === 400) {
        //     const errorData = err.response.data
        //     if(errorData.error.message === "EMAIL_EXISTS") {
        //       errors.emailError = "The email address provided has an account linked to it. Please login to your existing account."
        //     }
        //     setSellerForm({...sellerForm,...{
        //       buscompNameError: null,
        //       storeNameError: null,
        //       pcategoryError: null,
        //       addressError: null,
        //       gstNumberError: null,
        //       panNumberError: null,
        //       error: null
        //     },...errors})
        // }
      })
    };
  }

  return (
    (getToken() || localStorage.getItem('token')) ? (
      
      (formSubmit)? <Redirect to={`/sellerdashboard`} />
      : 
      <>
      <ProgressLoader isTrue={isLoading} />
      <Header />
        <div className="main-content">
          <SubHeader />
          <ThemeProvider theme={THEME}>
            <div className="container">
              <h1 className="add-seller-info text-center">Add Seller information</h1>
              <div className="sellerform">
              
                <h1>Tell us about your business</h1>
                <form noValidate autoComplete="off" onSubmit={formHandling}>
                  <div className="sellerform-inputs d-flex align-items-center">
                    <TextField 
                      label="Business/Company Name" 
                      error={sellerForm.buscompNameError ? true : false}
                      onBlur={sellerForm.buscompNameError ? validateForm : null}
                      value={sellerForm.buscompName}
                      onChange={e => setSellerForm({...sellerForm, buscompName: e.target.value})}
                    />
                    <img className="changelaginfo" src={infoicon} alt="info" />
                  </div>
                  <div className="sellerform-inputs d-flex align-items-center">
                    <TextField 
                      label="Store Name" 
                      error={sellerForm.storeNameError ? true : false}
                      onBlur={sellerForm.storeNameError ? validateForm : null}
                      value={sellerForm.storeName}
                      onChange={e => setSellerForm({...sellerForm, storeName: e.target.value})}
                    />
                    <img className="changelaginfo" src={infoicon} alt="info" />
                  </div>
                  <div className="sellerform-inputs d-flex align-items-center">
                    <TextField 
                      select
                      label="Select Product Category"
                      error={sellerForm.pcategoryError ? true : false}
                      onBlur={sellerForm.pcategoryError ? validateForm : null}
                      value={sellerForm.pcategory}
                      onChange={e => setSellerForm({...sellerForm, pcategory: e.target.value})}
                    >
                      {Options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <img className="changelaginfo" src={infoicon} alt="info" />
                  </div>
                  <div className="sellerform-inputs d-flex align-items-center">
                    <TextField 
                      label="Address" 
                      error={sellerForm.addressError ? true : false}
                      onBlur={sellerForm.addressError ? validateForm : null}
                      value={sellerForm.address}
                      onChange={e => setSellerForm({...sellerForm, address: e.target.value})}
                    />
                    <img className="changelaginfo" src={infoicon} alt="info" />
                  </div>
                  <div>
                    <h1>Update your Tax details</h1>
                    <div className="sellerform-inputs d-flex align-items-center">
                      <TextField 
                        label="GST Number" 
                        onBlur={sellerForm.gstNumberError ? validateForm : null}
                        error={sellerForm.gstNumberError ? true : false}
                        value={sellerForm.gstNumber.toUpperCase()}
                        onChange={e => setSellerForm({...sellerForm, gstNumber: e.target.value})}
                      />
                      <img className="changelaginfo" src={infoicon} alt="info" />
                    </div>
                    <div className="sellerform-inputs d-flex align-items-center">
                      <TextField 
                        label="PAN Number" 
                        error={sellerForm.panNumberError ? true : false}
                        onBlur={sellerForm.panNumberError ? validateForm : null}
                        value={sellerForm.panNumber.toUpperCase()}
                        onChange={e => setSellerForm({...sellerForm, panNumber: e.target.value})}
                      />
                      <img className="changelaginfo" src={infoicon} alt="info" />
                    </div>
                  </div>
                  <div className="form-group text-center">
                    <Button variant="contained" type="submit" color="primary">
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            </ThemeProvider>
        </div>
      <Footer />
      </>
      
    )
    : 
    (<Redirect to={`/login`} />)
    
  );
}

export default SellerForm;