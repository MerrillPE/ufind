import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName: { type: String, required: True },
    lastName: { type: String, required: True },
    username: { type: String, required: True, unique: True, trim: True, minLength: 5 },
    password: { type: String, required: True },
    id: { type: String, },

});

const User = mongoose.model('User', userSchema)

export default User;