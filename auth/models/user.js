import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true, minLength: 5 },
    password: { type: String, required: true },
    id: { type: String, },

});

const User = mongoose.model('User', userSchema)

export default User;