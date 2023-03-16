import React, { useState } from 'react';
import { Container, Link, Grid, CssBaseline, Box, Typography, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signup } from '../../actions/auth';


const initialForm = { username: '', firstName: '', lastName: '', password: '', confirmPassword: '' };

const SignUp = () => {

    const [formData, setFormData] = useState(initialForm);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        //const data = new FormData(e.currentTarget);
        console.log(formData);
        dispatch(signup(formData)).then(() => navigate('/'));

        //navigate('/');
    };

    // Update form data as user types
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
                    Register
                </Typography>
                <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='username'
                        label='Username'
                        name='username'
                        autoComplete='username'
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='firstName'
                        label='First Name'
                        name='firstName'
                        autoComplete='given-name'
                        onChange={handleChange}
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='lastName'
                        label='Last Name'
                        name='lastName'
                        autoComplete='family-name'
                        onChange={handleChange}
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='password'
                        label='Password'
                        name='password'
                        type='password'
                        autoComplete='new-password'
                        onChange={handleChange}
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='confirmPassword'
                        label='Confirm Password'
                        name='confirmPassword'
                        type='password'
                        autoComplete='confirm-password'
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
                    <Grid item>
                        <Link href='/signin' variant='body2'>
                            {'Already have an account? Sign in'}
                        </Link>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default SignUp;