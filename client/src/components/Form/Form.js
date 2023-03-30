import React, { useState, useRef } from 'react';
import { Container, CssBaseline, Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

//import { signup } from '../../actions/auth';
import { createPost } from '../../actions/forum';


const initialForm = { title: '', description: '', location: '', username: '', userID: '', image: '', category: '' };
const categories = ['Pets', 'Electronics', 'Bikes/Scooters', 'Jewelry', 'Clothing', 'Wallets/Purses/Bags', 'Miscellaneous'];

// TODO: Validate file extension is either jpg or png
const PostForm = () => {

    const [formData, setFormData] = useState(initialForm);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mapAPI = process.env.REACT_APP_MAPS_API_KEY
    const libraries = ['places']

    const user = JSON.parse(localStorage.getItem('profile'));

    // initialize google maps api for autocomplete
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: mapAPI,
        libraries,
    });

    // useRef is used to get autocompleted location field
    const locationRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Set username for post from local storage profile
        let updatedForm;
        if (user?.username) {
            updatedForm = { ...formData, username: user.username, userID: user._id };
        } else {
            updatedForm = { ...formData, username: user.name, userID: user.sub };
        }

        // convert input address to geocode location for google maps
        const geocoder = new window.google.maps.Geocoder();
        const geocode = await geocoder.geocode({
            address: locationRef.current.value
        }).then((result) => {
            const { results } = result;
            console.log(results[0]);
            return results[0];
        });

        const submitData = { ...updatedForm, location: JSON.stringify(geocode) };

        dispatch(createPost(submitData)).then(() => navigate('/'));
    };

    // update form data as user types
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!isLoaded) return (<div>Loading</div>); // avoids error if page loads before map api is loaded

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
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select value={formData.category} name='category' label="Category" labelId="category-label" onChange={handleChange} required fullWidth>
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setFormData({ ...formData, image: base64 })}
                        />
                    </div>
                    {user && (
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create Post
                        </Button>
                    )}
                </Box>
            </Box>
        </Container >
    );
}

export default PostForm;