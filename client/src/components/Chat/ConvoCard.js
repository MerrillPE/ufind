import React from "react";
import { Typography, ButtonBase, Grid, Card } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const ConvoCard = ({ chat, userID }) => {
    const { senderID, senderName, recipientID, recipientName, content, timestamp } = chat.message;
    const localTimestamp = new Date(timestamp).toLocaleString();
    const navigate = useNavigate();

    const openChat = (e) => {
        let partnerID;
        let partnerName;
        const { senderID, senderName, recipientID, recipientName } = chat.message;
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
        <Card raised sx={{ height: 1, width: '100vh', border: '30px 30px 30px auto',  display: 'block', background:'#e1f1fc'}} elevation={4} >
            <ButtonBase sx={{
                height: 1, 
                display: 'block',
                width: '100%',
                '&:hover': {backgroundColor: '#f5f5f5', cursor: 'pointer',}, 
                }} onClick={openChat}>
                <div sx={{ textAlign: 'left' }}>
                    {senderID === userID ? (
                        <Grid align='left' width='100%'>
                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>  {recipientName}</Typography>
                        </Grid>
                    ) : (
                        <Grid align='left' width='100%' >
                            <Typography variant="h6" sx={{fontWeight: 'bold'}}>  {senderName}</Typography>
                        </Grid>
                    )}
                    
                    <Grid align='left' width='100%'>
                    <Typography variant="body1" >
                        {content.length >= 50 ? `${content.substring(0, 85)}.....` : content}
                    </Typography>
                    </Grid> 

                    <table width='100%'>
                        <tr>
                            <td width='100%' align="right">
                                <Typography display="flex" justifyContent="flex-end"> {localTimestamp}</Typography>
                            </td>
                        </tr>
                    </table>
                    <Grid container alignContent="flex-end"></Grid>
                </div>
            </ButtonBase>
        </Card>
    );
}

export default ConvoCard;