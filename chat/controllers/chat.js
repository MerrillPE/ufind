import mongoose from "mongoose";

import Chat from '../models/chat.js';

// Create message between users
export const createMessage = async (req, res) => {
    try {
        const { senderID, senderName, recipientID, recipientName, content } = req.body;
        const newChat = new Chat({ senderID, senderName, recipientID, recipientName, content });

        await newChat.save();

        res.status(201).json(newChat);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

// Get messages between users
export const getMessages = async (req, res) => {
    try {
        const { user1, user2 } = req.query;

        const conversation = await Chat.find({
            $or: [
                { $and: [{ senderID: user1 }, { recipientID: user2 }] },
                { $and: [{ senderID: user2 }, { recipientID: user1 }] },
            ]
        });

        res.status(200).json(conversation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}