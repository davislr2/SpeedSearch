import React, {useState, useEffect} from 'react';
import '../styles/Home.css';
import {Link} from 'react-router-dom';
import Navbar from "../components/Navbar.js";
import Searchbar from "../components/Searchbar.js";
import Footer from "../components/Footer.js";

function Home() {
    return (
        <div className="Home">
            <Navbar />
            <Searchbar />
            <Link className="query-forms-link" to="/query_forms">Query Forms</Link>
        </div>
    );
}

export default Home;