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
  productName: '',
  pcategory: '',
  description: '',
  productImage: '',
  price: '',
  panNumber: '',
  productNameError: false,
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
  const [addProduct, setAddProduct] = React.useState(initialState);
  const { imgUrl, setFormData } = React.useContext(TOKEN_HANDLER);
  const types = ['image/png', 'image/jpeg', 'image/jpg'];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      console.log('originalFile instanceof Blob', selected instanceof Blob); // true
      console.log(`originalFile size ${selected.size / 1024 / 1024} MB`);

      var reader = new FileReader();
      reader.readAsDataURL(selected);

      reader.onloadend = function (e) {
          setImgSrc([reader.result]);
        }
    
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
        })
        .catch(function (error) {
          console.log(error.message);
        });
      setError('');
    } else {
      setFile(null);
      setImgSrc(null);
      setError('Please select an image file (png or jpg)');
    }
  };

  const uploadClick = () => {
    document.getElementById("fileinput").click();
  }

  const validateForm = () => {
    let initialError = {
      productNameError: null,
      pcategoryError: null,
      descriptionError: null,
      priceError: null,
      error: null
    }

    if(addProduct.productName === "") {
      initialError.productNameError = "PLease enter product name.";
      initialError.error = true;
    }

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

    const res = validateForm();
    if (res) {
      console.log("file-uplloaded"+imgUrl);
        setUploadFile(file);
        setFormData({
          productName: addProduct.productName,
          description: addProduct.description,
          pcategory: addProduct.pcategory,
          price: addProduct.price,
        });
    };
  }

  return (
    <>
    <Header />
      <div className="main-content">
        <SubHeader /> 
        <div className="add-products">
          <div className="container">
            <div className="add-products-form">
            <form className="" noValidate autoComplete="off" onSubmit={formHandling}>
              <div className="addproduct-inputs d-flex align-items-center">
                <TextField 
                  className={classes.root} 
                  id="outlined-basic" 
                  label="Product Name" 
                  variant="outlined" 
                  error={addProduct.productNameError ? true : false}
                  onBlur={addProduct.buscompNameError ? validateForm : null}
                  value={addProduct.productName}
                  onChange={e => setAddProduct({...addProduct, productName: e.target.value})}
                />
                <img className="changelaginfo" src={infoicon} alt="info" />
              </div>
              <div className="addproduct-inputs d-flex align-items-center">
                <input className="d-none" type="file" id="fileinput" onChange={handleChange} />
                <div className="uploaded-img">
                  <img src={imgSrc ? imgSrc : defaultimg} className="w-100 h-100" alt="..." />
                </div>
                <button type="button" onClick={uploadClick}>Select Image</button>
                { error && <div className="error">{ error }</div>}
                <div className="output">
                  {/* { file && <div>{ file.name }</div> } */}
                  { uploadfile && <ProgressBar file={uploadfile} setFile={setUploadFile} /> }
                </div>
              </div>
              <div className="addproduct-inputs d-flex align-items-center">
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
              <div className="addproduct-inputs d-flex align-items-center">
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
              <div className="addproduct-inputs d-flex align-items-center">
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
              <div className="form-group text-center">
                <Button variant="contained" type="submit" color="primary">
                  Submit
                </Button>
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