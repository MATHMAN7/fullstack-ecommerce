import {
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService
} from "../services/userService.js";


export const getAllUsers = async (req, res) => {
    try {
        if (!req.user.is_admin) return res.status(403).json({ message: "Admins only." });

        const users = await getAllUsersService();
        res.json(users);
    } catch (err) {
        console.error("User controller error:", err);
        res.status(500).json({ message: "Server error" });
    }
};


export const getUserById = async (req, res) => {
    const { id } = req.params;

    if (!req.user.is_admin && req.user.id !== parseInt(id)) {
        return res.status(403).json({ message: "Forbidden" });
    }

    try {
        const user = await getUserByIdService(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        console.error("User controller error:", err);
        res.status(500).json({ message: "Server error" });
    }
};


export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, is_admin } = req.body;

    if (!req.user.is_admin) return res.status(403).json({ message: "Admins only." });

    try {
        const updatedUser = await updateUserService(id, { name, email, is_admin });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json(updatedUser);
    } catch (err) {
        console.error("User controller error:", err);
        res.status(500).json({ message: "Server error" });
    }
};


export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!req.user.is_admin) return res.status(403).json({ message: "Admins only." });

    try {
        const deleted = await deleteUserService(id);
        if (!deleted) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User deleted" });
    } catch (err) {
        console.error("User controller error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
