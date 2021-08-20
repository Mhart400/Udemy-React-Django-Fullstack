import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import User from "../user/User";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  headers: {
    fontWeight: "bold",
    textDecoration: "underline",
  },
  time: {
    fontSize: "0.7rem",
    paddingLeft: "10px",
    whiteSpace :'nowrap',
  },
  commentRow: {
    display: "flex",
    alignItems: "center",
    padding: "10px 10px 10px 2px",
  },
}));

export default function Comment({ comment, user }) {
  const classes = useStyles();

  return (
    <>
      <Grid container  className={classes.commentRow}>
        <Grid item xs={2}>
          <User user={user} />
        </Grid>
        <Grid item xs={8}>
          <span>: {comment.description}</span>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body2" className={classes.time}>{comment.time.split('T')[0]} &nbsp; {comment.time.split('T')[1].substring(0,5)}</Typography>
        </Grid>
      </Grid>
    </>
  );
}
