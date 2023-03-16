import React, { useState } from 'react';
import { Container, Link, Grid, CssBaseline, Box, Typography, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import { signin } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';

const initialForm = { username: '', password: '' };

const SignIn = () => {

    const [formData, setFormData] = useState(initialForm);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        dispatch(signin(formData)).then(() => navigate('/'));
    };

    // Update form data as user types
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle google sign in
    const googleSuccess = async (res) => {
        //console.log(res?.credential);

        const token = res?.credential;
        //const { name, email, sub, picture } = decoded;

        //console.log(name, email, sub, picture);

        try {
            dispatch({ type: AUTH, data: { token } });
            // redirect to home page after login
            navigate('/');
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
                    Sign In
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
                        id='password'
                        label='Password'
                        name='password'
                        type='password'
                        onChange={handleChange}
                        autoComplete='current-password'
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
                        Sign In
                    </Button>
                    <Grid container flexDirection='column' justifyContent='flex-end' >
                        <GoogleLogin
                            onSuccess={googleSuccess}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                        <Grid item>
                            <Link href='/signup' variant='body2'>
                                {'Need an account? Register'}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignIn;