import mongoose from 'mongoose';

// TODO: Store data needed for google maps api
// Commented out image and comments for initial testing
const postSchema = mongoose.Schema({
    title: String,
    description: String,
    location: String,
    username: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

/*
const postSchema = mongoose.Schema({
    title: String,
    description: String,
    location: String,
    username: String,
    image: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    comments: {
        type: String,
        default: []
    },
});
*/

const Post = mongoose.model('Post', postSchema);

export default Post;