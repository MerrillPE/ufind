import React, { useEffect, useRef, } from "react";
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Grow, Grid, TextField, Typography, Paper, Button, CircularProgress } from "@mui/material";
import { useLoadScript, Autocomplete } from '@react-google-maps/api';


import { getPosts, getLocalPosts } from '../../actions/forum';
import Posts from '../Posts/Posts';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const locationRef = useRef();
    const navigate = useNavigate();
    const query = useQuery();

    const mapAPI = process.env.REACT_APP_MAPS_API_KEY
    const libraries = ['places']


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: mapAPI,
        libraries,
    });

    console.log("Before use effect");

    useEffect(() => {
        // dispatch get request at page load

        if (query.get('lng')) {
            const lng = query.get('lng');
            const lat = query.get('lat');

            const coordinates = `{"lat":${lat},"lng":${lng}}`

            dispatch(getLocalPosts(coordinates));
        } else {
            dispatch(getPosts());
        }

        // Checking data flow
        //posts.data.map((post) => console.log(post))
    }, [location]);

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

        //dispatch(getLocalPosts(coordinates));

        const coordinateQuery = JSON.parse(coordinates);
        navigate(`/search?lng=${coordinateQuery.lng}&lat=${coordinateQuery.lat}`);

    }


    if (!isLoaded) return (<div></div>);
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