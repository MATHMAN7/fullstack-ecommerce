import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("authToken");


    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error();

            const data = await res.json();
            setUsers(data);
        } catch {
            setError("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    const toggleAdmin = async (user) => {
        setSubmitting(true);
        setError("");
        setMessage("");

        try {
            const res = await fetch(
                `http://localhost:5000/users/${user.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        is_admin: !user.is_admin,
                    }),
                }
            );

            if (!res.ok) throw new Error();

            setMessage("✅ User role updated");
            fetchUsers();
        } catch {
            setError("❌ Failed to update user role");
        } finally {
            setSubmitting(false);
        }
    };


    const deleteUser = async (id) => {
        if (!confirm("Delete this user?")) return;

        setSubmitting(true);
        setError("");
        setMessage("");

        try {
            const res = await fetch(
                `http://localhost:5000/users/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) throw new Error();

            setMessage("🗑️ User deleted");
            fetchUsers();
        } catch {
            setError("❌ Failed to delete user");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p>Loading users...</p>;

    return (
        <AdminLayout>
            <div className="admin-users">
                <h2>Admin – Manage Users</h2>

                {message && <p className="admin-success">{message}</p>}
                {error && <p className="admin-error">{error}</p>}

                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.is_admin ? "✅ Yes" : "No"}
                            </td>
                            <td>
                                <button
                                    onClick={() => toggleAdmin(user)}
                                    disabled={submitting}
                                >
                                    {user.is_admin
                                        ? "Revoke Admin"
                                        : "Make Admin"}
                                </button>

                                <button
                                    onClick={() => deleteUser(user.id)}
                                    disabled={submitting}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}

export default AdminUsers;
