/* eslint-env node */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import ordersRoutes from './routes/orders.js';
import adminRoutes from './routes/admin.js';
import dashboardRoutes from './routes/dashboard.js';

dotenv.config({ path: './easy.env' });

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);


app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'Backend is running!', time: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
