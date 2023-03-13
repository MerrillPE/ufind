import mongoose from "mongoose";

import Post from '../models/post.js';


export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        console.log(posts);

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getLocalPosts = async (req, res) => {
    const { lng, lat } = req.query;

    try {
        const posts = await Post.aggregate(
            [{
                $geoNear: {
                    near: { type: "Point", coordinates: [Number(lng), Number(lat)] },
                    key: "coordinates",
                    distanceField: "dist.calculated",
                    maxDistance: 100000, // Checking within 100km of queried coordinates
                    includeLocs: "dist.location",
                    spherical: true
                }
            }]
        )

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { title, description, location, username, image } = req.body;
    const coordinatesObject = JSON.parse(location).geometry.location;
    const coordinates = { type: 'Point', coordinates: [Number(coordinatesObject.lng), Number(coordinatesObject.lat)] };


    console.log('Parsed location');
    console.log(coordinates);

    const newPost = new Post({ title, description, location, coordinates, username, image });

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

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await Post.findById(id);
    post.comments.push(value);

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}