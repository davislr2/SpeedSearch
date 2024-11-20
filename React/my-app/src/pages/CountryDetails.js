import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/CountryDetails.css';

const CountryDetails = () => {
    const { level, year, country } = useParams();
    const [details, setDetails] = useState(null);

    // Fetch the grand prix data. 
    useEffect(() => {
        const fetchCountryDetails = async () => {
            try {
                const response = await fetch(`/data/F1_grand_prix.json`);
                const data = await response.json();
                const countryData = data[year]?.[country];

                setDetails(countryData);
            } catch (error) {
                console.error('Error fetching country details:', error);
            }

        };

        fetchCountryDetails();
    }, [level, year, country]);

    if (!details) {
        return <div> Loading details...</div>;
    }

    return (
        <div className="country-details-container">
            {/* Home and back buttons */}
            <Link className='home-button' to='/'>Home</Link>
            <Link className='back-button' to={`/F1/grandPrix/${year}`}>Back</Link>
            <div className="header-section">
                {/* Printing preliminary info for the grand prix */}
                <div className="race-info">
                    <h1>{country} Grand Prix - {year}</h1>
                    <p>Circuit: {details.circuit}</p>
                    <p>Date: {details.date}</p>
                </div>
            </div>
            <table className="details-table">
                {/* Table headers */}
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Driver</th>
                        <th>Number</th>
                        <th>Laps</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapping through the results and printing them */}
                    {details.results.map((result, index) => (
                        <tr
                            /*Colors in based on position*/
                            key={index}
                            className={`
                            ${result.position === "1" ? 'first-place' : ''}
                            ${result.position === "2" ? 'second-place' : ''}
                            ${result.position === "3" ? 'third-place' : ''}
                            `}>
                            <td className="position-column">{result.position}</td>
                            <td className="driver-column">{result.driver_name}</td>
                            <td className="number-column">{result.number}</td>
                            <td className="laps-column">{result.laps}</td>
                            <td className="points-column">{result.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CountryDetails;