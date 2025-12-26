import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import './AdminProducts.css';

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
    });

    const [editingId, setEditingId] = useState(null);
    const token = localStorage.getItem("authToken");

    // ----------------------
    // FETCH PRODUCTS
    // ----------------------
    const fetchProducts = async () => {
        if (!token) return;
        try {
            setLoading(true);
            setError("");
            const res = await fetch("http://localhost:5000/admin/products", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to load products");
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [token]);

    // ----------------------
    // FORM HANDLERS
    // ----------------------
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const resetForm = () => {
        setForm({ name: "", description: "", price: "", image: "" });
        setEditingId(null);
        setMessage("");
        setError("");
    };

    // ----------------------
    // CREATE PRODUCT
    // ----------------------
    const handleCreate = async () => {
        if (!token) return;
        setSubmitting(true);
        setMessage("");
        setError("");

        try {
            const res = await fetch("http://localhost:5000/admin/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            setMessage("✅ Product created successfully");
            resetForm();
            fetchProducts();
        } catch {
            setError("❌ Failed to create product");
        } finally {
            setSubmitting(false);
        }
    };

    // ----------------------
    // EDIT PRODUCT
    // ----------------------
    const startEdit = (product) => {
        setEditingId(product.id);
        setForm({
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
        });
        setMessage("");
        setError("");
    };

    const handleUpdate = async () => {
        if (!token) return;
        setSubmitting(true);
        setMessage("");
        setError("");

        try {
            const res = await fetch(`http://localhost:5000/admin/products/${editingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            setMessage("✅ Product updated successfully");
            resetForm();
            fetchProducts();
        } catch {
            setError("❌ Failed to update product");
        } finally {
            setSubmitting(false);
        }
    };

    // ----------------------
    // DELETE PRODUCT
    // ----------------------
    const handleDelete = async (id) => {
        if (!token) return;
        if (!confirm("Delete this product?")) return;

        setSubmitting(true);
        setMessage("");
        setError("");

        try {
            const res = await fetch(`http://localhost:5000/admin/products/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error();
            setMessage("🗑️ Product deleted");
            fetchProducts();
        } catch {
            setError("❌ Failed to delete product");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p>Loading products...</p>;

    return (
        <AdminLayout>
            <div className="admin-products">
                <h2>Admin – Manage Products</h2>

                {message && <p className="admin-success">{message}</p>}
                {error && <p className="admin-error">{error}</p>}

                <h3>{editingId ? "Edit Product" : "Create Product"}</h3>

                <div className="product-form">
                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                    />
                    <input
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                    />
                    <input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                    />
                    <input
                        name="image"
                        placeholder="Image URL"
                        value={form.image}
                        onChange={handleChange}
                    />

                    {editingId ? (
                        <>
                            <button onClick={handleUpdate} disabled={submitting}>
                                Save Changes
                            </button>
                            <button onClick={resetForm}>Cancel</button>
                        </>
                    ) : (
                        <button onClick={handleCreate} disabled={submitting}>
                            Add Product
                        </button>
                    )}
                </div>

                <h3>All Products</h3>

                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>${p.price}</td>
                            <td>
                                <img src={p.image} width="50" />
                            </td>
                            <td>
                                <button onClick={() => startEdit(p)}>Edit</button>
                                <button
                                    onClick={() => handleDelete(p.id)}
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

export default AdminProducts;

