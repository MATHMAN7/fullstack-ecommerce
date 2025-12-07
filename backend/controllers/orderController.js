import { getAllOrders } from "../services/orderService.js";

export const fetchOrders = async (req, res) => {
    try {
        if (!req.user.is_admin) {
            return res.status(403).json({ message: "Admins only." });
        }

        const orders = await getAllOrders();
        res.json(orders);
    } catch (err) {
        console.error("Order controller error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
