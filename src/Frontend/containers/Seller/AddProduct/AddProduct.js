import React, {useState} from 'react';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader/SubHeader';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import Axios from 'axios';
import { TOKEN_HANDLER } from '../../../../shared/TOKEN_HANDLER';
import imageCompression from 'browser-image-compression';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import infoicon from '../../../../assets/images/info_icon.svg';
import defaultimg from '../../../../assets/images/no-image-default.png';
import {THEME} from '../../../../shared/THEME';
import { Button, ThemeProvider } from '@material-ui/core';
import './AddProduct.scss';


const useStyles = makeStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: '#3772FF',
      backgroundColor: '#fff',
      padding: '0 5px',
      marginLeft: '-3.5px'
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

const initialState = {
  buscompName: '',
  pcategory: '',
  description: '',
  price: '',
  panNumber: '',
  buscompNameError: false,
  pcategoryError: false,
  descriptionError: false,
  priceError: null,
  panNumberError: null,
  error: false,
  serverError: '',
}

const AddProduct = () => {

  const classes = useStyles();
  const Options = require('../../../../shared/Data/productscategory.json');

  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [uploadfile, setUploadFile] = useState(null);
  const [error, setError] = useState(null);

  const {getToken} = React.useContext(TOKEN_HANDLER);

  // const [option, setOption] = React.useState('');
  const [addProduct, setAddProduct] = React.useState(initialState);
  const [formSubmit, setFormSubmit] = React.useState(false);

  // const { imgUrl } = React.useContext(TOKEN_HANDLER);

  const types = ['image/png', 'image/jpeg', 'image/jpg'];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      console.log('originalFile instanceof Blob', selected instanceof Blob); // true
      console.log(`originalFile size ${selected.size / 1024 / 1024} MB`);

      var reader = new FileReader();
      var url = reader.readAsDataURL(selected);

      reader.onloadend = function (e) {
          setImgSrc([reader.result]);
        }
      console.log(url) 
    
      var options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true
      }
      imageCompression(selected, options)
        .then(function (compressedFile) {
          console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
          console.log(compressedFile.name);
          setFile(compressedFile);
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
    
          // return uploadToServer(compressedFile); // write your own logic
        })
        .catch(function (error) {
          console.log(error.message);
        });
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }
  };

  const upload = () => {
    setUploadFile(file);
  }

  const uploadClick = () => {
    document.getElementById("fileinput").click();
  }

  const validateForm = () => {
    let initialError = {
      buscompNameError: null,
      pcategoryError: null,
      descriptionError: null,
      priceError: null,
      // panNumberError: null,
      error: null
    }
    // regex for phone validation
    // let gstReg = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    // let panReg = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    
    // if (!gstReg.test(addProduct.gstNumber)) {
    //   initialError.gstNumberError = "Please enter a valid GST number."
    //   initialError.error = true;
    // }

    // // check for password and confirm password
    // if(!panReg.test(addProduct.panNumber)) {
    //   initialError.panNumberError = "Please enter a valid PAN number.";
    //   initialError.error = true;
    // }

    // check for password length and regex
    if(addProduct.buscompName === "") {
      initialError.buscompNameError = "PLease enter business/company name.";
      initialError.error = true;
    }

    // Terms and conditions checking
    // if(addProduct.storeName === "") {
    //   initialError.storeNameError = "Please enter store name."
    //   initialError.error = true;
    // }

    if(addProduct.description === "") {
      initialError.descriptionError = "Please enter description."
      initialError.error = true;
    }
    if(addProduct.pcategory === "") {
      initialError.pcategoryError = "Please select product category."
      initialError.error = true;
    }
    if(addProduct.price === "") {
      initialError.priceError = "Please enter price."
      initialError.error = true;
    }

    // console.log(initialError)
    setAddProduct({...addProduct,...initialError});
    return !initialError.error;
  }

  const formHandling = event => {
    event.preventDefault()
    // clear the localStorage
    // localStorage.clear()
    const res = validateForm();
    if (res) {
      let userId = localStorage.getItem('userId');
      // if form validation is successful, make an API call
      const formData = {
        seller: {
          userId: userId,
          data: {
            buscompName: addProduct.buscompName,
            description: addProduct.description,
            pcategory: addProduct.pcategory,
            price: addProduct.price,
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
    <>
    <Header />
      <div className="main-content">
        <SubHeader /> 
        <div className="add-products">
          <div className="container">
            <div>
            <form className="" noValidate autoComplete="off" onSubmit={formHandling}>
              <div className="sellerform-inputs d-flex align-items-center">
                <TextField 
                  className={classes.root} 
                  id="outlined-basic" 
                  label="Business/Company Name" 
                  variant="outlined" 
                  error={addProduct.buscompNameError ? true : false}
                  // onBlur={addProduct.buscompNameError ? validateForm : null}
                  value={addProduct.buscompName}
                  onChange={e => setAddProduct({...addProduct, buscompName: e.target.value})}
                />
                <img className="changelaginfo" src={infoicon} alt="info" />
              </div>
              <div>
                  <input className="d-none" type="file" id="fileinput" onChange={handleChange} />
                  <div className="uploaded-img">
                    <img src={imgSrc ? imgSrc : defaultimg} className="w-100 h-100" alt="..." />
                  </div>
                  <button onClick={uploadClick}>Select Image</button>
                  { error && <div className="error">{ error }</div>}
                  <button onClick={upload} type="button" >Upload</button>
                <div className="output">
                  { file && <div>{ file.name }</div> }
                  { uploadfile && <ProgressBar file={uploadfile} setFile={setUploadFile} /> }
                </div>
              </div>
              <div className="sellerform-inputs d-flex align-items-center">
                <TextField
                  className={classes.root}
                  id="outlined-basic"
                  select
                  label="Select Product Category"
                  error={addProduct.pcategoryError ? true : false}
                  onBlur={addProduct.pcategoryError ? validateForm : null}
                  value={addProduct.pcategory}
                  onChange={e => setAddProduct({...addProduct, pcategory: e.target.value})}
                  variant="outlined"
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
                  className={classes.root} 
                  id="outlined-basic" 
                  label="Product Description" 
                  variant="outlined" 
                  error={addProduct.descriptionError ? true : false}
                  onBlur={addProduct.descriptionError ? validateForm : null}
                  value={addProduct.description}
                  onChange={e => setAddProduct({...addProduct, description: e.target.value})}
                />
                <img className="changelaginfo" src={infoicon} alt="info" />
              </div>
              <div className="sellerform-inputs d-flex align-items-center">
                <TextField 
                  className={classes.root} 
                  id="outlined-basic" 
                  type="number"
                  label="Price" 
                  variant="outlined" 
                  error={addProduct.priceError ? true : false}
                  onBlur={addProduct.priceError ? validateForm : null}
                  value={addProduct.price}
                  onChange={e => setAddProduct({...addProduct, price: e.target.value})}
                />
                <img className="changelaginfo" src={infoicon} alt="info" />
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;