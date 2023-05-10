import request from 'supertest';
import app from '../index';
import mongoose from 'mongoose';
import Chat from '../models/chat';
import dotenv from 'dotenv';

dotenv.config();

describe('Chat API', () => {
    let chat;
    beforeAll(async () => {
        await mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true });
        await Chat.deleteMany({});

        chat = new Chat({
            senderID: 'senderid',
            senderName: 'sendername',
            recipientID: 'recipientid',
            recipientName: 'recipientname',
            content: 'Hello'
        });
        await chat.save();
    });

    afterAll(async () => {
        await Chat.deleteMany({});
        await mongoose.connection.close();
    });

    describe('POST /messages', () => {
        it('should create a new chat message', async () => {
            const response = await request(app)
                .post('/chat')
                .set('Authorization', 'Bearer unit_test')
                .send({
                    senderID: 'senderid2',
                    senderName: 'sendername2',
                    recipientID: 'recipientid2',
                    recipientName: 'recipientname2',
                    content: 'Hi there'
                });

            expect(response.status).toBe(201);
            expect(response.body.senderID).toBe('senderid2');
            expect(response.body.senderName).toBe('sendername2');
            expect(response.body.recipientID).toBe('recipientid2');
            expect(response.body.recipientName).toBe('recipientname2');
            expect(response.body.content).toBe('Hi there');
        });
    });

    describe('GET /messages', () => {
        it('should return messages between two users', async () => {
            const response = await request(app)
                .get('/chat/messages')
                .set('Authorization', 'Bearer unit_test')
                .query({ user1: 'senderid', user2: 'recipientid' });

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].senderID).toBe('senderid');
            expect(response.body[0].senderName).toBe('sendername');
            expect(response.body[0].recipientID).toBe('recipientid');
            expect(response.body[0].recipientName).toBe('recipientname');
            expect(response.body[0].content).toBe('Hello');
        });
    });

    describe('GET /conversations', () => {
        it('should return conversations between two users', async () => {
            // Insert test data
            await Chat.insertMany([
                { senderID: 'user1', senderName: 'User 1', recipientID: 'user2', recipientName: 'User 2', content: 'Hello User 2' },
                { senderID: 'user2', senderName: 'User 2', recipientID: 'user1', recipientName: 'User 1', content: 'Hi User 1' },
                { senderID: 'user3', senderName: 'User 3', recipientID: 'user1', recipientName: 'User 1', content: 'Hi there' },
                { senderID: 'user1', senderName: 'User 1', recipientID: 'user3', recipientName: 'User 3', content: 'Hello User 3' },
                { senderID: 'user2', senderName: 'User 2', recipientID: 'user3', recipientName: 'User 3', content: 'Hello User 3' },
                { senderID: 'user3', senderName: 'User 3', recipientID: 'user2', recipientName: 'User 2', content: 'Hi User 2' },
            ]);

            // Make request to controller with user1
            const response1 = await request(app)
                .get('/chat')
                .query({ user: 'user1' })
                .set('Authorization', 'Bearer unit_test');


            expect(response1.status).toBe(200);
            expect(response1.body).toHaveLength(2);

            const conversations1 = response1.body.sort((a, b) => a.conversationID.localeCompare(b.conversationID));

            expect(conversations1[0].conversationID).toBe('user2');
            expect(conversations1[0].message.content).toBe('Hi User 1');
            expect(conversations1[1].conversationID).toBe('user3');
            expect(conversations1[1].message.content).toBe('Hello User 3');

            // Make request to controller with user2
            const response2 = await request(app)
                .get('/chat')
                .set('Authorization', 'Bearer unit_test')
                .query({ user: 'user2' });

            expect(response2.status).toBe(200);
            expect(response2.body).toHaveLength(2);

            const conversations2 = response2.body.sort((a, b) => a.conversationID.localeCompare(b.conversationID));
            expect(conversations2[0].conversationID).toBe('user1');
            expect(conversations2[0].message.content).toBe('Hi User 1');
            expect(conversations2[1].conversationID).toBe('user3');
            expect(conversations2[1].message.content).toBe('Hi User 2');
        });
    });
});