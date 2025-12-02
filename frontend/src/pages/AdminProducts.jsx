import { useEffect, useState } from "react";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        image: ""
    });
    const [editingId, setEditingId] = useState(null);

    const token = localStorage.getItem("authToken");


    const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:5000/products");
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            setError("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleCreate = async () => {
        try {
            const res = await fetch("http://localhost:5000/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const msg = await res.text();
                return alert("Error creating product: " + msg);
            }

            setForm({ name: "", description: "", price: "", image: "" });
            fetchProducts();
        } catch (err) {
            alert("Failed to create product");
        }
    };


    const startEdit = (p) => {
        setEditingId(p.id);
        setForm({
            name: p.name,
            description: p.description,
            price: p.price,
            image: p.image,
        });
    };

    // Save edited product
    const handleUpdate = async () => {
        try {
            const res = await fetch(`http://localhost:5000/products/${editingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) return alert("Error updating product");

            setEditingId(null);
            setForm({ name: "", description: "", price: "", image: "" });
            fetchProducts();
        } catch (err) {
            alert("Failed to update product");
        }
    };

    // Delete  product
    const handleDelete = async (id) => {
        if (!confirm("Delete this product?")) return;

        try {
            const res = await fetch(`http://localhost:5000/products/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) return alert("Error deleting");

            fetchProducts();
        } catch (err) {
            alert("Failed to delete product");
        }
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="admin-products">
            <h2>Admin – Manage Products</h2>

            <h3>{editingId ? "Edit Product" : "Create Product"}</h3>

            <div className="product-form">
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
                <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />
                <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />

                {editingId ? (
                    <button onClick={handleUpdate}>Save Changes</button>
                ) : (
                    <button onClick={handleCreate}>Add Product</button>
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
                        <td><img src={p.image} width="50" /></td>
                        <td>
                            <button onClick={() => startEdit(p)}>Edit</button>
                            <button onClick={() => handleDelete(p.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
}

export default AdminProducts;
