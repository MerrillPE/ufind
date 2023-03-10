import React, { useState, useEffect, } from "react";
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, } from "@mui/material";


import { getPost } from '../../actions/forum';
import Posts from '../Posts/Posts';

const MyPosts = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    console.log("Before use effect")

    useEffect(() => {
        // dispatch get request at page load
        dispatch(getPost(user)); //by id:username

        // Checking data flow
        //posts.data.map((post) => console.log(post))
    }, [dispatch]);

    return (
        // Home page calls Posts component
        <Grow in>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts />
                    </Grid>
                </Grid>
            </Container>
        </Grow>


        //<Typography>TEST HOME</Typography>
    );
}

export default MyPosts;