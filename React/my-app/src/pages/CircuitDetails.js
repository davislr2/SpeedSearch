import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/CircuitDetails.css';
import { Link } from 'react-router-dom';

const CircuitDetails = () => {
    const { level, name } = useParams();
    const [details, setDetails] = useState(null);

    // Fetch data from json file based on the level
    useEffect(() => {
        const fetchCircuitDetails = async () => {
            try {
                const response = await fetch(`/data/${level}_circuits.json`);

                const data = await response.json();
                const constructorData = data.find(constructor => constructor.circuit_name === name);

                setDetails(constructorData);
            } catch (error) {
                console.error('Error fetching circuit details:', error);
            }
        };

        fetchCircuitDetails();
    }, [level, name]);

    if (!details) {
        return <div> Loading details...</div>;
    }

    return (
        <div className="circuit-details-container">
            {/* Back and Home buttons */}
            <Link className='back-button' to={`/F1/circuits`}>Back</Link>
            <Link className='home-button' to='/'>Home</Link>
            {/* Print the circuit name */}
            <div className="header-section">
                <Link className='home-button' to='/'>Home</Link>
                <Link className='back-button' to={`/${level}/circuits`}>Back</Link>
                <h1>{details.circuit_name}</h1>
            </div>
            {/* Print the circuit details */}
            <div className="details-table-container">
                <table className="details-table">
                    <tbody>
                        <tr>
                            <th>Circuit Location</th>
                            <td>{details.circuit_location}</td>
                        </tr>
                        <tr>
                            <th>Corners</th>
                            <td>{details.no_corners}</td>
                        </tr>
                        <tr>
                            <th>Length</th>
                            <td>{details.length}</td>
                        </tr>
                        <tr>
                            <th>Track Usage Span</th>
                            <td>{details.first_year} - {details.last_year}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CircuitDetails;