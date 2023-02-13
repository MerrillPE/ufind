import React, { useState } from 'react';
import { Container, Link, Grid, CssBaseline, Box, Typography, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';

const SignUp = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log(...data);
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
                        autoFocus
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='firstName'
                        label='First Name'
                        name='First Name'
                        autoComplete='given-name'
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='lastName'
                        label='Last Name'
                        name='Last Name'
                        autoComplete='family-name'
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
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='passwordConfirm'
                        label='Confirm Password'
                        name='passwordConfirm'
                        type='password'
                        autoComplete='confirm-password'
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