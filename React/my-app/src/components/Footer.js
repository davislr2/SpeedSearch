import React from 'react'
import '../styles/Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="additional-resources">
                <h2>Additional Resources</h2>
                <ul>
                    <li><a href="https://www.formula1.com/">Formula One</a></li>
                    <li><a href="https://www.fiaformula2.com/">Formula Two</a></li>
                    <li><a href="https://www.fiaformula3.com/">Formula Three</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;