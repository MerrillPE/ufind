import mongoose from "mongoose";

import Post from '../models/post.js';


// get all posts
export const getPosts = async (req, res) => {
    try {
        const start = req.query.start || 0;
        const limit = req.query.limit || 10;

        const postsNum = await Post.countDocuments({});
        const posts = await Post.find().skip(start).limit(limit);

        console.log(posts);

        res.status(200).json({ data: posts, numberOfPosts: postsNum });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// get individual post with ID
export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// get local posts using query params
export const getLocalPosts = async (req, res) => {
    try {
        const { lng, lat, start, limit } = req.query;
        // use geoNear to aggregate using pointSchema nested in postSchema

        const count = await Post.aggregate(
            [{
                $geoNear: {
                    near: { type: "Point", coordinates: [Number(lng), Number(lat)] },
                    key: "coordinates",
                    distanceField: "dist.calculated",
                    maxDistance: 100000, // Checking within 100km of queried coordinates
                    includeLocs: "dist.location",
                    spherical: true
                },
            },
            { $count: "count" },
            ]
        );

        const numberOfPosts = count[0].count;

        const posts = await Post.aggregate(
            [{
                $geoNear: {
                    near: { type: "Point", coordinates: [Number(lng), Number(lat)] },
                    key: "coordinates",
                    distanceField: "dist.calculated",
                    maxDistance: 100000, // Checking within 100km of queried coordinates
                    includeLocs: "dist.location",
                    spherical: true
                },
            },
            { $skip: Number(start) },
            { $limit: Number(limit) },
            ]
        );

        res.status(200).json({ data: posts, numberOfPosts: numberOfPosts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { title, description, location, username, userID, image } = req.body;
    const coordinatesObject = JSON.parse(location).geometry.location; // parse location into JSON object
    const coordinates = { type: 'Point', coordinates: [Number(coordinatesObject.lng), Number(coordinatesObject.lat)] }; // take longitude and latitude from geocoded location

    const newPost = new Post({ title, description, location, coordinates, username, userID, image });

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    // Check if id exists
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    }

    await Post.findByIdAndRemove(id);

    res.json({ message: `Post ${id} deleted successfully` });
}

// add comment to post with given id
export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await Post.findById(id);
    post.comments.push(value);

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}

// Handle user saving post
export const savePost = async (req, res) => {

    const { id } = req.params;
    const { userID } = req.body;

    console.log("Save post backend: " + id);

    const post = await Post.findById(id);
    console.log("Found post: " + post);

    // Initialize userSaves as empty array if it doesn't exist
    post.userSaves = post?.userSaves || [];

    const index = post.userSaves.indexOf(userID);

    if (index === -1) {
        // Append userID to array if not already in it
        post.userSaves.push(userID);
    } else {
        // Remove userID if already in array
        post.userSaves.splice(index, 1);
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    console.log(updatedPost)

    res.json(updatedPost);
}

// Get saved posts for user
export const getSavedPosts = async (req, res) => {
    const { userID } = req.params;

    const savedPosts = await Post.find({ userSaves: userID });

    console.log(savedPosts);
    res.status(200).json(savedPosts);
}