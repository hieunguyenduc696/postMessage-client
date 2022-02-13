import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { commentPost } from '../../actions/posts'

import useStyles from "./styles";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('')
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  const commentRef = useRef()

  const handleClick = async () => {
      const finalComment = `${user.result.name}: ${comment}`

      const newComment = await dispatch(commentPost(finalComment, post._id))
      setComments(newComment)
      setComment('')

      commentRef.current.scrollIntoView({ behavior: 'smooth' }, false)
  }

  return (
    <div>
      <div className={classes.commentOuterContainer}>
        <div className={classes.commentInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments.map((c, i) => (
              <Typography key={i} gutterBottom variant="subtitle1" >
                  <strong>{c.split(': ')[0]}</strong>
                  {c.split(':')[1]}
              </Typography>
          ))}
          <div ref={commentRef} />
        </div>
        {user?.result?.name && (
            <div style={{width: '70%'}}>
                <Typography gutterBottom variant="h6">Write a Comment</Typography>
                <TextField
                    fullWidth
                    rows={4}
                    multiline
                    variant="outlined"
                    label="Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button style={{marginTop: '10px'}} variant="contained" color="primary" disabled={!comment} fullWidth onClick={handleClick}>
                    Comment
                </Button>
            </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
