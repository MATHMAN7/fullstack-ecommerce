import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';


dotenv.config({ path: './easy.env' });

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'Backend is running!', time: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
