import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../data/users.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        if (!validEmail.test(email)) {
            return res.status(400).json({
                message: "Invalid email"
            })
        }

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            return res.status(409).json({
                message: "This user already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: users.length + 1,
            name,
            email,
            password: hashedPassword
        };

        users.push(newUser);

        res.status(201).json({
            message: "Sign up successful",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (e) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const user = users.find(user => user.email === email);

        if (!user) {
            return res.status(401).json({
                message: "This email does not exist"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }

        );
        return res.status(200).json({
            message: "Login successful",
            token
        });
    }catch (e) {
    return res.status(500).json({
        message: "Something went wrong"
    });
}

};