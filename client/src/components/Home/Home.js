import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Grow, Grid, TextField, Typography, Paper, Button, CircularProgress, } from "@mui/material";
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
//import InfiniteScroll from 'react-infinite-scroller';

import { getPosts, getLocalPosts } from '../../actions/forum';
import Posts from '../Posts/Posts';

// useQuery to access parameters in URL 
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const locationRef = useRef();
    const navigate = useNavigate();
    const query = useQuery();
    const [start, setStart] = useState(0);
    const limit = 4;
    const [hasMore, setHasMore] = useState(true);
    const { posts, numberOfPosts, isLoading } = useSelector((state) => state.forumReducer);


    const mapAPI = process.env.REACT_APP_MAPS_API_KEY
    const libraries = ['places']

    // initialize google maps api for autocomplete
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: mapAPI,
        libraries,
    });

    console.log("Location: " + location.pathname); // Instrumentation

    // Move start point ahead triggering useEffect for next dispatch
    const fetchMoreData = () => {
        setStart(start + 4);
    }

    // Clear posts and reset states when location changes
    useEffect(() => {
        //console.log('location change!')
        dispatch({ type: 'CLEAR_POSTS' })
        setStart(0);
        setHasMore(true);
    }, [location]);

    // useEffect that handles dispatches
    useEffect(() => {
        //console.log("Check has more: " + String(hasMore))
        // If query params exist use get local posts
        // Else get all posts

        if (hasMore & !isLoading) {
            if (query.get('lng')) {
                const lng = query.get('lng');
                const lat = query.get('lat');

                const coordinates = `{"lat":${lat},"lng":${lng}}`

                dispatch(getLocalPosts(coordinates, start, limit));
            } else {
                dispatch(getPosts(start, limit));
            }
        }

        // Check if more posts exist after each dispatch
        if (posts) {
            console.log("Number of Posts:" + numberOfPosts)
            if (posts?.length + limit >= numberOfPosts) {
                setHasMore(false);
            } else {
                setHasMore(true)
            }
        }
    }, [start, hasMore, location]); // Trigger when start, hasMore, or location changes


    // handle submit for location filtering
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

        const coordinateQuery = JSON.parse(coordinates);
        setStart(0);
        navigate(`/search?lng=${coordinateQuery.lng}&lat=${coordinateQuery.lat}`);

    }


    if (!isLoaded) return (<div></div>);
    return (
        // Home page calls Posts component
        //<Grow in>
        <Container maxWidth='xl' sx={{ mt: 3 }}>
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
            {hasMore & !isLoading ? <Button
                onClick={fetchMoreData}
                variant='outlined'
                sx={{ mt: 2 }}
            >
                Load More <ExpandMoreOutlinedIcon />
            </Button> :
                <div></div>}
        </Container>
        //</Grow>
    );
}

export default Home;