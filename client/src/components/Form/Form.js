import React, { useState } from 'react';
import { Container, Link, Grid, CssBaseline, Box, Typography, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';

//import { signup } from '../../actions/auth';
import { createPost } from '../../actions/forum';


const initialForm = { title: '', description: '', location: '', username: '', image: '' };

const PostForm = () => {

    const [formData, setFormData] = useState(initialForm);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        //const data = new FormData(e.currentTarget);
        console.log(formData);
        dispatch(createPost(formData));
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
                    Create Post
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
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='location'
                        label='City and State'
                        name='location'
                        autoComplete='location'
                        onChange={handleChange}
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='username'
                        label='Name'
                        name='username'
                        type='username'
                        autoComplete='username'
                        onChange={handleChange}
                    />
                    <div>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setFormData({ ...formData, image: base64 })}
                        />
                    </div>
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
}

export default PostForm;