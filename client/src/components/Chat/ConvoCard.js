import React from "react";
import { Card, Typography, ButtonBase, Box, Grid } from "@mui/material";
import { spacing } from '@mui/system';
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
        <Card raised sx={{ height: 1,  border: '30px 30px 30px auto',  display: 'block'}} style = {{backgroundColor: '#1997e3'}} elevation={4} >
            <ButtonBase sx={{ height: 1,  display: 'block', width: '100%'  }} onClick={openChat}>
                    {senderID === userID ? (
                        <Grid align='left' width='100%'>
                            <Typography variant="h5" sx={{fontWeight: 'bold'}}>  {recipientName}</Typography>
                        </Grid>
                        
                    ) : (
                        <Grid align='left' width='100%' >
                            <Typography variant="h5">  {senderName}</Typography>
                        </Grid>
                    )}
                    '<table width='100%'>
                        <tr>
                            <td width='100%' align="right">
                                <Typography display="flex" justifyContent="flex-end"> {localTimestamp}</Typography>
                            </td>
                        </tr>
                    </table>
                    <Grid container alignContent="flex-end">
                        
                    </Grid>
                    <Grid align='left' width='100%'>
                        <Typography variant="body1">{content}</Typography>
                    </Grid>  
                
            </ButtonBase>
        </Card>
    );
}

export default ConvoCard;