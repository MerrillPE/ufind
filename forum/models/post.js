import mongoose from 'mongoose';

// Point schema is nested document holding coordinates
const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    }
});

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    location: String,
    coordinates: {
        type: pointSchema,
        index: '2dsphere' // 2dsphere facilitates geonear aggregation
    },
    username: String,
    userID: String, // tracks user that creates post
    image: String,
    category: {
        type: String,
        enum: ['Pets', 'Electronics', 'Bikes/Scooters', 'Jewelry', 'Clothing', 'Wallets/Purses/Bags', 'Miscellaneous']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: [String],
        default: []
    },
    userSaves: {
        type: [String],
        default: []
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;