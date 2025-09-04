import { useState } from "react";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (res.ok) {
                // Save token in localStorage
                localStorage.setItem("token", data.token);
                setMessage("Logged in successfully!");
            } else {
                setMessage(data.message);
            }
        } catch (err) {
            console.error(err);
            setMessage("Error logging in");
        }
    };







    return (
       <div className="sup2">
        <div className="container3">
            <form onSubmit={handleSubmit}>
                <h2 className="Lo">Login</h2>
                <p>Welcome Back</p>
                <div className="email">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required/>
                </div>

                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>


                <button type="submit">Login</button>
                {message && <p>{message}</p>}

            </form>
        </div>
</div>
    );






}


export default Login;