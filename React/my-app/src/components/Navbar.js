import React from 'react'
import '../styles/Navbar.css'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link className="F1-link" to="/F1">Formula One</Link></li>
                <li><a href="/">Formula Two</a></li>
                <li><a href="/">Formula Three</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;