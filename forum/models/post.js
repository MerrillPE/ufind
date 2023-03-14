import mongoose from 'mongoose';

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
        index: '2dsphere'
    },
    username: String,
    userID: String,
    image: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    comments: {
        type: [String],
        default: []
    },
});

/*
$geoNear: {
  near: { type: "Point", coordinates: [-121.8277925, 37.28566319999999] },
  key: "coordinates",
  distanceField: "dist.calculated",
  minDistance: 100000,
  includeLocs: "dist.location",
  spherical: true
}
*/


const Post = mongoose.model('Post', postSchema);

export default Post;