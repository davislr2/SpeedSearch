import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/CircuitDetails.css';

const CircuitDetails = () => {
    const { level, name } = useParams();
    const [details, setDetails] = useState(null);

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
    },  [level, name]);

    if (!details){
        return <div> Loading details...</div>;
    }

    return (
        <div className="circuit-details-container">
            <div className="header-section">
                <h1>{details.circuit_name}</h1>
            </div>
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