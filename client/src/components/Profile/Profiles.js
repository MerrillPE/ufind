/*
import React, { useEffect, } from "react";
import { Paper, Typography, CardMedia, Divider } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { useParams, } from 'react-router-dom';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';


import { getPost } from '../../../actions/forum';


// Individual post page
const Post = () => {
    const post = useSelector((state) => state.forumReducer.post);

    console.log("Post:");
    console.log(post);


    const { id } = useParams();
    const dispatch = useDispatch();
    const mapAPI = process.env.REACT_APP_MAPS_API_KEY;


    useEffect(() => {
        dispatch(getPost(id));
    }, [id, dispatch]);



    const { isLoaded } = useLoadScript({
        googleMapsApiKey: mapAPI,
        //libraries: ['places'],
    });




    if (!post) {
        return null;
    }


    const Map = () => {

        if (!isLoaded) return (<div>Loading</div>);

        var locationDetails;

        try {
            locationDetails = JSON.parse(post.location).geometry.location;

        } catch (error) {
            locationDetails = { lat: 37.237, lng: -121.8278 };
        }


        console.log("Location Details: ");
        console.log(locationDetails);

        return (
            <GoogleMap zoom={10} center={locationDetails} mapContainerStyle={{ width: '400px', height: '400px' }}>
                <Marker position={locationDetails} />
            </GoogleMap>
        )
    }

    // TODO: create comment section
    return (

        <Paper elevation={4} style={{ padding: '20px', borderRadius: '15px' }}>

            <Typography variant="h3">{post.title}</Typography>
            <CardMedia component='img' src={`${post.image}`} title={post.title} />
            <Typography>Posted by: {post.username}</Typography>
            <Typography>{moment(post.createdAt).fromNow()}</Typography>
            <Typography>{post.description}</Typography>
            <Map />
            <Divider sx={{ mt: 2, mb: 2 }} role='presentation'>Comments</Divider>
            <CommentSection post={post} />

        </Paper>


    )

}

export default Post;
*/