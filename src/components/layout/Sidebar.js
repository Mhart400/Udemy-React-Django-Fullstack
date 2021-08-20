import { Button } from "@material-ui/core";
import { useState, useRef} from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { auth } from "../../services/user-services";
import { useAuth } from "../../hooks/useAuth";
import { Link, useHistory } from "react-router-dom";
import User from "../user/User";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: "10px",
  },
  field: {
    marginBottom: "20px",
  },
}));

const Sidebar = () => {
  const classes = useStyles();

  const initialValues = {
    username: "",
    password: "",
    showPassword: false,
  };

  const [values, setValues] = useState(initialValues);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const usernameRef = useRef();

  const { authData, setAuth } = useAuth();

  const logout = () => {
    setAuth(null);
  };

  const { enqueueSnackbar } = useSnackbar();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await auth({
      username: values.username,
      password: values.password,
    });
    console.log(data);
    if (data.token) {
      setAuth(data);
      enqueueSnackbar('Logged In!', {variant: 'success'})
      history.push('/')
    } else {
      logout();
      history.push('/')
      enqueueSnackbar('Invalid Username or Password!', {variant: 'error'})
      
      usernameRef.current.focus()
    }
  };

  const history = useHistory();

  const account = () => {
    history.push('/account')
  }

  return (
    <div className="sidebar">
      {!authData ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className={classes.margin}>
              <Grid
                container
                spacing={1}
                alignItems="flex-end"
                className={classes.field}
              >
                <FormControl>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    id="username"
                    type="text"
                    startAdornment={<AccountCircle />}
                    onChange={handleChange("username")}
                    value={values.username}
                    inputProps={{ref: usernameRef}}
                    autoFocus
                  />
                </FormControl>
              </Grid>
              <Grid
                container
                spacing={1}
                alignItems="flex-end"
                className={classes.field}
              >
                <Grid item>
                  <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      id="password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      startAdornment={<VpnKeyIcon />}
                      name="password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </div>
            <Button color="primary" variant="contained" type="submit">
              Login
            </Button>
            <Button
              onClick={() => {
                setValues(initialValues);
                usernameRef.current.focus();
              }}
            >
              Reset
            </Button>
            <br />
            <br />
          </form>
          <Link to="/register">REGISTER for an account</Link>
        </>
      ) : (
        <>
          <User user={authData.user} />
          <Button color="primary" variant="contained" onClick={() => (logout(), history.push('/'))}>
            Logout
          </Button>
          <Button color="primary" variant="contained" onClick={account}>
            My Account
          </Button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
