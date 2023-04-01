/*
import React, { useState } from 'react';
import { Container, Link, Grid, CssBaseline, Box, Typography, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';

// import { signup } from '../../actions/auth';
import { createPost } from '../../actions/forum';

const initialForm = { username: '', title: '', description: '', location: '' };

const CreatePost = () => {

    const [formData, setFormData] = useState(initialForm);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        //const data = new FormData(e.currentTarget);
        // Need to set username, createDate and figure out Image later
        console.log(formData);
        dispatch(CreatePost(formData));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Container maxWidth='xs'>
            <CssBaseline />
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component='h1' variant='h5'>
                    Forum
                </Typography>
                <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='title'
                        label='Title'
                        name='title'
                        autoComplete='title'
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='description'
                        label='Description'
                        name='description'
                        autoComplete='description'
                        onChange={handleChange}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default CreatePost;
*/