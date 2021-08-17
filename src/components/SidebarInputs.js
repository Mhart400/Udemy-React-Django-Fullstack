import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Input } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Label } from "@material-ui/icons";
import { InputLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: "10px",
  },
}));

export default function SidebarInputs() {
  const classes = useStyles();
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.margin}>
      <Grid container spacing={1} alignItems="flex-end" >
      <FormControl>
            <InputLabel htmlFor="username">
              Username
            </InputLabel>
            <Input
              id="username"
              type="text"
              
              startAdornment={<AccountCircle />}
              
            />
          </FormControl>
      </Grid>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              onChange={handleChange("password")}
              startAdornment={<VpnKeyIcon />}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
