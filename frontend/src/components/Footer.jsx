
import React from "react";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer style={{
            textAlign: "center",
            padding: "1rem",
            marginTop: "2rem",
            borderTop: "1px solid #ddd",
            color: "#555"
        }}>
            © {year} My Shop. All rights reserved.
        </footer>
    );
}

export default Footer;
