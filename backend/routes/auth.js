import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();


router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    console.log('Register route hit');
    console.log('Request body:', req.body);

    try {

        const userCheck = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered', user: newUser.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("USER FROM DB:", user.rows[0]);
    console.log("VALID PASSWORD?", validPassword);
    console.log("TOKEN:", token);



    try {

        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }


        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }


        const token = jwt.sign(
            {
                id: user.rows[0].id,
                email: user.rows[0].email,
                is_admin: user.rows[0].is_admin   // <-- IMPORTANT FIX
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Logged in', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default router;
