import React, {useState} from 'react';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader/SubHeader';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import { STATE_HANDLER } from '../../../../shared/STATE_HANDLER';
import imageCompression from 'browser-image-compression';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import infoicon from '../../../../assets/images/info_icon.svg';
import defaultimg from '../../../../assets/images/no-image-default.png';
import {THEME} from '../../../../shared/THEME';
import { Button, ThemeProvider } from '@material-ui/core';
import './AddProduct.scss';
import ProgressLoader from '../../../components/ProgressLoader/ProgressLoader';

const initialState = {
  name: '',
  category: '',
  description: '',
  image: '',
  price: '',
  panNumber: '',
  nameError: false,
  categoryError: false,
  imageError: false,
  descriptionError: false,
  priceError: null,
  panNumberError: null,
  error: false,
  serverError: '',
}

const AddProduct = () => {

  const Options = require('../../../../shared/Data/productscategory.json');
  const [file, setFile] = useState(null);
  // const [imgSrc, setImgSrc] = useState(null);
  const [uploadfile, setUploadFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = React.useState(initialState);
  const { imgUrl, setFormProduct } = React.useContext(STATE_HANDLER);
  const types = ['image/png', 'image/jpeg', 'image/jpg'];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      console.log('originalFile instanceof Blob', selected instanceof Blob); // true
      console.log(`originalFile size ${selected.size / 1024 / 1024} MB`);
      console.log(selected);
      var reader = new FileReader();
      reader.readAsDataURL(selected);

      reader.onloadend = function (e) {
          // setImgSrc([reader.result]);
          setProduct({...product, image: [reader.result]});
        }
    
      var options = {
        maxSizeMB: 0.25,
        maxWidthOrHeight: 600,
        useWebWorker: true
      }

      if(selected.size > 153600) {
        imageCompression(selected, options)
        .then(function (compressedFile) {
          console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
          console.log(compressedFile);
          setFile(compressedFile);
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        })
        .catch(function (error) {
          console.log(error.message);
        });
      }
      else {
        setFile(selected);
      }

      setError('');
    } else {
      setFile(null);
      // setImgSrc(null);
      setProduct({...product, image: ''});
      setError('Please select an image file (png or jpg)');
    }
  };

  const uploadClick = () => {
    document.getElementById("fileinput").click();
  }

  const validateForm = () => {
    let initialError = {
      nameError: null,
      categoryError: null,
      imageError: null,
      descriptionError: null,
      priceError: null,
      error: null
    }

    if(product.name === "") {
      initialError.nameError = "PLease enter product name.";
      initialError.error = true;
    }

    if(product.description === "") {
      initialError.descriptionError = "Please enter description."
      initialError.error = true;
    }

    if(product.category === "") {
      initialError.categoryError = "Please select product category."
      initialError.error = true;
    }

    if(product.image === "") {
      initialError.imageError = "Please select image."
      initialError.error = true;
    }
    
    if(product.price === "") {
      initialError.priceError = "Please enter price."
      initialError.error = true;
    }

    setProduct({...product,...initialError});
    return !initialError.error;
  }

  const formHandling = async event => {
    event.preventDefault()

    const res = validateForm();
    if (res) {
      setIsLoading(true);
      console.log("file-uplloaded");
      setUploadFile(file);
      setFormProduct({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
      });
    };
    
  }

  React.useEffect(() => {
      let clearState = {
        name: '',
        category: '',
        description: '',
        image: '',
        price: '',
        panNumber: '',
        nameError: false,
        categoryError: false,
        imageError: false,
        descriptionError: false,
        priceError: null,
        panNumberError: null,
        error: false,
        serverError: '',
      }
      if(imgUrl) {
        setIsLoading(false);
        setProduct({...product, ...clearState});
      }
  }, [imgUrl]);

  const removeImage = () => {
    setProduct({...product, image: ''});
  }

  return (
    <>
    <ProgressLoader isTrue={isLoading} />
    <Header />
      <div className="main-content">
        <SubHeader /> 
        <div className="add-products">
          <div className="container">
            <div className="add-products-form">
              <h1>Add product</h1>
              <form className="" noValidate autoComplete="off" onSubmit={formHandling}>
                <ThemeProvider theme={THEME}>
                  <div className="addproduct-inputs product-inputs d-flex align-items-center">
                    <TextField 
                      id="outlined-basic" 
                      label="Product Name" 
                      error={product.nameError ? true : false}
                      onBlur={product.nameError ? validateForm : null}
                      value={product.name}
                      onChange={e => setProduct({...product, name: e.target.value})}
                    />
                    <img className="changelaginfo" src={infoicon} alt="info" />
                  </div>
                  <div className="addproduct-inputs product-inputs d-flex align-items-center">
                    <input className="d-none" type="file" id="fileinput" onChange={handleChange} />
                    <div className="uploaded-img">
                      <img src={product.image ? product.image : defaultimg} className="w-100 h-100" alt="..." />
                    </div>
                    <div className="add-image-btn">
                      {
                        product.image ? 
                          (<Button onClick={removeImage} variant="outlined" type="button" color="primary">
                            Remove Image
                          </Button>)
                        :
                          (<Button onClick={uploadClick} variant="outlined" type="button" color="primary">
                            Select Image
                          </Button>)
                      
                      }
                      { error && <div className="error">{ error }</div>}
                    </div>
                    <div className="d-none">
                      { uploadfile && <ProgressBar file={uploadfile} setFile={setUploadFile} /> }
                    </div>
                  </div>
                  <div className="addproduct-inputs d-flex align-items-center">
                    <TextField
                      select
                      label="Select Product Category"
                      error={product.categoryError ? true : false}
                      onBlur={product.categoryError ? validateForm : null}
                      value={product.category}
                      onChange={e => setProduct({...product, category: e.target.value})}
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
                      label="Product Description" 
                      error={product.descriptionError ? true : false}
                      onBlur={product.descriptionError ? validateForm : null}
                      value={product.description}
                      onChange={e => setProduct({...product, description: e.target.value})}
                    />
                    <img className="changelaginfo" src={infoicon} alt="info" />
                  </div>
                  <div className="addproduct-inputs d-flex align-items-center">
                    <TextField 
                      type="number"
                      label="Price" 
                      error={product.priceError ? true : false}
                      onBlur={product.priceError ? validateForm : null}
                      value={product.price}
                      onChange={e => setProduct({...product, price: e.target.value})}
                    />
                    <img className="changelaginfo" src={infoicon} alt="info" />
                  </div>
                  <div className="form-group text-center add-sbmt-btn">
                    <Button variant="contained" type="submit" color="primary">
                      { uploadfile ? <div className="loadingspinner" ></div> : "Submit"}
                    </Button>
                  </div>
                </ThemeProvider>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;