import React from 'react';
import '../styles/Home.css';
import {Link} from 'react-router-dom';
import Navbar from "../components/Navbar.js";
import Searchbar from "../components/Searchbar.js";
import checkeredFlag from '../images/checkered_flag.jpg';


function Home() {
    return (
        <div className="Home">
            <div className="banner">
                <img className="banner-image-left" src={checkeredFlag} alt="checkered flag" />
                <h1 className="banner-text">SpeedSearch</h1>
                <img className="banner-image-right" src={checkeredFlag} alt="checkered flag" />
            </div>
            <Navbar />
            <Searchbar />
            <Link className="query-forms-link" to="/query_forms">Query Forms</Link>
        </div>
    );
}

export default Home;