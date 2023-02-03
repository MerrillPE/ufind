import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName: { type: String, required: True },
    lastName: { type: String, required: True },
    email: { type: String, required: True },
    password: { type: String, required: True },
    id: { type: String, },

});

export default mongoose.model('User', userSchema);