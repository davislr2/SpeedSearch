import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Searchbar.css'; // Import the CSS file
import '../styles/Season.css'; // Import the CSS file

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
                    let [responseType, jsonData1, jsonData2] = response.data;
                    let parsedResults = [];

                    // VERSUS IDENTIFIER
                    if (responseType.includes('versus')) {
                        if (jsonData1 && jsonData2) {
                            // Replace single quotes with double quotes
                            jsonData1 = jsonData1.replace(/'/g, '"');
                            jsonData2 = jsonData2.replace(/'/g, '"');
                            try {
                                parsedResults.push({ type: responseType, data1: JSON.parse(jsonData1), data2: JSON.parse(jsonData2) });
                            } catch (parseError) {
                                console.error("JSON parse error:", parseError);
                            }
                        } else {
                            console.error("jsonData1 or jsonData2 is undefined or null");
                        }
                    // DRIVER OR TEAM IDENTIFIER
                    } else if (responseType === 'driver' || responseType === 'team') {
                        if (jsonData1) {
                            console.log("Original jsonData1:", jsonData1);
                            // Replace single quotes with double quotes
                            jsonData1 = jsonData1.replace(/'/g, '"');
                            console.log("Formatted jsonData1:", jsonData1);
                            try {
                                parsedResults.push({ type: responseType, data1: JSON.parse(jsonData1) });
                            } catch (parseError) {
                                console.error("JSON parse error:", parseError);
                            }
                        } else {
                            console.error("jsonData1 is undefined or null");
                        }
                    // MOST IDENTIFIER
                    } else if(responseType === 'most') {
                        if (jsonData1) {
                            parsedResults.push({ type: responseType, data1: jsonData1 });
                        }

                    } else if (responseType === 'season') {
                        if (jsonData1 && jsonData2) {
                            try {
                                jsonData1 = jsonData1.replace(/'/g, '"');
                                parsedResults.push({ type: responseType, data1: JSON.parse(jsonData1), data2: jsonData2 });
                            } catch (parseError) {
                                console.error("JSON parse error:", parseError);
                            }
                        }
                    } 
                    else {
                        if (jsonData1) {
                            parsedResults.push({ type: responseType, data1: jsonData1 });
                        } else {
                            console.error("jsonData1 is undefined or null");
                        }
                    }

                    setResults(parsedResults);
                } catch (error) {
                    console.error("API fetch error:", error);
                    setResults([]);
                }
            } else {
                setResults([]);
            }
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        setResults([]);
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
            <button onClick={clearSearch} className='clear-button'>Clear</button>

            {results && results.map((resultObj, index) => {
                // Defining function to map over results and render them.
                if (resultObj.type === 'driver_versus') {
                    let driver1name = Object.values(resultObj.data1)[0];
                    let driver2name = Object.values(resultObj.data2)[0];
                    // get rid of first item from the resultObj.data1 and resultObj.data2
                    let driver1data = Object.fromEntries(Object.entries(resultObj.data1).slice(1));
                    let driver2data = Object.fromEntries(Object.entries(resultObj.data2).slice(1));
                    // see if the driver is a champion
                    let driver1champion = driver1data['championships'][0] != 0;
                    let driver2champion = driver2data['championships'][0] != 0;
                    if (driver1data && driver2data) {
                        return (
                            <div key={index} className='searchbar-results'>
                                <div className='driver'>
                                    <h3 className = {driver1champion ? 'champion-header' : ''}>{driver1name}</h3>
                                    <ul>
                                        {Object.entries(driver1data).map(([key, value], i) => (
                                            <li key={i}><strong>{key}:</strong> {formatValue(key, value)}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='driver'>
                                    <h3 className = {driver2champion ? 'champion-header' : ''}>{driver2name}</h3>
                                    <ul>
                                        {Object.entries(driver2data).map(([key, value], i) => (
                                            <li key={i}><strong>{key}:</strong> {formatValue(key, value)}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    } else {
                        console.error("resultObj.data1 or resultObj.data2 is undefined or null");
                        return null;
                    }
                }
                if (resultObj.type === 'team_versus') {
                    // Ensure resultObj.data1 and resultObj.data2 are defined
                    if (resultObj.data1 && resultObj.data2) {
                        let team1name = Object.values(resultObj.data1)[0];
                        let team2name = Object.values(resultObj.data2)[0];
                        // get rid of first item from the resultObj.data1 and resultObj.data2
                        let team1data = Object.fromEntries(Object.entries(resultObj.data1).slice(1));
                        let team2data = Object.fromEntries(Object.entries(resultObj.data2).slice(1));
                        // see if the team has a championship
                        let team1champion = team1data['championships'] != 0;
                        let team2champion = team2data['championships'] != 0;
                        console.log(team2data['championships']);
                        return (
                            <div key={index} className='searchbar-results'>
                                <div className='driver'>
                                    <h3 className = {team1champion ? 'champion-header' : ''}>{team1name}</h3>
                                    <ul>
                                        {Object.entries(team1data).map(([key, value], i) => (
                                            <li key={i}><strong>{key}:</strong> {formatValue(key, value)}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='driver'>
                                    <h3 className = {team2champion ? 'champion-header' : ''}>{team2name}</h3>
                                    <ul>
                                        {Object.entries(team2data).map(([key, value], i) => (
                                            <li key={i}><strong>{key}:</strong> {formatValue(key, value)}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    } else {
                        console.error("resultObj.data1 or resultObj.data2 is undefined or null");
                        return null;
                    }
                }

                if (resultObj.type === 'driver' || resultObj.type === 'team') {
                    let name = Object.values(resultObj.data1)[0];
                    let data = Object.fromEntries(Object.entries(resultObj.data1).slice(1));
                    let champion = data['championships'] != 0;
                    if (resultObj.data1) {
                        return (
                            <div key={index} className='searchbar-results'>
                                <div className='driver'>
                                    <h3 className = {champion ? 'champion-header' : ''} >{name}</h3>
                                    <ul>
                                        {Object.entries(data).map(([key, value], i) => (
                                            <li key={i}><strong>{key}:</strong> {formatValue(key, value)}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                }

                if (resultObj.type === 'most') {
                    return (
                        <div key={index} className='searchbar-results'>
                            <div className='most'>
                                <p>{resultObj.data1}</p>
                            </div>
                        </div>
                    )
                }

                if (resultObj.type === 'season') {
                    let year = resultObj.data2.split(" ")[0];
                    let level = resultObj.data2.split(" ")[1];
                    let firstDriverResults = Object.values(resultObj.data1)[0];
                    let raceNames = firstDriverResults.map(result => result[0]);
                    
                    return (
                        <div className = 'searchbar-results'>
                            <h1>{level} Championship - {year}</h1>
                            <table>
                                <thead>
                                    <tr className='seasons-table-header'>
                                        <th>Driver</th>
                                        {raceNames.map((race, index) => (
                                            <th key={index}>{race}</th>
                                        ))}
                                        <th>Total Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(resultObj.data1).map(([driver, results]) => {
                                        const totalPoints = results.reduce((sum, result) => sum + parseInt(result[1]), 0);
                                        return (
                                            <tr key={driver}>
                                                <td>{driver}</td>
                                                {raceNames.map((_, index) => (
                                                    <td key={index}>
                                                        {results[index] ? results[index][1] : 0}
                                                    </td>
                                                ))}
                                                <td>{totalPoints}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )
                    
                }

                if (resultObj.type === "error") {
                    return (
                        <div key={index} className='searchbar-results'>
                            <div className='error'>
                                <h3>ERROR!</h3>
                                <p>{resultObj.data1}</p>
                            </div>
                        </div>
                    )
                }



                return null; // Ensure a return value for other types
            })}
        </div>
    );
}

const formatValue = (key, value) => {
    switch (key) {
        case 'wins':
            return `${value} 🏆`;
        case 'poles':
            return `${value} 🚦`;
        case 'championships':
            return `${value} championships`;
        case 'points':
            return `${parseFloat(value).toFixed(1)} points`;
        case 'name':
        case 'team_name':
            return <strong>{value}</strong>;
        default:
            return value;
    }
};

export default Searchbar;