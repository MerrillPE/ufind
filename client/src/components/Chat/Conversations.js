import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getConversations } from '../../actions/chat';
import ConvoCard from './ConvoCard';

const Conversations = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { conversations, isLoading } = useSelector((state) => state.chatReducer);
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

    if (!conversations.length && !isLoading) {
        return ('No Conversations Exist');
    }

    return (

        isLoading ? (
            <Box style={{
                display: 'flex', flexDirection: 'column',
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <CircularProgress />
            </Box>
        ) : (
            <Container maxWidth='xl' sx={{ mt: 3 }}>
                <Typography variant="h4" component="h2" fontWeight="bold" marginBottom={3}>
                    Messages
                </Typography>
                <Grid container spacing={2} alignItems='stretch'>
                    {conversations
                        .sort((a, b) => new Date(b.message.timestamp) - new Date(a.message.timestamp))
                        .map((chat) => (
                            <Grid key={chat.conversationID} item xs={12}>
                                <ConvoCard chat={chat} userID={userID} />
                            </Grid>
                        ))}
                </Grid>
            </Container >
        )
    )
}

export default Conversations;