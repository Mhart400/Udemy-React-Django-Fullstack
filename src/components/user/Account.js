import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  Typography,
  FormControl,
  InputLabel,
  Input,
  Divider,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { auth, uploadAvatar } from "../../services/user-services";
import { useAuth } from "../../hooks/useAuth";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { changePassword } from "../../services/user-services";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: "10px",
  },
  gridContainer: {
    backgroundColor: theme.colors.bgColor,
    marginBottom: "10px",
    padding: "10px 5px",
  },
  gridItem: {
    padding: "20px px",

    backgroundColor: theme.colors.bgLightColor,
    color: "black",
  },
  textField: {
    margin: "0px 10px 20px 0",
  },
  form: {
    margin: "20px 0",
    padding: "0 0 0 20px",
  },
  subtitle: {
    fontWeight: 700,
    padding: "5px",
  },
}));

const Account = () => {
  const classes = useStyles();

  const { authData } = useAuth();

  const [image, setImage] = useState(null);

  const uploadFile = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("image", image, image.name);
    const uploadedData = await uploadAvatar(
      authData.user.profile.id,
      uploadData
    );
    if (uploadedData) {
      enqueueSnackbar("Avatar Uploaded!", { variant: "success" });
    } else {
      enqueueSnackbar("Avatar uplaod failed", { variant: "error" });
    }
    console.log(uploadedData);
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const passMatch = () => {
    return newPassword === repeatPassword;
  };

  const oldPwRef = useRef();

  const resetPassFields = () => {
    setOldPassword("");
    setNewPassword("");
    setRepeatPassword("");
    oldPwRef.current.focus();
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  let error = "";

  const changePass = async (e) => {
    e.preventDefault();
    // if (oldPassword === authData.user.password) {}
    if (passMatch()) {
      const regData = await changePassword(
        { old_password: oldPassword, new_password: newPassword },
        authData.user.id,
        authData.token
      ).catch((e) => (error = e));
      if (regData) {
        handleClick("Password Changed Successfully!", "success");
        resetPassFields();
        const data = await auth({});
      }
      if (error.length > 1) {
        handleClick(error, "error");
      } else {
        handleClick("Passwords don't match", "error");
        resetPassFields();
      }
    }
  };

  return (
    <div>
      <h1> Account Details </h1>
      <Link to="/">Back</Link>
      <br />
      <Grid
        container
        spacing={0}
        alignItems="flex-end"
        className={classes.gridContainer}
      >
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Change your Avatar
          </Typography>

          <form onSubmit={uploadFile} className={classes.form}>
            <TextField
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              variant="filled"
            />

            <br />
            <br />
            <Button type="submit">Upload</Button>
          </form>
          <Divider variant="middle" />
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Change your Password
          </Typography>

          <form onSubmit={changePass} className={classes.form}>
            <FormControl>
              <InputLabel htmlFor="username">Old Password</InputLabel>
              <Input
                id="oldPassword"
                type="text"
                startAdornment={<VpnKeyIcon />}
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
                className={classes.textField}
                inputProps={{ ref: oldPwRef }}
              />
            </FormControl>
            <br />

            <FormControl>
              <InputLabel htmlFor="newPassword">New Password</InputLabel>
              <Input
                id="newPassword"
                type="text"
                startAdornment={<VpnKeyIcon />}
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                className={classes.textField}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="repeatPassword">
                Repeat New Password
              </InputLabel>
              <Input
                id="repeatPassword"
                type="text"
                startAdornment={<VpnKeyIcon />}
                onChange={(e) => setRepeatPassword(e.target.value)}
                value={repeatPassword}
                className={classes.textField}
              />
            </FormControl>

            <Button type="submit">Change Password</Button>
            <Button onClick={resetPassFields}>Reset</Button>
          </form>
          <Divider variant="middle" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
