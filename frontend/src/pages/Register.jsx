import { useState } from "react";
import "./Register.css";
import "@fontsource/pt-serif";      // Regular weight
import "@fontsource/pt-serif/700.css"; // Bold weight



function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await res.json();
            setMessage(data.message);
        } catch (err) {
            console.error(err);
            setMessage("Error registering user");
        }
    };



    return (

<div className="sup">

        <div className="container2">

            <form onSubmit={handleSubmit}>

                <h2 className="reg">Say HI!</h2>


                <div className="username">
                    <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}required
                    placeholder="Username"
                    />
                </div>
                <div className="email">
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}required
                    placeholder="Email"/>
                </div>

                <div className="password">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}required
                        placeholder="Password"
                    />

                </div>




                <button type="submit">Register</button>

                {message && <p>{message}</p>}
            </form>



        </div>
</div>
    );
}

export default Register;
