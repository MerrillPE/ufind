import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    senderID: String,
    senderName: String,
    recipientID: String,
    recipientName: String,
    content: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;