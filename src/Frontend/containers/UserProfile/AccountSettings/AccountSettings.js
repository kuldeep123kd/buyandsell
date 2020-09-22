import React from 'react';
import Axios from 'axios';
// import Progress from '../../../components/ProgressLoader/Progress';

const AccountSettings = () => {

  const tk = localStorage.getItem("token");

  const sendLink = () => {
    Axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_API_KEY}`, {
      requestType:"VERIFY_EMAIL",
      idToken: tk
    })
    .then(resp => {
      console.log(resp)
    })
    .catch(err => {
      console.log(err);
      console.log(err.response);
    })
  }

  return (
    <>
      {/* <Progress isAnimating={document.readyState === 'complete' ? false : true} /> */}
      <div className="accountsettings">
        <h1>Verify Email</h1>
        <button type="button" onClick={sendLink}>Send</button>
      </div>
    </>
  );
}


export default AccountSettings;