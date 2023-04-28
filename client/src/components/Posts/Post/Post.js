import React, { useEffect, useMemo, useState } from "react";
import { Paper, Typography, CardMedia, Divider, Grid, IconButton, CircularProgress, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MailIcon from '@mui/icons-material/Mail';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { pink } from '@mui/material/colors';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { useParams, useNavigate, } from 'react-router-dom';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';


import { getPost, deletePost, userSavePost } from '../../../actions/forum';
import CommentSection from "./CommentSection";


// Individual post page
const Post = () => {
    const { post, isLoading } = useSelector((state) => state.forumReducer);
    const user = JSON.parse(localStorage.getItem('profile'));
    const [fillIcon, setFillIcon] = useState(false);
    const [userID, setUserID] = useState(null);

    console.log("Post:");
    console.log(post);


    const { id } = useParams(); // use id param from url
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mapAPI = process.env.REACT_APP_MAPS_API_KEY;

    // Send dispatch when id changes
    useEffect(() => {

        if (!isLoading) {
            dispatch(getPost(id));
        }
    }, [id]);

    useEffect(() => {
        if (post && user) {
            setUserID(user._id || user.sub);
            setFillIcon(post.userSaves.includes(userID));
        }
    }, [post, user])

    // Initialize google maps api
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: mapAPI,
        //libraries: ['places'],
    });

    const removePost = (e) => {
        //console.log(post._id);
        dispatch(deletePost(post._id));
        navigate('/');
    }

    const openChat = (e) => {
        navigate(`/chat/${post.userID}/${post.username}`);
    }

    const savePost = (e) => {
        e.preventDefault();
        console.log("savePost " + post._id + " " + userID);
        dispatch(userSavePost(post._id, userID)).then(() => {
            setFillIcon(true);
            window.location.reload();
        });
    }

    const removeFromSaves = (e) => {
        e.preventDefault();
        console.log("removeFromSaves");
        dispatch(userSavePost(post._id, userID)).then(() => {
            setFillIcon(false);
            window.location.reload();
        });
    }

    // if user is logged in get id


    // if post doesn't exist
    if (!post) {
        return null;
    }


    // Google map component
    const Map = () => {

        if (!isLoaded) return (<div>Loading</div>);

        var locationDetails;

        try {
            locationDetails = JSON.parse(post.location).geometry.location;

        } catch (error) {
            locationDetails = { lat: 37.237, lng: -121.8278 }; // if location doesn't exist default
        }


        //console.log("Location Details: ");
        //console.log(locationDetails);

        return (
            <div style={{ width: '300px', height: '300px', borderLeft: '1px solid gray', paddingLeft: '30px' }}>
            <GoogleMap zoom={10} center={locationDetails} mapContainerStyle={{ width: '300px', height: '300px'}}>
                <Marker position={locationDetails} />
            </GoogleMap>
            </div>
        )
    }


    return (

        // if isLoading return circular progress wheel
        <Box style={{
            position: 'relative',
            minHeight: '80vh', // Set minimum height to 100vh to cover the entire viewport
            
        }}>
        {isLoading ? (
            <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <CircularProgress />
            </div>
        ) : (
            <Paper elevation={4} style={{ padding: '20px', borderRadius: '15px'}}>
                <Grid container>

                    <Grid container item spacing={1} justifyContent="flex-end">
                        {userID === post.userID ? (
                            <Grid item>
                                <IconButton onClick={removePost} title="Delete your post">
                                    <DeleteIcon sx={{ color: pink[500] }} />
                                </IconButton>
                            </Grid>
                        ) : (userID && (
                            <>
                                {(fillIcon) ? (
                                    <Grid item>
                                        <IconButton onClick={removeFromSaves} title="Remove from saved">
                                            <BookmarkIcon color="primary" />
                                        </IconButton>
                                    </Grid>
                                ) : (
                                    <Grid item>
                                        <IconButton onClick={savePost} title="Save post">
                                            <BookmarkBorderIcon color="primary" />
                                        </IconButton>
                                    </Grid>
                                )}
                                <Grid item>
                                    <IconButton onClick={openChat} title="Message Poster">
                                        <MailIcon color="primary" />
                                    </IconButton>
                                </Grid>
                            </>
                        ))}
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            }}>{post.title}</Typography>
                    </Grid>
                </Grid>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <CardMedia component='img' src={`${post.image}`} title={post.title} style={{ width: '300px', height: '300px', borderRight: '1px solid gray', paddingRight: '30px'}} />
                    <div style={{ flex: 1, margin: '20px'}} >
                        <Typography sx={{fontSize:18}} >{post.description} </Typography>
                    </div>  
                    <Map />
                </div> 
                <Typography>Posted by: {post.username}</Typography>
                <Typography>{moment(post.createdAt).fromNow()}</Typography>
                <Divider sx={{ mt: 2, mb: 2 }} role='presentation'>Comments</Divider>
                <CommentSection post={post}/>
                
            </Paper>
        )}
            <Box/>
        </Box>
    );

};

export default Post;