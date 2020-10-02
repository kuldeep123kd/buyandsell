import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";

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

const PasswordChange = (props) => {

  const classes = useStyles();

  const [password, setPassword] = React.useState({
    current: "",
    password: "",
    confirmPassword: "",
    passwordError: null,
    cPasswordError: null,
    error: false,
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const IsPasswordValid = password => {
    // regex for checking a-z
    let regex_1 = /[a-z]+/;
    let regex_2 = /[A-Z]+/;
    let regex_3 = /[0-9]+/;

    if (!regex_1.test(password)) {
      return false;
    }

    if (!regex_2.test(password)) {
      return false;
    }

    if (!regex_3.test(password)) {
      return false;
    }

    if (password.length < 8) {
      return false;
    }

    return true;

  }

  const validateForm1 = () => {

    let initialError = {
      passwordError: null,
      cPasswordError: null,
      error: null
    }

    if (password.password !== password.confirmPassword) {
      initialError.cPasswordError = "The input in the confirm password field don't match with the Password field. Please try again."
      initialError.error = true;
    }

    // check for password length and regex
    if (!IsPasswordValid(password.password)) {
      initialError.passwordError = "Password should be alphanumeric with at least 8 characters long. It must contain at least one capital letter, one small letter and one numeral."
      initialError.error = true;
    }

    const temp = { ...password, ...initialError }
    setPassword(temp);
    return !initialError.error;
  }

  const PasswordChangeForm = (e) => {
    e.preventDefault();
    const em = localStorage.getItem("userEmail");
    const tk = localStorage.getItem("token");
    setPassword({ ...password, error: null });
    if (tk) {
      Axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
        {
          email: em,
          password: password.current,
          returnSecureToken: true,
        }
      )
        .then((resp) => {
          // console.log(resp)
          if (resp.status === 200) {
            // setMessage("Password changed successfully")
            console.log(resp);
            const frm = validateForm1();
            if (frm) {
              console.log(resp);
              Axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`,
                {
                  idToken: tk,
                  password: password.password,
                  returnSecureToken: true,
                }
              )
                .then((resp) => {
                  console.log(resp);
                })
                .catch((err) => {
                  console.log(err);
                  console.log(err.response);
                  if (err.response.status === 400) {
                    if (err.response.data.error.message === "MISSING_PASSWORD") {
                      // it means we have to set error = 1
                      setPassword({ ...password, passwordError: "Please enter new password" });
                    }
                  }
                });
            }

          }
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          if (err.response.status === 400) {
            if (err.response.data.error.message === "MISSING_PASSWORD") {
              // it means we have to set error = 1
              setPassword({ ...password, error: 1 });
            }
            else if (err.response.data.error.message === "Incorrect password format") {
              // error = 2
              setPassword({ ...password, error: 2 });
            }
            else if (err.response.data.error.message === "passwords didn't match") {
              // error = 3
              setPassword({ ...password, error: 3 });
            }
          }
        });
    }
  };

  const closeModel = () => {
    props.setshow(false);
    setPassword({
      current: "",
      password: "",
      password_1: "",
    })
    document.getElementById("root").style.overflow = "unset";
  }

  return (
    <div className={`password-change position-fixed w-100 h-100 ${props.show ? "password-change-show" : ''}`}>
      <div className="close-icon position-absolute"><CloseRoundedIcon color="primary" onClick={() => closeModel()} /></div>
      <form
        noValidate
        autoComplete="off"
        id="passwordchange"
        onSubmit={PasswordChangeForm}
        className="position-relative"
      >
        <h1>Change Password</h1>
        <div className="change-pass position-relative">
          <TextField
            className={classes.root}
            type="password"
            id="outlined-basic"
            label="Current password"
            variant="outlined"
            value={password.current}
            required
            onChange={(e) =>
              setPassword({ ...password, current: e.target.value })
            }
          />
          <small
            className="change-pass-msg error-text"
            style={{
              display: password.error === 1 ? "block" : "none",
            }}
          >
            The password provided didn't match with our records.
            Please try again
            </small>
        </div>

        <div className="change-pass position-relative">
          <FormControl className={classes.root} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              New Password
                </InputLabel>
            <OutlinedInput
              label="New Password"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              required
              onChange={(e) =>
                setPassword({ ...password, password: e.target.value })
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <Visibility />
                    ) : (
                        <VisibilityOff />
                      )}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <div
            className="change-pass-msg error-text"
          >
            {password.passwordError}
          </div>
        </div>
        <div className="change-pass position-relative">
          <FormControl className={classes.root} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password1">
              Confirm Password
                </InputLabel>
            <OutlinedInput
              label="Confirm Password"
              id="outlined-adornment-password1"
              type={showPassword ? "text" : "password"}
              value={password.confirmPassword}
              required
              onChange={(e) =>
                setPassword({
                  ...password,
                  confirmPassword: e.target.value,
                })
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <Visibility />
                    ) : (
                        <VisibilityOff />
                      )}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <small
            className="change-pass-msg error-text"
          >
            {password.cPasswordError}
          </small>
        </div>
        <div className="submit-btns">
          <Button variant="contained" type="submit" color="primary">
            Save Changes
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={() => closeModel()}
          >
            Cancel
              </Button>
        </div>
      </form>
    </div>
  );
}

export default PasswordChange;