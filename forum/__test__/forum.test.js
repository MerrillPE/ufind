import request from 'supertest';
import app from '../index';
import mongoose from 'mongoose';
import Post from '../models/post';
import dotenv from 'dotenv';

dotenv.config();

describe('Forum API', () => {
    let location;
    beforeAll(async () => {
        await mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true });

        location = {
            "address_components": [
                {
                    "long_name": "1600",
                    "short_name": "1600",
                    "types": [
                        "street_number"
                    ]
                },
                {
                    "long_name": "Amphitheatre Parkway",
                    "short_name": "Amphitheatre Pkwy",
                    "types": [
                        "route"
                    ]
                },
                {
                    "long_name": "Mountain View",
                    "short_name": "Mountain View",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "Santa Clara County",
                    "short_name": "Santa Clara County",
                    "types": [
                        "administrative_area_level_2",
                        "political"
                    ]
                },
                {
                    "long_name": "California",
                    "short_name": "CA",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                },
                {
                    "long_name": "94043",
                    "short_name": "94043",
                    "types": [
                        "postal_code"
                    ]
                }
            ],
            "formatted_address": "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
            "geometry": {
                "location": {
                    "lat": 37.4267861,
                    "lng": -122.0806032
                },
                "location_type": "ROOFTOP",
                "viewport": {
                    "northeast": {
                        "lat": 37.4281350802915,
                        "lng": -122.0792542197085
                    },
                    "southwest": {
                        "lat": 37.4254371197085,
                        "lng": -122.0819521802915
                    }
                }
            },
            "place_id": "ChIJtYuu0V25j4ARwu5e4wwRYgE",
            "plus_code": {
                "compound_code": "CWC8+R3 Mountain View, California, United States",
                "global_code": "849VCWC8+R3"
            },
            "types": [
                "street_address"
            ],
            "status": "OK"
        };


        await Post.deleteMany({});
    })

    afterEach(async () => {
        await Post.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('POST /forum', () => {
        it('should create a new post', async () => {

            const response = await request(app)
                .post('/forum')
                .set('Authorization', 'Bearer unit_test')
                .send({
                    title: 'Test post',
                    description: 'This is a test post description',
                    location: JSON.stringify(location),
                    username: 'testuser',
                    userID: 'testuserid',
                    image: 'testimage.jpg',
                    category: 'Pets'
                });

            expect(response.status).toBe(201);
            expect(response.body.title).toBe('Test post');
            expect(response.body.description).toBe('This is a test post description');
            //expect(response.body.location).toBe('Test location');
            //expect(response.body.coordinates.type).toBe('Point');
            expect(response.body.coordinates.coordinates[0]).toBe(-122.0806032);
            expect(response.body.coordinates.coordinates[1]).toBe(37.4267861);
            expect(response.body.username).toBe('testuser');
            expect(response.body.userID).toBe('testuserid');
            expect(response.body.image).toBe('testimage.jpg');
            expect(response.body.category).toBe('Pets');
        });
    });

    describe('GET /forum', () => {
        let postIds;

        beforeEach(async () => {
            await Post.deleteMany({});
            const insertedPosts = await Post.insertMany([
                {
                    title: 'Test post 1',
                    description: 'This is a test post 1',
                    location: 'Test location 1',
                    coordinates: {
                        type: 'Point',
                        coordinates: [-122.0806032, 37.4267861]
                    },
                    username: 'testuser',
                    userID: 'testuserid',
                    image: 'testimage1.jpg',
                    category: 'Pets',
                    comments: [],
                    userSaves: ['testuserid2'],
                    createdAt: new Date(2023, 1, 1)
                },
                {
                    title: 'Test post 2',
                    description: 'This is a test post 2',
                    location: 'Test location 2',
                    coordinates: {
                        type: 'Point',
                        coordinates: [-73.935242, 40.73061]
                    },
                    username: 'testuser',
                    userID: 'testuserid2',
                    image: 'testimage2.jpg',
                    category: 'Electronics',
                    comments: [],
                    userSaves: [],
                    createdAt: new Date(2023, 1, 2)
                },
                {
                    title: 'Test post 3',
                    description: 'This is a test post 3',
                    location: 'Test location 3',
                    coordinates: {
                        type: 'Point',
                        coordinates: [-73.935242, 40.73061]
                    },
                    username: 'testuser',
                    userID: 'testuserid',
                    image: 'testimage3.jpg',
                    category: 'Bikes and Scooters',
                    comments: [],
                    userSaves: ['testuserid2'],
                    createdAt: new Date(2023, 1, 3)
                }
            ]);

            postIds = insertedPosts.map(post => post._id);
            //console.log("post ID: " + postIds);

        });

        afterEach(async () => {
            await Post.deleteMany({});
        });


        it('should get all posts', async () => {
            const response = await request(app)
                .get('/forum');

            expect(response.status).toBe(200);
            expect(response.body.numberOfPosts).toBe(3);
            expect(response.body.data[0].title).toBe('Test post 3')
            expect(response.body.data[1].title).toBe('Test post 2')
            expect(response.body.data[2].title).toBe('Test post 1')
        });

        it('should get all pet posts', async () => {
            const response = await request(app)
                .get('/forum/posts')
                .query({ category: 'Pets' });

            expect(response.status).toBe(200);
            expect(response.body.numberOfPosts).toBe(1);
            expect(response.body.data[0].title).toBe('Test post 1')
        });

        it('should get all local posts', async () => {
            const response = await request(app)
                .get('/forum/locale')
                .query({ lng: '-73.935242', lat: '40.73061' });

            expect(response.status).toBe(200);
            expect(response.body.numberOfPosts).toBe(2);
            expect(response.body.data[0].title).toBe('Test post 2')
            expect(response.body.data[1].title).toBe('Test post 3')
        });


        it('should get all local electronics posts', async () => {
            const response = await request(app)
                .get('/forum/posts/locale')
                .query({ lng: '-73.935242', lat: '40.73061', start: '0', limit: '10', category: 'Electronics' });

            expect(response.status).toBe(200);
            expect(response.body.numberOfPosts).toBe(1);
            expect(response.body.data[0].title).toBe('Test post 2')
        });

        it('should get second post', async () => {
            const response = await request(app)
                .get(`/forum/post/${postIds[1]}`);

            expect(response.status).toBe(200);
            expect(response.body.title).toBe('Test post 2')
        });


        it('should get testuserid posts', async () => {
            const response = await request(app)
                .get(`/forum/post/user/testuserid`);

            expect(response.status).toBe(200);
            expect(response.body[0].title).toBe('Test post 1')
            expect(response.body[1].title).toBe('Test post 3')

        });

        it('should get testuserid2 saved posts', async () => {
            const response = await request(app)
                .get(`/forum/post/savedPosts/testuserid2`)
                .set('Authorization', 'Bearer unit_test');

            expect(response.status).toBe(200);
            expect(response.body[0].title).toBe('Test post 1')
            expect(response.body[1].title).toBe('Test post 3')

        });
    });

    describe('PATCH /forum', () => {
        let postIds;

        beforeEach(async () => {
            await Post.deleteMany({});
            const insertedPosts = await Post.insertMany([
                {
                    title: 'Test post 1',
                    description: 'This is a test post 1',
                    location: 'Test location 1',
                    coordinates: {
                        type: 'Point',
                        coordinates: [-122.0806032, 37.4267861]
                    },
                    username: 'testuser',
                    userID: 'testuserid',
                    image: 'testimage1.jpg',
                    category: 'Pets',
                    comments: [],
                    userSaves: ['testuserid2'],
                    createdAt: new Date(2023, 1, 1)
                },
                {
                    title: 'Test post 2',
                    description: 'This is a test post 2',
                    location: 'Test location 2',
                    coordinates: {
                        type: 'Point',
                        coordinates: [-73.935242, 40.73061]
                    },
                    username: 'testuser',
                    userID: 'testuserid2',
                    image: 'testimage2.jpg',
                    category: 'Electronics',
                    comments: [],
                    userSaves: [],
                    createdAt: new Date(2023, 1, 2)
                },
                {
                    title: 'Test post 3',
                    description: 'This is a test post 3',
                    location: 'Test location 3',
                    coordinates: {
                        type: 'Point',
                        coordinates: [-73.935242, 40.73061]
                    },
                    username: 'testuser',
                    userID: 'testuserid',
                    image: 'testimage3.jpg',
                    category: 'Bikes and Scooters',
                    comments: [],
                    userSaves: ['testuserid2'],
                    createdAt: new Date(2023, 1, 3)
                }
            ]);

            postIds = insertedPosts.map(post => post._id);
            //console.log("post ID: " + postIds);

        });

        afterEach(async () => {
            await Post.deleteMany({});
        });

        it('should create comment on post', async () => {
            const response = await request(app)
                .patch(`/forum/post/${postIds[1]}/commentPost`)
                .set('Authorization', 'Bearer unit_test')
                .send({ value: 'Test comment' });

            expect(response.status).toBe(200);
            expect(response.body.comments[0]).toBe('Test comment')
        })

        it('should save post', async () => {
            const response = await request(app)
                .patch(`/forum/post/${postIds[1]}/savePost`)
                .set('Authorization', 'Bearer unit_test')
                .send({ userID: 'testuserid3' });

            expect(response.status).toBe(200);
            expect(response.body.userSaves[0]).toBe('testuserid3')
        })

    });

    describe('DELETE /forum', () => {
        let postIds;

        beforeEach(async () => {
            await Post.deleteMany({});
            const insertedPosts = await Post.insertMany([
                {
                    title: 'Test post 1',
                    description: 'This is a test post 1',
                    location: 'Test location 1',
                    coordinates: {
                        type: 'Point',
                        coordinates: [-122.0806032, 37.4267861]
                    },
                    username: 'testuser',
                    userID: 'testuserid',
                    image: 'testimage1.jpg',
                    category: 'Pets',
                    comments: [],
                    userSaves: ['testuserid2'],
                    createdAt: new Date(2023, 1, 1)
                },
                {
                    title: 'Test post 2',
                    description: 'This is a test post 2',
                    location: 'Test location 2',
                    coordinates: {
                        type: 'Point',
                        coordinates: [-73.935242, 40.73061]
                    },
                    username: 'testuser',
                    userID: 'testuserid2',
                    image: 'testimage2.jpg',
                    category: 'Electronics',
                    comments: [],
                    userSaves: [],
                    createdAt: new Date(2023, 1, 2)
                },
                {
                    title: 'Test post 3',
                    description: 'This is a test post 3',
                    location: 'Test location 3',
                    coordinates: {
                        type: 'Point',
                        coordinates: [-73.935242, 40.73061]
                    },
                    username: 'testuser',
                    userID: 'testuserid',
                    image: 'testimage3.jpg',
                    category: 'Bikes and Scooters',
                    comments: [],
                    userSaves: ['testuserid2'],
                    createdAt: new Date(2023, 1, 3)
                }
            ]);

            postIds = insertedPosts.map(post => post._id);
            //console.log("post ID: " + postIds);

        });

        afterEach(async () => {
            await Post.deleteMany({});
        });

        it('should delete post', async () => {
            const response = await request(app)
                .delete(`/forum/post/${postIds[1]}`)
                .set('Authorization', 'Bearer unit_test');

            expect(response.status).toBe(200);
            expect(response.body.message).toBe(`Post ${postIds[1]} deleted successfully`)
        })


    });

})