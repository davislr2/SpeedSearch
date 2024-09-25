import React from 'react'
import '../styles/Navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><a href="/">Formula One</a></li>
                <li><a href="/">Formula Two</a></li>
                <li><a href="/">Formula Three</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;