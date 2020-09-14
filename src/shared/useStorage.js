import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { projectStorage } from './firebase/config';
import { TOKEN_HANDLER } from './TOKEN_HANDLER';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const {setImgUrl, formData} = React.useContext(TOKEN_HANDLER);


  useEffect(() => {
    // references
    const storageRef = projectStorage.ref();
    
    let spaceRef = storageRef.child('images/'+new Date().getTime().toString()+file.name);
    let token = localStorage.getItem("token");
    let uId = localStorage.getItem("userId");

    spaceRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const url = await spaceRef.getDownloadURL();
      console.log(url);
      setUrl(url);
      setImgUrl(url);
      await Axios.post('https://buysell-612c1.firebaseio.com/addproduct.json?auth=' + token, {
        userId: uId,
        data: {
          imgurl: url,
          productName: formData.productName,
          description: formData.description,
          pcategory: formData.pcategory,
          price: formData.price,
        }
        })
      .then(resp => {
        console.log(resp);
        if (resp.status === 200) {
          console.log(resp);
        } 
      })
      .catch(err => {
        console.log(err.response);
        console.log(err);
      })
    });

    
  }, [file, setImgUrl, formData]);

  return { progress, url, error };
}

export default useStorage;