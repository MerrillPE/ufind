import React, { useEffect, } from "react";
import { Paper, Typography, CardMedia, Divider, Grid, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { useParams, useNavigate, } from 'react-router-dom';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';


import { getPost, deletePost } from '../../../actions/forum';
import CommentSection from "./CommentSection";


// Individual post page
const Post = () => {
    const { post, isLoading } = useSelector((state) => state.forumReducer);
    const user = JSON.parse(localStorage.getItem('profile'));
    let userID = '';

    console.log("Post:");
    console.log(post);


    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mapAPI = process.env.REACT_APP_MAPS_API_KEY;


    useEffect(() => {
        dispatch(getPost(id));
    }, [id, dispatch]);


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: mapAPI,
        //libraries: ['places'],
    });

    const removePost = (e) => {
        //console.log(post._id);
        dispatch(deletePost(post._id));
        navigate('/');
    }

    if (user) {
        if (user?._id) {
            userID = user._id;
        } else {
            userID = user.sub;
        }
    }


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


    return (
        isLoading ? <CircularProgress /> : (
            <Paper elevation={4} style={{ padding: '20px', borderRadius: '15px' }}>
                <Grid container>
                    <Grid item>
                        <Typography variant="h3">{post.title}</Typography>
                    </Grid>
                    <Grid item style={{ flexGrow: 1 }}></Grid>
                    {userID === post.userID &&
                        <Grid item>
                            <IconButton onClick={removePost}>
                                <DeleteIcon sx={{ color: pink[500] }} />
                            </IconButton>
                        </Grid>
                    }
                </Grid>
                <CardMedia component='img' src={`${post.image}`} title={post.title} />
                <Typography>Posted by: {post.username}</Typography>
                <Typography>{moment(post.createdAt).fromNow()}</Typography>
                <Typography>{post.description}</Typography>
                <Map />
                <Divider sx={{ mt: 2, mb: 2 }} role='presentation'>Comments</Divider>
                <CommentSection post={post} />

            </Paper>
        )


    )

}

export default Post;