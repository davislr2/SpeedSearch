import React from 'react'
import '../styles/Footer.css'


function Footer() {
    return (
        <footer className="footer">
            <div className="additional-resources">
                <h2 className="resources-header">Additional Resources</h2>
                <ul>
                    <li><a href="https://www.formula1.com/"     target="_blank">Formula One</a></li>
                    <li><a href="https://www.fiaformula2.com/"  target="_blank">Formula Two</a></li>
                    <li><a href="https://www.fiaformula3.com/"  target="_blank">Formula Three</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;