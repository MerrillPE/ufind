import React, { useState, useRef } from 'react';
import { Container, Link, Grid, CssBaseline, Box, Typography, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
import { GoogleMap, Marker, useLoadScript, Autocomplete } from '@react-google-maps/api';

//import { signup } from '../../actions/auth';
import { createPost } from '../../actions/forum';


const initialForm = { title: '', description: '', location: '', username: '', image: '' };

const PostForm = () => {

    const [formData, setFormData] = useState(initialForm);
    const dispatch = useDispatch();
    const mapAPI = process.env.REACT_APP_MAPS_API_KEY
    const libraries = ['places']

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: mapAPI,
        libraries,
    });


    const locationRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //const data = new FormData(e.currentTarget);
        console.log(formData);
        const geocoder = new window.google.maps.Geocoder();
        var locationData;

        // convert input address to geocode location for google maps
        const geocode = await geocoder.geocode({
            address: locationRef.current.value
        }).then((result) => {
            const { results } = result;
            console.log(results[0]);
            //locationData = results[0];
            return results[0];
        });

        //const stringed = JSON.stringify(geocode);
        //const parsed = JSON.parse(stringed);

        //console.log("Parsed: ");
        //console.log(parsed);


        const submitData = { ...formData, location: JSON.stringify(geocode) };
        //console.log(locationRef.current);
        console.log(submitData);
        dispatch(createPost(submitData));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!isLoaded) return (<div>Loading</div>);
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
                    <Autocomplete>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='location'
                            label='Location'
                            name='location'
                            autoComplete='location'
                            inputRef={locationRef}
                        //onChange={handleChange}
                        />
                    </Autocomplete>
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