import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = () => {
        onSend(message);
        setMessage("");
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}>
            <TextField
                placeholder="Message"
                variant="outlined"
                fullWidth
                value={message}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={!message.trim()}
            >
                Send
            </Button>
        </form>
    );
}

export default ChatInput;