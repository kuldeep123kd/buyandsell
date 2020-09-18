import React from 'react';

import Routes from './Frontend/Routes';

// token management
import {TOKEN_HANDLER} from './shared/TOKEN_HANDLER';
// import {BASEURL} from './shared/BASEURL'; 
import axios from 'axios'

function App() {

  const [token, setToken] = React.useState();
  const [showcategories, setShowcategories] = React.useState(false);
  const [imgUrl, setImgUrl] = React.useState('');
  const [product, setFormProduct] = React.useState([]);
  // const [userInfo, setUserInfo] = React.useState({username: '', profile_pic: ''})

  const showCat = () => {
    setShowcategories(true);
  }

  const RefreshToken = (token) => {
    let refreshLocation;
    console.log("REFRESHING TOKEN",token)
    let refresh
    // first check in session and then in local
    if (sessionStorage.getItem('refreshToken')) {
      refresh = sessionStorage.getItem('refreshToken')
      refreshLocation = 'session'
    }
    else {
      refresh = localStorage.getItem('refreshToken') 
      refreshLocation = 'local'
    }
    
    if(token && refresh) {
      axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_API_KEY}`,{
        grant_type: 'refresh_token',
        refresh_token: refresh
      })
      .then(resp => {
        // console.log(resp);
        if (resp.status === 200) {
          ModifyToken(resp.data.access_token, refreshLocation)
        }
      })
      .catch(err => {
        console.log("Hello"+err.response)
        if(err.response?.status === 401) {
          // clear the interval and also localStorage
          DeleteToken()
        }
      })
    }
    
    
  }
  
  const getToken = () => {
    // Need to decide whether the token should be refreshed first and then returned
    return token
  }

  const ModifyToken = (input_token,storage="local") => {
    // takes token as input
    // makes changes in localStorage
    if (storage === "local") {
      localStorage.setItem('token',input_token)
    }
    else {
      sessionStorage.setItem('token',input_token)
    }
    setToken(input_token)
  }

  const DeleteToken = () => {
    if (sessionStorage.getItem('token')) {
      sessionStorage.clear()  
    }
    else {
      localStorage.clear()
    }
    setToken('')

  }

  React.useEffect(() => {
    // first check in session and then in local
    let token;
    if (sessionStorage.getItem('token')) {
      console.log("session")
      token = sessionStorage.getItem('token')
    }
    else {
      console.log("local")
      token = localStorage.getItem('token')
    }

    if (token !== "undefined" && token) {
      RefreshToken(token)
    }
  },[])

  React.useEffect(()=>{
    console.log("APP RELOADED")
    // const expiresin = localStorage.getItem('expiresIn');
    const interval = setInterval(()=>{
      RefreshToken(token)
      console.log("APP RELOADED Token")
    },60*1000*50)  

    return () => clearInterval(interval)
    
  },[token])

  return (
    <>
    <TOKEN_HANDLER.Provider
      value={{getToken, ModifyToken, DeleteToken, showCat, showcategories, imgUrl, setImgUrl, product, setFormProduct}}
    >
      <Routes />
    </TOKEN_HANDLER.Provider>
    </>
  );
}

export default App;
