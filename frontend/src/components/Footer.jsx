import React from "react";
import "./Footer.css";
import LINKS from './new_config';

import { Github, Linkedin, Instagram, Mail } from "lucide-react";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <div className="footerBox">
            <h2 className="footer_tagline">Got a project? Let’s make it happen.</h2>

            <div className="links">
                <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram size={30} />
                </a>
                <a href={`mailto:${LINKS.mail}`} target="_blank" rel="noopener noreferrer">
                    <Mail size={30} />
                </a>
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin size={30} />
                </a>
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
                    <Github size={30} />
                </a>
            </div>

            <footer className="footer">
                © {year} My Shop. All rights reserved.
            </footer>
        </div>
    );
}

export default Footer;
