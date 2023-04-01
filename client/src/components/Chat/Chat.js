import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getChat, sendMessage } from '../../actions/chat';
import ChatInput from "./ChatInput";

const Chat = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { chat, isLoading } = useSelector((state) => state.chatReducer);
    const [userID, setUserID] = useState();
    const [userName, setUserName] = useState();
    const partnerID = useParams().id
    const partnerName = useParams().name

    useEffect(() => {
        if (user?.username) {
            setUserID(user?._id);
            setUserName(user?.username);
        } else {
            setUserID(user?.sub);
            setUserName(user?.name);
        }
        console.log("UserID: " + userID);
        console.log("PartnerID: " + partnerID);


        if (userID) {
            dispatch(getChat(userID, partnerID));
        }

    }, [partnerID, userID, dispatch]);

    useEffect(() => {
        console.log(chat);

    }, [chat]);

    const handleSend = (newMessage) => {
        const submitMessage = { senderID: userID, senderName: userName, recipientID: partnerID, recipientName: partnerName, content: newMessage };
        dispatch(sendMessage(submitMessage));
    }

    //if (!chat.length) return (<CircularProgress />)

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
                <Typography variant="h5" component="h2" fontWeight="bold" marginBottom={3}>
                    {partnerName}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                    {chat && chat.map((message) => (
                        <Box
                            key={message._id}
                            sx={{
                                alignSelf: message.senderID === userID ? 'flex-end' : 'flex-start',
                                maxWidth: '80%',
                                borderRadius: '10px',
                                bgcolor: message.senderID === userID ? 'primary.light' : 'secondary.light',
                                p: '0.5rem',
                            }}
                        >
                            <div>
                                <Typography variant="body2">{message.senderName}</Typography>
                            </div>
                            <Typography variant="body1">{message.content}</Typography>
                            <div>
                                <Typography variant="caption">{new Date(message.timestamp).toLocaleString()}</Typography>
                            </div>
                        </Box>
                    ))}
                    <ChatInput onSend={handleSend} />
                </Box>
            </Container>
        )

    )
}

export default Chat;