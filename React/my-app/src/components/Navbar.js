import React from 'react'
import '../styles/Navbar.css'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link className="F1-link" to="/F1">Formula One</Link></li>
                <li><Link className="F2-link" to="/F2">Formula Two</Link></li>
                <li><Link className="F3-link" to="/F3">Formula Three</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;