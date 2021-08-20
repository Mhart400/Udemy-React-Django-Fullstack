import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useAuth } from "../../hooks/useAuth";
import { postComment } from '../../services/group-services'
import { PinDropSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  headers: {
    fontWeight: "bold",
    textDecoration: "underline",
  },
  newCommentDiv: {
      padding: 10,
  },
}));

export default function Comments({ group}) {
  const classes = useStyles();

  const getUser = (userId) => {
    return group.members.find((member) => member.user.id === userId).user;
  };

  const [newComment, setNewComment] = useState();

  const { authData } = useAuth();

  const sendComment = () => {
    //postcomment requires token, description, group, user
    postComment(
      authData.token,
      newComment,
      group.id,
      authData.user.id
    ).then( resp => {
      setNewComment('');
      group.comments.unshift(resp)
    })
  };


  return (
    <div>
      <hr />
      <h4 className={classes.headers}>Comments!</h4>
      <div className={classes.newCommentDiv}>
        <TextField
          label="New Comment"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button onClick={() => sendComment()} disabled={!newComment}>
          Post Comment
        </Button>
      </div>
      {group.comments.map((comment) => {
        return <Comment key={comment.id} user={getUser(comment.user)} comment={comment} />;
      })}
    </div>
  );
}
