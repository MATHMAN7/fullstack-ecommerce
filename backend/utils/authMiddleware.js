import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: './easy.env' });

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        req.user = {
            id: decoded.id,
            email: decoded.email,
            is_admin: decoded.is_admin
        };

        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};

export default authenticateToken;

