import React, { useEffect, } from "react";
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, TextField, Typography, Paper, } from "@mui/material";
import { useLoadScript, Autocomplete } from '@react-google-maps/api';


import { getPosts } from '../../actions/forum';
import Posts from '../Posts/Posts';

const Home = () => {
    const dispatch = useDispatch();

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
    }, [dispatch]);


    if (!isLoaded) return (<div>Loading</div>)
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
                            <Typography variant="h6" component="h2" sx={{ ml: 2 }}>Input Location:</Typography>
                            <Autocomplete>
                                <TextField
                                    margin='normal'
                                    required
                                    id='location'
                                    label='Location'
                                    name='location'
                                    autoComplete='location'
                                    sx={{ m: 2 }}
                                //inputRef={locationRef}
                                //onChange={handleChange}
                                />
                            </Autocomplete>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>


        //<Typography>TEST HOME</Typography>
    );
}

export default Home;