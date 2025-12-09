import {
    getAllOrders,
    updateOrderStatus,
    deleteOrder
} from "../services/orderService.js";


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


export const updateOrder = async (req, res) => {
    try {
        if (!req.user.is_admin) {
            return res.status(403).json({ message: "Admins only." });
        }

        const { id } = req.params;
        const { status } = req.body;

        const updated = await updateOrderStatus(id, status);

        if (!updated) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order updated", order: updated });

    } catch (err) {
        console.error("Update order error:", err);
        res.status(500).json({ message: "Server error" });
    }
};


export const removeOrder = async (req, res) => {
    try {
        if (!req.user.is_admin) {
            return res.status(403).json({ message: "Admins only." });
        }

        const { id } = req.params;

        const deleted = await deleteOrder(id);

        if (!deleted) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order deleted" });

    } catch (err) {
        console.error("Delete order error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
