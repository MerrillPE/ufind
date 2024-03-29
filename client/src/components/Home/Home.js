import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Grid, TextField, Typography, Paper, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Divider } from "@mui/material";
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

import { getPosts, getLocalPosts, getCategoryPosts, getLocalCategoryPosts } from '../../actions/forum';
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
    const limit = 8;
    const [hasMore, setHasMore] = useState(true);
    const { posts, numberOfPosts, isLoading } = useSelector((state) => state.forumReducer);
    const [category, setCategory] = useState();



    const mapAPI = process.env.REACT_APP_MAPS_API_KEY
    const libraries = ['places']

    // initialize google maps api for autocomplete
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: mapAPI,
        libraries,
    });

    //console.log("Location: " + location.pathname);

    // Move start point ahead triggering useEffect for next dispatch
    const fetchMoreData = () => {
        setStart(start + limit);
    }

    // Clear posts and reset states when location changes
    useEffect(() => {
        //console.log('location change!')
        dispatch({ type: 'CLEAR_POSTS' })
        setStart(0);
        setHasMore(true);
        if (query.get('category')) {
            setCategory(query.get('category'));
        };

    }, [location, category]);

    // useEffect that handles dispatches
    useEffect(() => {
        //console.log("Check has more: " + String(hasMore))
        // If query params exist use get local posts
        // Else get all posts

        if (hasMore & !isLoading) {

            const lng = query.has('lng') ? query.get('lng') : null;
            const lat = query.has('lat') ? query.get('lat') : null;
            const catQuery = query.has('category') ? query.get('category') : null;

            if (lng && catQuery) {
                //const lng = query.get('lng');
                //const lat = query.get('lat');
                //const catQuery = query.get('category');

                const coordinates = `{"lat":${lat},"lng":${lng}}`

                console.log("Category and Location");

                dispatch(getLocalCategoryPosts(coordinates, catQuery, start, limit));


            } else if (lng) {
                //const lng = query.get('lng');
                //const lat = query.get('lat');

                const coordinates = `{"lat":${lat},"lng":${lng}}`

                dispatch(getLocalPosts(coordinates, start, limit));
            } else if (catQuery) {
                const catQuery = query.get('category');

                dispatch(getCategoryPosts(catQuery, start, limit));
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
                setHasMore(true);
            }
        }
    }, [start, hasMore, location, category]); // Trigger when start, hasMore, or location changes


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

        if (query.get('category')) {
            const catQuery = query.get('category');
            navigate(`/search?lng=${coordinateQuery.lng}&lat=${coordinateQuery.lat}&category=${catQuery}`);
            window.location.reload();
        } else {
            navigate(`/search?lng=${coordinateQuery.lng}&lat=${coordinateQuery.lat}`);
            window.location.reload();
        }

    }

    const handleCategory = async (e) => {
        e.preventDefault();

        setCategory(e.target.value);
        setStart(0);

        if (query.get('lng')) {
            const lng = query.get('lng');
            const lat = query.get('lat');
            navigate(`/search?lng=${lng}&lat=${lat}&category=${e.target.value}`);
            window.location.reload();
        } else {
            navigate(`/search?category=${e.target.value}`);
            window.location.reload();
        }
    }

    if (!isLoaded) return (<div></div>);
    return (
        // Home page calls Posts component
        //<Grow in>

        <Container
            maxWidth='xl'
            sx={{ mt: 3 }}
        >
            <Grid container direction="row" alignItems='stretch' spacing={3}>
                <Grid item xs={12} sm={6} md={3} sx={{ display: { xs: 'none', sm: 'block' } }} >
                    <Paper elevation={8} >
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
                        <Divider sx={{ mt: 2, mb: 2 }} role='presentation'></Divider>
                        <FormControl component="fieldset" sx={{ m: 2 }}>
                            <FormLabel component="legend">Category</FormLabel>
                            <RadioGroup
                                aria-label="category"
                                name="category"
                                value={category}
                                onChange={(e) => handleCategory(e)}
                            >
                                <FormControlLabel value="Pets" control={<Radio />} label="Pets" />
                                <FormControlLabel value="Electronics" control={<Radio />} label="Electronics" />
                                <FormControlLabel value="Bikes and Scooters" control={<Radio />} label="Bikes/Scooters" />
                                <FormControlLabel value="Jewelry" control={<Radio />} label="Jewelry" />
                                <FormControlLabel value="Clothing" control={<Radio />} label="Clothing" />
                                <FormControlLabel value="Wallets, Purses, and Bags" control={<Radio />} label="Wallets/Purses/Bags" />
                                <FormControlLabel value="Miscellaneous" control={<Radio />} label="Miscellaneous" />
                            </RadioGroup>
                        </FormControl>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={9}>
                    <Posts />

                </Grid>

            </Grid>

            {hasMore & !isLoading ?
                <Button
                    onClick={fetchMoreData}
                    variant='outlined'
                    style={{ marginTop: '2px', float: 'right' }}>
                    Load More <ExpandMoreOutlinedIcon />
                </Button> :
                <div></div>}
        </Container>

        //</Grow>
    );
}

export default Home;