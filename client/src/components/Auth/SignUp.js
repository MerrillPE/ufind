import React, { useState } from 'react';
import { Container, Link, Grid, CssBaseline, Box, Typography, TextField, Button, Alert, Paper} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signup } from '../../actions/auth';


const initialForm = { username: '', firstName: '', lastName: '', password: '', confirmPassword: '' };

const SignUp = () => {

    const [formData, setFormData] = useState(initialForm);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //const data = new FormData(e.currentTarget);
        console.log(formData);
        //dispatch(signup(formData)).then(() => navigate('/'));

        try {
            const response = await dispatch(signup(formData));
            //console.log("status:" + response);

            const { status } = response

            // If signin was successful, navigate to home page
            if (status === 200) {
                navigate('/');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }

        //navigate('/');
    };

    // Update form data as user types
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Check if required fields are empty
    const isEmpty = formData.username === '' || formData.password === '' || formData.confirmPassword === '' || formData.firstName === '' || formData.lastName === '';

    return (
        <Box style={{
            position: 'relative',
            minHeight: '80vh', // Set minimum height to 100vh to cover the entire viewport
        }}>

        <Paper elevation={4} style={{ padding: '50px', borderRadius: '15px', width:'50%', margin: '0 auto', display:'flex', justifyContent:'center', alignItems:'center'}}>    
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
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isEmpty}
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
        </Paper>
        </Box>
    );
}

export default SignUp;