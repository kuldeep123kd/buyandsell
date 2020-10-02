import React from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/core/styles";
import "./LoginSettings.scss";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { THEME } from "../../../../shared/THEME";
import { TOKEN_HANDLER } from "../../../../shared/TOKEN_HANDLER";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import SubHeader from "../../../components/Header/SubHeader/SubHeader";
import ProgressLoader from "../../../components/ProgressLoader/ProgressLoader";
import Login from "../../Login/Login";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

import PasswordChange from './PasswordChange';
import { CircularProgress } from "@material-ui/core";

const initialState = {
  email: "",
  name: "",
  password: "",
  phone: "",
  // rememberMe: false,
  error: null,
  errorMessage: "",
  redirect: false,
  returnSecureToken: true,
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& label.MuiInputLabel-outlined": {
      display: "flex",
    },
    "& label.Mui-focused": {
      color: "#3772FF",
      backgroundColor: "#fff",
      padding: "0 5px",
      marginLeft: "-3.5px",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#CED4DA",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3772FF",
        borderWidth: "1px",
        boxShadow: "0 0 5px rgba(55, 114, 255, 0.5)",
      },
    },
  },
}));

const LoginSettings = () => {
  const classes = useStyles();
  const { userInfo } = React.useContext(TOKEN_HANDLER);
  const [login, setLogin] = React.useState(initialState);
  const [userData, setUserData] = React.useState({
    user: [],
    isLoading: true
  });
  const [showModel, setShowModel] = React.useState(false);

  const formSubmit = () => {};

  const showPasswordChangeModel = () => {
    setShowModel(true);
    document.getElementById("root").style.overflow = "hidden";
  }

  React.useEffect(() => {
    let tk = localStorage.getItem("token");
    if (tk) {
      Axios.get('https://buysell-612c1.firebaseio.com/usersdata.json?auth=' + tk)
        .then((resp) => {
          console.log(resp);
          if (resp.status === 200) {
            setUserData({
              user: resp.data
            });
          }
        })
        .catch((err) => {
          console.log("From Login" + err);
          console.log("From Login" + err.response);
        });
    }
  }, []);


  return (
    <>
      <ProgressLoader />
      <Header />
      <div className="main-content">
        <SubHeader />
        <div className="container">
          <div className="loginsettings">
            <form noValidate autoComplete="off" onSubmit={formSubmit}>
              {!userData.isLoading ? (
                Object.keys(userData.user).map((ds, key) => {
                  if (userData.user[ds].user.id === userInfo.uId) {
                    return (
                      <ThemeProvider theme={THEME} key={key}>
                        <div className="form-group d-flex align-items-center">
                          <TextField
                            label="Name"
                            type="text"
                            required
                            disabled={true}
                            value={login.name ? login.name : userData.user[ds].user.data.name}
                            onChange={(e) => setLogin({ ...login, name: e.target.value })}
                            error={login.error}
                            className={classes.root}
                            variant="outlined"
                            color="primary"
                          />
                          <div className="edit-icn-pad"><CreateOutlinedIcon onClick={() => showPasswordChangeModel()} /></div>
                        </div>
                        <div className="form-group d-flex align-items-center">
                          <TextField
                            label="Email Address"
                            type="email"
                            error={login.error}
                            required
                            disabled={true}
                            value={login.email ? login.email : userData.user[ds].user.data.email}
                            onChange={(e) =>
                              setLogin({ ...login, email: e.target.value })
                            }
                            className={classes.root}
                            variant="outlined"
                            color="primary"
                          />
                          <div className="edit-icn-pad"><CreateOutlinedIcon onClick={() => showPasswordChangeModel()} /></div>
                        </div>
                        <div className="form-group d-flex align-items-center">
                          <TextField
                            label="Password"
                            type="password"
                            value="*********"
                            disabled={true}
                            className={classes.root}
                            variant="outlined"
                            color="primary"
                          />
                          <div className="edit-icn-pad"><CreateOutlinedIcon onClick={() => showPasswordChangeModel()} /></div>
                        </div>
                        <div className="form-group d-flex align-items-center">
                          <TextField
                            className={classes.root}
                            label="Mobile Number"
                            variant="outlined"
                            required
                            disabled={true}
                            // helperText={login.phoneError}
                            error={login.error}
                            value={login.phone ? login.phone : userData.user[ds].user.data.mobile}
                            type="phone"
                            onChange={(e) =>
                              setLogin({ ...login, phone: e.target.value })
                            }
                          ></TextField>
                          <div className="edit-icn-pad"><CreateOutlinedIcon onClick={() => showPasswordChangeModel()} /></div>
                        </div>
                      </ThemeProvider>
                    );
                  }
                  return null;
                })
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
