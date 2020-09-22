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

  const [login, setLogin] = React.useState(initialState);

  const formSubmit = () => {};

  return (
    <>
      <ProgressLoader />
      <Header />
      <div className="main-content">
        <SubHeader />
        <div className="loginsettings">
          <form noValidate autoComplete="off" onSubmit={formSubmit}>
            <ThemeProvider theme={THEME}>
              <div className="form-group">
                <TextField
                  label="Name"
                  type="text"
                  required
                  value={login.name}
                  onChange={(e) => setLogin({ ...login, name: e.target.value })}
                  error={login.error}
                  className={classes.root}
                  variant="outlined"
                  color="primary"
                />
              </div>
              <div className="form-group">
                <TextField
                  label="Email Address"
                  type="email"
                  error={login.error}
                  required
                  value={login.email}
                  onChange={(e) =>
                    setLogin({ ...login, email: e.target.value })
                  }
                  className={classes.root}
                  variant="outlined"
                  color="primary"
                />
              </div>
              <div className="form-group">
                <TextField
                  label="Password"
                  type="password"
                  error={login.error}
                  required
                  value={login.password}
                  onChange={(e) =>
                    setLogin({ ...login, password: e.target.value })
                  }
                  className={classes.root}
                  variant="outlined"
                  color="primary"
                />
              </div>
              <div className="form-group">
                <TextField
                  className={classes.root}
                  label="Mobile Number"
                  variant="outlined"
                  required
                  // helperText={login.phoneError}
                  error={login.error}
                  value={login.phone}
                  type="phone"
                  onChange={(e) =>
                    setLogin({ ...login, phone: e.target.value })
                  }
                ></TextField>
              </div>
              {/* <div className="form-group text-center">
                <Button variant="contained" type="submit" color="primary">
                  Login
                </Button>
              </div> */}
            </ThemeProvider>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginSettings;
