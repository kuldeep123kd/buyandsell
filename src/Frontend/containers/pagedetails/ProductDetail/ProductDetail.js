// import React from 'react';
// import { Link, Redirect } from 'react-router-dom';

// import Header from '../../../components/Header/Header';
// import SubHeader from '../../../components/Header/SubHeader/SubHeader';
// import Footer from '../../../components/Footer/Footer';

// import './ProductDetail.css';

// const ProductDetail = () => {

//   return (
//     <>
//     <Header />
//     <SubHeader />
//     <div className="product-detail">

//     </div>
//     <Footer />
//     </>
//   );
// }

// export default ProductDetail;

import React, { useState } from 'react';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import './ProductDetail.css';
import Axios from 'axios';
import { TOKEN_HANDLER } from '../../../../shared/TOKEN_HANDLER';
import imageCompression from 'browser-image-compression';

const ProductDetail = () => {
  const [file, setFile] = useState(null);
  const [uploadfile, setUploadFile] = useState(null);
  const [error, setError] = useState(null);

  const { imgUrl } = React.useContext(TOKEN_HANDLER);

  const types = ['image/png', 'image/jpeg', 'image/jpg'];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      console.log('originalFile instanceof Blob', selected instanceof Blob); // true
      console.log(`originalFile size ${selected.size / 1024 / 1024} MB`);
    
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

  const upload1 = () => {
    if(imgUrl) {
      let token = localStorage.getItem('token');
      Axios.post('https://buysell-612c1.firebaseio.com/images.json?auth=' + token, {
          imgurl: imgUrl
        })
        .then(resp => {
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
        })
        return false;
    }
  }



  return (
    <>
    <form className="">
      <label>
        <input type="file" onChange={handleChange} />
        <span>+</span>
      </label>
      <button onClick={upload} type="button" >Upload</button>
      <div className="output">
        { error && <div className="error">{ error }</div>}
        { file && <div>{ file.name }</div> }
        { uploadfile && <ProgressBar file={uploadfile} setFile={setUploadFile} /> }
        { imgUrl && <img src={imgUrl} alt="..." />}
      </div>
    </form>
    <button type="button" onClick={upload1}>Upload1</button>
    </>
  );
}

export default ProductDetail;