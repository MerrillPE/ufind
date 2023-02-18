//post form
/*
import { Container, Link, Grid, CssBaseline, Box, Typography, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/forum';



const initialForm = { Title: '', Description: '' };

const Post = () => {

    const [formData, setFormData] = useState(initialForm);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        //const data = new FormData(e.currentTarget);
        //const { username, password } = formData;

        console.log(formData);

        dispatch(signin(formData));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const googleSuccess = async (res) => {
        //console.log(res?.credential);

        const token = res?.credential;
        try {
            dispatch({ type: POST, data: { token } });
        } catch (error) {
            console.log(error);
        }
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
                    Create Post
                </Typography>
                <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='Title'
                        label='Title'
                        name='Title'
                        autoComplete='Title'
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='description'
                        label='description'
                        name='description'
                        type='description'
                        onChange={handleChange}
                        autoComplete='description'
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='location'
                        label='location'
                        name='location'
                        type='location'
                        onChange={handleChange}
                        autoComplete='location'
                    />
                    <FormControlLabel
                        control={<Checkbox value='remember' color='primary' />}
                        label='Remember Me'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create Post
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
return post;
*/