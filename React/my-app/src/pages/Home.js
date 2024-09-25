import React, {useState, useEffect} from 'react';
import Navbar from "../components/Navbar.js";
import Searchbar from "../components/Searchbar.js";
import Footer from "../components/Footer.js";

function Home() {
    return (
        <div className="Home">
            <Navbar />
            <Searchbar />
            <Footer />
        </div>
    );
}

export default Home;