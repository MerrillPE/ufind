import bcrypt from 'bycryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user';

export const signIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid credentials' })
        };

        const correctPassword = await bcrypt.compare(password, existingUser.password);
        if (!correctPassword) {
            return res.status(400).json({ message: 'Invalid credentials' })
        };

        const token = jwt.sign(
            {
                username: existingUser.username,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                _id: existingUser._id
            },
            'test',
            { expiresIn: "1hr" }
        );
        res.status(200).json({ result: existingUser, token })

    } catch (error) {
        res.status(500).json({ error });
    }
}

// TODO: create signup controller
export const signUp = async (req, res) => {
    pass
}