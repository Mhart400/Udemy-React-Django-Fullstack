import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { uploadAvatar } from "../../services/user-services";
import { useAuth } from '../../hooks/useAuth'

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

const Account = () => {
  const classes = useStyles();

  const { authData } = useAuth();
  
  const [ image, setImage ] = useState(null);

  const uploadFile = async e => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append('image', image, image.name)
    const profileData = await uploadAvatar(authData.user.profile.id, uploadData)
    console.log(profileData);
  }



  return (
    <div>
      <h1> Account Details </h1>
      <Link to="/">Back</Link>
      <br/>
        <Grid
          container
          spacing={0}
          alignItems="flex-end"
          className={classes.gridContainer}
        >
          <Grid item xs={12}>
            <Typography variant='body1'>PLACEHOLDER</Typography>
          </Grid>
        </Grid>

        <form onSubmit={uploadFile}>
          <label>
            <p>Upload your Avatar</p>
            <TextField type="file" onChange={ e => setImage(e.target.files[0]) } variant='filled' />
          </label>
          <Button type='submit'>Upload</Button>
          
        </form>
    </div>
  );
};

export default Account;
