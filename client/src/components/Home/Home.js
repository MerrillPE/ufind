import React, { useEffect, useRef, } from "react";
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, TextField, Typography, Paper, Button, CircularProgress } from "@mui/material";
import { useLoadScript, Autocomplete } from '@react-google-maps/api';


import { getPosts, getLocalPosts } from '../../actions/forum';
import Posts from '../Posts/Posts';

const Home = () => {
    const dispatch = useDispatch();
    const locationRef = useRef();

    const mapAPI = process.env.REACT_APP_MAPS_API_KEY
    const libraries = ['places']


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: mapAPI,
        libraries,
    });

    console.log("Before use effect");

    useEffect(() => {
        // dispatch get request at page load
        dispatch(getPosts());

        // Checking data flow
        //posts.data.map((post) => console.log(post))
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const geocoder = new window.google.maps.Geocoder();
        const geocode = await geocoder.geocode({
            address: locationRef.current.value
        }).then((result) => {
            const { results } = result;
            console.log(results[0]);
            return results[0];
        });

        const coordinates = JSON.stringify(geocode.geometry.location);
        console.log(coordinates);

        dispatch(getLocalPosts(coordinates));

    }


    //if (!isLoaded) return (<div>Loading</div>)
    if (!isLoaded) return (<CircularProgress />)
    return (
        // Home page calls Posts component
        <Grow in>
            <Container maxWidth='lg' sx={{ mt: 3 }}>
                <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper elevation={6}>
                            <Typography variant="h6" component="h2" sx={{ ml: 2 }}>Show Posts Near You</Typography>
                            <Autocomplete>
                                <TextField
                                    margin='normal'
                                    id='location'
                                    label='Location'
                                    name='location'
                                    autoComplete='location'
                                    sx={{ m: 2 }}
                                    inputRef={locationRef}
                                //onChange={handleChange}
                                />
                            </Autocomplete>
                            <Button
                                type='submit'
                                onClick={handleSubmit}
                                variant='contained'
                                sx={{ ml: 3, mr: 2, mb: 2 }}
                            >
                                Submit
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>


        //<Typography>TEST HOME</Typography>
    );
}

export default Home;