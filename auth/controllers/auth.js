import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

// TODO: Replace with actual private key
const jwtKey = "secret_key";

export const signIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        // Check if username exists
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid credentials' }) // Do not tell whether username or password are incorrect
        };

        // Check password hash
        const correctPassword = await bcrypt.compare(password, existingUser.password);
        if (!correctPassword) {
            return res.status(400).json({ message: 'Invalid credentials' })
        };

        // Sign token using key for validating user actions
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

        // Return user info and token to frontend
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

        // Check if username already exists
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        };

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords are not the same' });
        };


        const hashedPassword = await bcrypt.hash(password, 6); // Password hashed with 6 rounds of salting

        // Create user in db and store result
        const result = await User.create({ username: username, password: hashedPassword, firstName: firstName, lastName: lastName });

        // Sign token so user is signed in after completing signup
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