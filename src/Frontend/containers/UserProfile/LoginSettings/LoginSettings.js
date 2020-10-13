import React from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/core/styles";
import "./LoginSettings.scss";
import Axios from "axios";
import { THEME } from "../../../../shared/THEME";
import { STATE_HANDLER } from "../../../../shared/STATE_HANDLER";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import SubHeader from "../../../components/Header/SubHeader/SubHeader";
import ProgressLoader from "../../../components/ProgressLoader/ProgressLoader";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

import PasswordChange from './PasswordChange';
import { CircularProgress } from "@material-ui/core";

const initialState = {
  email: "",
  name: "",
  nameError: "",
  password: "",
  phone: "",
  emailError: "",
  // rememberMe: false,
  error: null,
  errorMessage: "",
  redirect: false,
  returnSecureToken: true,
  isLoading: true
};

const LoginSettings = () => {
  const { userInfo } = React.useContext(STATE_HANDLER);
  const [login, setLogin] = React.useState(initialState);
  const [showModel, setShowModel] = React.useState(false);
  const [showChangeEmail, setShowChangeEmail] = React.useState(false);
  const [showUnameChange, setShowUnameChange] = React.useState(false);
  const [showMobileChange, setShowMobileChange] = React.useState(false);
  const [userDataParent, setUserDataParent] = React.useState('');
  const [changeEmailEnable, setChangeEmailEnable] = React.useState(true);
  const [unameChangeEnable, setUnameChangeEnable] = React.useState(true);
  const [mobileChangeEnable, setMobileChangeEnable] = React.useState(true);

  const formSubmit = () => {};

  const showPasswordChangeModel = () => {
    setShowModel(true);
    document.getElementById("root").style.overflow = "hidden";
  }

  const ShowChngEmail = () => {
    setShowChangeEmail(true);
    setChangeEmailEnable(false);
  };

  const showUnamChange = () => {
    setShowUnameChange(true);
    setUnameChangeEnable(false);
  };

  const showMblChange = () => {
    setShowMobileChange(true);
    setMobileChangeEnable(false);
  };

  let tk = localStorage.getItem("token");

  React.useEffect(() => {
    if (tk) {
      Axios.get('https://buysell-612c1.firebaseio.com/usersdata.json?auth=' + tk)
        .then((resp) => {
          // console.log(resp);
          if (resp.status === 200) {
            // console.log(resp);
            // console.log(resp.data);
            Object.keys(resp.data).map((id) => {
              if (resp.data[id].user.id === userInfo.uId) {
                // console.log(resp.data[ds].user.data.name);
                setLogin({
                  isLoading: false,
                  email: resp.data[id].user.data.email,
                  name: resp.data[id].user.data.name,
                  phone: resp.data[id].user.data.mobile,
                });
                setUserDataParent(id);
              }
              return null;
            });
          }
        })
        .catch((err) => {
          console.log("From Login" + err);
          console.log("From Login" + err.response);
        });
    }
  }, [tk, userInfo]);

  const chngEmail = () => {
    const emailExp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if(emailExp.test(login.email)) {
      Axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`,{
        idToken: tk,
        email: login.email,
        returnSecureToken: true
      }).then(resp => {
        console.log(resp);
        Axios.patch(`https://buysell-612c1.firebaseio.com/usersdata/${userDataParent}/user/data.json?auth=${tk}`,{
          email: login.email
        })
          .then(resp1 => {
            console.log(resp1);
            if (resp1.status === 200) {
              console.log(resp1);
              console.log(resp1.data);
            }
          }).catch(err1 => {
            console.log(err1);
            console.log(err1.response);
          })
        localStorage.clear();
        // return <Redirect to="/login" />;
      }).catch(err => {
        console.log(err);
        console.log(err.response);
        if(err.response.data.error.message === "EMAIL_EXISTS") {
          setLogin({...login, emailError: "Email already registered with another account."})
        }
      })
      setChangeEmailEnable(true);
      console.log("working");
    }
    else {
      setChangeEmailEnable(false);
      console.log("not working");
    }
  };

  const unameChange = () => {
    setShowUnameChange(true);
    console.log("userdatajson");
    if(login.name.length > 4) {
      Axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`,{
        idToken: tk,
        displayName: login.name,
        returnSecureToken: true
      }).then(resp => {
        console.log(resp);
          console.log("userdatajson");
          Axios.patch(`https://buysell-612c1.firebaseio.com/usersdata/${userDataParent}/user/data.json?auth=${tk}`,{
            name: login.name
          })
            .then(resp => {
              console.log(resp);
              if (resp.status === 200) {
                console.log(resp);
                console.log(resp.data);
              }
            }).catch(err => {
              console.log(err);
              console.log(err.response);
            })
      }).catch(err => {
        console.log(err);
        console.log(err.response);
      })
    }
    else {
      setChangeEmailEnable(false);
      console.log("not working");
      setLogin({...login, nameError: "Username should be greater than 4."})
    }
  };

  const mobileChange = () => {
    setShowMobileChange(true);
    let phoneReg = /\d{10}/;
    if(phoneReg.test(login.phone) || login.phone.length === 10) {
      Axios.patch(`https://buysell-612c1.firebaseio.com/usersdata/${userDataParent}/user/data.json?auth=${tk}`,{
        mobile: login.phone
      })
        .then(resp => {
          console.log(resp);
          if (resp.status === 200) {
            console.log(resp);
            console.log(resp.data);
          }
        }).catch(err => {
          console.log(err);
          console.log(err.response);
        })
      // setChangeEmailEnable(true);
      // console.log("working");
    }
    else {
      setChangeEmailEnable(false);
      console.log("not working");
    }
  };


  return (
    <>
      <ProgressLoader />
      <Header />
      <div className="main-content">
        <SubHeader />
        <div className="container">
          <div className="loginsettings">
            <form noValidate autoComplete="off" onSubmit={formSubmit}>
              {!login.isLoading ? (
                <ThemeProvider theme={THEME}>
                <div className="form-group">
                  <div className="d-flex align-items-center">
                    <TextField
                      label="Name"
                      type="text"
                      required
                      error={login.nameError}
                      helperText={login.nameError}
                      disabled={unameChangeEnable ? unameChangeEnable : false}
                      value={
                        login.name
                      }
                      onChange={(e) =>
                        setLogin({ ...login, name: e.target.value })
                      }
                      color="primary"
                    />
                    <div className="edit-icn-pad">
                      <CreateOutlinedIcon
                        onClick={() => showUnamChange()}
                      />
                    </div>
                  </div>
                  {
                    showUnameChange && 
                    <div className="email-save-btn">
                      <Button
                        variant="contained"
                        type="button"
                        color="primary"
                        onClick={() => unameChange()}
                      >
                        Save
                      </Button>
                    </div>
                  }
                </div>
                <div className="form-group">
                  <div className="d-flex align-items-center">
                    <TextField
                      label="Email Address"
                      type="email"
                      error={login.emailError}
                      required
                      helperText={login.emailError}
                      disabled={changeEmailEnable ? changeEmailEnable : false}
                      value={
                        login.email
                      }
                      onChange={(e) =>
                        setLogin({ ...login, email: e.target.value })
                      }
                      color="primary"
                    />
                    <div className="edit-icn-pad">
                      <CreateOutlinedIcon
                        onClick={() => ShowChngEmail()}
                      />
                    </div>
                  </div>
                  {
                    showChangeEmail && 
                    <div className="email-save-btn">
                      <Button
                        variant="contained"
                        type="button"
                        color="primary"
                        onClick={() => chngEmail()}
                      >
                        Save
                      </Button>
                    </div>
                  }
                </div>
                <div className="form-group">
                  <div className="d-flex align-items-center">
                    <TextField
                      label="Password"
                      type="password"
                      value="*********"
                      disabled={true}
                      color="primary"
                    />
                    <div className="edit-icn-pad">
                      <CreateOutlinedIcon
                        onClick={() => showPasswordChangeModel()}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="d-flex align-items-center">
                    <TextField
                      label="Mobile Number"
                      required
                      disabled={mobileChangeEnable ? mobileChangeEnable : false}
                      helperText={login.phoneError}
                      error={login.error}
                      value={
                        login.phone
                      }
                      type="phone"
                      onChange={(e) =>
                        setLogin({ ...login, phone: e.target.value })
                      }
                    ></TextField>
                    <div className="edit-icn-pad">
                      {/* <div className="edit-icn-pad-phone"></div> */}
                      <CreateOutlinedIcon
                        onClick={() => showMblChange()}
                      />
                    </div>
                  </div>
                  {
                    showMobileChange && 
                    <div className="email-save-btn">
                      <Button
                        variant="contained"
                        type="button"
                        color="primary"
                        onClick={() => mobileChange()}
                      >
                        Save
                      </Button>
                    </div>
                  }
                </div>
              </ThemeProvider>
              ) : (
                  <div className="category--loader">
                    <CircularProgress />
                  </div>
                )
              }
            </form>
            <PasswordChange show={showModel} setshow={setShowModel} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginSettings;
