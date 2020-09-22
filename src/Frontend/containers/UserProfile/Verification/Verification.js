import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import Axios from "axios";
import qs from 'qs';

const Verification = (props) => {

  const mode = qs.parse(props.location.search, { ignoreQueryPrefix: true }).mode;
  const code = qs.parse(props.location.search, { ignoreQueryPrefix: true }).oobCode;

  const [verify, setVerify] = React.useState('');

  useEffect(() => {
    Axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`,
    {
      oobCode: code
    }
    )
    .then(resp => {
      console.log(resp);
      if(resp.status === 200) {
        setVerify('Verified Successfully');
      }
    })
    .catch(err => {
      console.log(err);
      console.log(err.response);
      if(err.response.data.error.message === 'EXPIRED_OOB_CODE') {
        setVerify('Link Expired');
      }
      else if(err.response.data.error.message === 'INVALID_OOB_CODE') {
        setVerify('Already Verified');
      }
      else if(err.response.data.error.message === 'USER_DISABLED') {
        setVerify('User Blacklisted');
      }
      else if(err.response.data.error.message === 'EMAIL_NOT_FOUND') {
        setVerify('Email not found, Please register to new account');
      }
      else if (err.response.data.error.message === "INVALID_REQ_TYPE : Unsupported request parameters.") {
        setVerify('Link Expired');
      }
    })
  },[code])

  return (
    <>
      <div>
        <h1>{verify}</h1>
        <span>Go to <Link to="/" >Profile</Link></span>
      </div>
    </>
  );
}

export default Verification;