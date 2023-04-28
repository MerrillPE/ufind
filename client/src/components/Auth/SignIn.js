import React, { useState } from 'react';
import { Container, Link, Grid, CssBaseline, Box, Typography, TextField, Button, Alert, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';


import { signin } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';

const initialForm = { username: '', password: '' };

const SignIn = () => {

    const [formData, setFormData] = useState(initialForm);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        try {
            const status = await dispatch(signin(formData));
            //console.log("status:" + status);

            // If signin was successful, navigate to home page
            if (status === 200) {
                navigate('/');
            } else {
                setError("Invalid Credentials");
            }
        } catch (error) {
            console.log(error);
        }

    };

    // Update form data as user types
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Check if required fields are empty
    const isEmpty = formData.username === '' || formData.password === '';

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
        <Box style={{
            position: 'relative',
            minHeight: '80vh', // Set minimum height to 100vh to cover the entire viewport
        }}>

    <Paper elevation={4} style={{ padding: '100px', borderRadius: '15px', width:'50%', margin: '0 auto', display:'flex', justifyContent:'center', alignItems:'center'}}> 
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
                <Typography component='h1' variant='h4'>
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
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isEmpty}
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
    </Paper>
        </Box>
    );
};

export default SignIn;