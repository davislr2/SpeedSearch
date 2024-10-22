import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Searchbar.css'; // Import the CSS file

const Searchbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            if (searchTerm.trim() !== '') {
                try {
                    const response = await axios.get(`http://127.0.0.1:5000/search?query=${searchTerm}`);
                    console.log(response.data); // Log the response data for debugging
                    setResults(response.data);
                } catch (error) {
                    console.error("API fetch error: ", error);
                    setResults([]);
                }
            } else {
                setResults([]);
            }
        }
    };

    return (
        <div className='searchbar-container'>
            <input
                type='text'
                placeholder='Use one of the predefined search queries'
                value={searchTerm}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className='searchbar-input'
            />
            <ul className='searchbar-results'>
                {results.map((result, index) => (
                    <li key={index}>{result.result}</li>
                ))}
            </ul>
        </div>
    );
}

export default Searchbar;