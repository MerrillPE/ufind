import React, { useState } from 'react';
import { Container, Link, Grid, CssBaseline, Box, Typography, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import { signin } from '../../actions/auth';

const initialForm = { username: '', password: '' };

const SignIn = () => {

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
                    <Grid item>
                        <Link href='/signup' variant='body2'>
                            {'Need an account? Register'}
                        </Link>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignIn;