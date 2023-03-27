import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Paper, Button, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getConversations } from '../../actions/chat';
import ConvoCard from './ConvoCard';

const Conversations = () => {
    const dispatch = useDispatch();
    //const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { conversations } = useSelector((state) => state.chatReducer);
    const [userID, setUserID] = useState();

    useEffect(() => {
        if (user?.username) {
            setUserID(user?._id);
        } else {
            setUserID(user?.sub);
        }
        console.log(userID);

        if (userID) {
            dispatch(getConversations(userID));
        }


    }, [userID, user, dispatch]);

    // Check conversations for debugging
    useEffect(() => {
        console.log(conversations);
    }, [conversations]);



    return (

        <Container maxWidth='xl' sx={{ mt: 3 }}>
            <Grid container spacing={2} alignItems='stretch'>
                {conversations.map((chat) => (
                    <Grid key={chat.conversationID} item xs={12}>
                        <ConvoCard chat={chat} userID={userID} />
                    </Grid>
                ))}
            </Grid>
        </Container >


    )
}

export default Conversations;