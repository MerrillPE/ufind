import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

const jwtKey = "secret_key";

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
            jwtKey,
            { expiresIn: "1hr" }
        );
        res.status(200).json({ user: existingUser, token })

    } catch (error) {
        res.status(500).json({ error });
    }
}


export const signUp = async (req, res) => {
    //console.log("Req.body: \n" + req.body);
    const { username, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        };

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords are not the same' });
        };

        const hashedPassword = await bcrypt.hash(password, 6); // Password hashed with 6 rounds of salting

        const result = await User.create({ username: username, password: hashedPassword, firstName: firstName, lastName: lastName });


        const token = jwt.sign(
            {
                username: result.username,
                firstName: result.firstName,
                lastName: result.lastName,
                _id: result._id
            },
            jwtKey,
            { expiresIn: "1hr" }
        );


        res.status(200).json({ user: result, token })
    } catch (error) {
        res.status(500).json({ error });
    }
}