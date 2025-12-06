import { getAdminStats } from "../services/adminService.js";

export const adminStats = async (req, res) => {
    try {
        if (!req.user.is_admin) {
            return res.status(403).json({ message: "Access denied: Admins only." });
        }

        const stats = await getAdminStats();
        res.json(stats);
    } catch (err) {
        console.error("Admin controller error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

