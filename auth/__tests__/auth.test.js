import request from 'supertest';
import app from '../index';
import mongoose from 'mongoose';
import User from '../models/user';
import dotenv from 'dotenv';

dotenv.config();

describe('Auth API', () => {
    let user;
    beforeAll(async () => {
        await mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true });
        await User.deleteMany({});

        await User.create({
            username: 'testuser',
            password: '$2a$06$VMnFN9JotM3xY2GBTV76fuTNNLP4bIMfpvUQ1gg.ocosO.IPqLBxe',
            firstName: 'Test',
            lastName: 'User'
        });
    });

    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    describe('POST /signin', () => {
        it('should return 400 when invalid username is provided', async () => {
            const response = await request(app)
                .post('/users/signin')
                .send({ username: 'invaliduser', password: 'testpassword' });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid credentials');
        });

        it('should return 400 when invalid password are provided', async () => {
            const response = await request(app)
                .post('/users/signin')
                .send({ username: 'testuser', password: 'invalidpassword' });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid credentials');
        });

        it('should return a user object and token when valid credentials are provided', async () => {
            const response = await request(app)
                .post('/users/signin')
                .send({ username: 'testuser', password: 'testpassword' });

            expect(response.status).toBe(200);
            expect(response.body.user.username).toBe('testuser');
            expect(response.body.user.firstName).toBe('Test');
            expect(response.body.user.lastName).toBe('User');
            expect(response.body.token).toBeDefined();
        });
    });

    describe('POST /signup', () => {
        it('should return 400 when username already exists', async () => {
            const response = await request(app)
                .post('/users/signup')
                .send({ username: 'testuser', password: 'testpassword', confirmPassword: 'testpassword', firstName: 'Test', lastName: 'User' });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Username already exists');
        });

        it('should return a user object and token when valid input is provided', async () => {
            const response = await request(app)
                .post('/users/signup')
                .send({ username: 'newuser', password: 'testpassword', confirmPassword: 'testpassword', firstName: 'Test', lastName: 'User' });

            expect(response.status).toBe(200);
            expect(response.body.user.username).toBe('newuser');
            expect(response.body.user.firstName).toBe('Test');
            expect(response.body.user.lastName).toBe('User');
            expect(response.body.token).toBeDefined();
        });

        it('should return 400 when passwords do not match', async () => {
            const response = await request(app)
                .post('/users/signup')
                .send({ username: 'newuser2', password: 'testpassword', confirmPassword: 'wrongpassword', firstName: 'Test', lastName: 'User' });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Passwords are not the same');
        });
    });
});
