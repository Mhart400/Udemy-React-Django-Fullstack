import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useState, useRef, useEffect } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Input } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { auth } from "../services/user-services";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: "10px",
  },
  gridContainer: {
    backgroundColor: theme.colors.bgColor,
    border: "1px solid black",
    marginBottom: "10px",
  },
  field: {
    marginBottom: "20px",
  },
  form: {
    marginTop: "25px",
    padding: "5px",
  },
  input: {
    color: "white",
  },
  inputLabel: {
    color: "#EAEAEA",
  },
}));

const Register = () => {
  const classes = useStyles();

  const initialValues = {
    email: "",
    username: "",
    password: "",
    password2: "",
    showPassword: false,
  };

  const [values, setValues] = useState(initialValues);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const usernameRef = useRef();

  const { authData, setAuth } = useAuth();

  const passMatch = () => {
      return (values.password === values.password2);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passMatch()) {
        console.log('all good', values.password2, values.password, values.username)
    } else {
        console.log('passwords dont match')
    }
  };
  return (
    <div>
      <h1> Register </h1>
      <Link to="/">Back</Link>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.margin}>
          <Grid
            container
            spacing={3}
            alignItems="flex-end"
            className={classes.gridContainer}
          >
            <Grid item xs={12}>
              <FormControl>
                <InputLabel htmlFor="username" className={classes.inputLabel}>
                  Username
                </InputLabel>
                <Input
                  id="username"
                  type="text"
                  startAdornment={<AccountCircle />}
                  onChange={handleChange("username")}
                  value={values.username}
                  ref={usernameRef}
                  autoFocus
                  className={classes.input}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel htmlFor="email" className={classes.inputLabel}>
                  Email
                </InputLabel>
                <Input
                  id="email"
                  type="email"
                  startAdornment={<AccountCircle />}
                  onChange={handleChange("email")}
                  value={values.email}
                  className={classes.input}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel htmlFor="password" className={classes.inputLabel}>
                  Password
                </InputLabel>
                <Input
                  id="password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  startAdornment={<VpnKeyIcon />}
                  name="password"
                  className={classes.input}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl>
                <InputLabel htmlFor="password2" className={classes.inputLabel}>
                  Confirm Password
                </InputLabel>
                <Input
                  id="password2"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password2}
                  onChange={handleChange("password2")}
                  startAdornment={<VpnKeyIcon />}
                  name="password2"
                  className={classes.input}
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <Button color="primary" variant="contained" type="submit">
          Register
        </Button>

        <Button
          onClick={() => {
            setValues(initialValues);
            usernameRef.current.focus();
          }}
          color="primary"
          variant="outlined"
        >
          Reset
        </Button>
        <br />
        <br />
      </form>
    </div>
  );
};

export default Register;
