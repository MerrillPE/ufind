import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Typography, TextField, Button } from '@mui/material';

import { commentPost } from '../../../actions/forum';

// TODO: Make comments also work with google sign-in
const CommentSection = ({ post }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');

    const commentSubmit = async () => {
        const submittedComment = `${user.username || user.name}: ${comment}`;

        const newComments = await dispatch(commentPost(submittedComment, post._id));
        setComments(newComments);
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