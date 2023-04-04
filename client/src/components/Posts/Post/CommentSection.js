import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Typography, TextField, Button } from '@mui/material';

import { commentPost } from '../../../actions/forum';

const CommentSection = ({ post }) => {
    //console.log("Comment section loaded");

    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');


    // rerender comments when post changes
    useEffect(() => {
        setComments(post.comments);
    }, [post])


    const commentSubmit = async () => {
        const submittedComment = `${user.username || user.name}: ${comment}`;

        dispatch(commentPost(submittedComment, post._id)).then(setComments([...comments, submittedComment]));
        setComment('');
    }

    return (
        <div>
            {user && (
                <div style={{ width: '70%' }}>
                    <TextField
                        fullWidth
                        minRows={1}
                        variant='standard'
                        label='Make a Comment'
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button sx={{ mt: '10px' }} fullWidth disabled={!comment} variant='contained' color='primary' onClick={commentSubmit}>
                        Comment
                    </Button>
                </div>
            )}
            {comments.map((c, i) => (
                <Typography key={i} gutterBottom variant='subtitle1'>
                    <strong>{c.split(': ')[0]}</strong>
                    {c.split(':')[1]}
                </Typography>
            ))}
        </div>
    );
}

export default CommentSection;