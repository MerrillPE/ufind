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

        const messages = await Chat.find({
            $or: [
                { $and: [{ senderID: user1 }, { recipientID: user2 }] },
                { $and: [{ senderID: user2 }, { recipientID: user1 }] },
            ]
        });

        console.log(messages);
        res.status(200).json(messages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getConversations = async (req, res) => {
    try {
        const { user } = req.query;

        const conversations = await Chat.aggregate([
            { $match: { $or: [{ senderID: user }, { recipientID: user }] } },
            {
                $group: {
                    _id: { $cond: [{ $eq: ["$senderID", user] }, "$recipientID", "$senderID"] },
                    message: { $last: "$$ROOT" }
                }
            },
            {
                $project: {
                    _id: 0,
                    conversationID: "$_id",
                    message: 1,
                }
            }
        ]);

        console.log(conversations);

        res.status(200).json(conversations);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}