import React, {useEffect} from "react";
import Axios from "axios";
import qs from 'qs';

const Verification = (props) => {

  const code = qs.parse(props.location.search, { ignoreQueryPrefix: true }).oobCode;

  useEffect(() => {
    Axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`,
    {
      oobCode: code
    }
    )
    .then(resp => {
      console.log(resp);
    })
    .catch(err => {
      console.log(err);
      console.log(err.response);
    })
  },[code])

  return (
    <>
      <div>
        <h1>Verified</h1>
        <h1>Not Verified</h1>
      </div>
    </>
  );
}

export default Verification;