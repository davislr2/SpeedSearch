import React, { useState } from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar.js";
import Searchbar from "../components/Searchbar.js";
import checkeredFlag from '../images/checkered_flag.jpg';
import car from '../images/mclaren.png'; // Import the car image

function Home() {
    const [hasResults] = useState(false);

    return (
        <div className="Home">
            <div className="banner">
                <img className="banner-image-left" src={checkeredFlag} alt="checkered flag" />
                <h1 className="banner-text">SpeedSearch</h1>
                <img className="banner-image-right" src={checkeredFlag} alt="checkered flag" />
            </div>
            <Navbar />
            <Searchbar/>
           
                <div className="home-default">
                    <div className="home-content">
                        <div className="home-text">
                            <h2>Hello! Welcome To SpeedSearch!</h2>
                            <h3>Please use one of the search query forms found below</h3>
                        </div>
                    </div>
                    <div className="query-forms-container">
                        <div className="query-forms">
                            <p>This is a list of query forms that are accepted by the search function on the site.</p>
                            <ul>
                                <li>Note: Series defaults to F1 if not specified.</li>
                                <br></br>
                                <li>[Driver] vs [Driver]</li>
                                <li>[Team] vs [Team]</li>
                                <li>Which driver has the most [counting stat] in [series]</li>
                                <li>Which team has the most [counting stat] in [series]</li>
                                <li>[Driver]</li>
                                <li>[Team]</li>
                                <li>[Year] [Series] Season</li>
                                <br></br>
                                <li>Feel free to mess around with the wording to see what works, these are just the simplest forms.</li>
                            </ul>
                        </div>
                    </div>
                    <div className='car-image-container'>
                            <img className="car" src={car} alt="car" />
                    </div>
                </div>
        </div>
    );
}

export default Home;