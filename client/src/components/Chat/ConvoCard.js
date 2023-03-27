import React from "react";
import { Card, Typography, ButtonBase, Grid } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const ConvoCard = ({ chat, userID }) => {
    const { senderID, senderName, recipientID, recipientName, content, timestamp } = chat.message;
    const localTimestamp = new Date(timestamp).toLocaleString();
    const navigate = useNavigate();

    const openChat = (e) => {
        let partnerID;
        let partnerName;
        if (senderID === userID) {
            partnerID = recipientID;
            partnerName = recipientName;
        } else {
            partnerID = senderID;
            partnerName = senderName;
        }

        navigate(`/chat/${partnerID}/${partnerName}`);
    }

    return (
        <Card raised sx={{ height: 1, width: '80%' }} elevation={4}>
            <ButtonBase sx={{ height: 1, width: '100%' }} onClick={openChat}>
                <div>
                    {senderID === userID ? (
                        <Typography variant="h4">{recipientName}</Typography>
                    ) : (
                        <Typography variant="h4">{senderName}</Typography>
                    )}
                    <Typography variant="body1">{content}</Typography>
                    <Typography variant="caption">{localTimestamp}</Typography>
                </div>
            </ButtonBase>
        </Card>
    );
}

export default ConvoCard;