import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/DriverDetails.css';

const DriverDetails = () => {
    const { level, name } = useParams();
    const [ details, setDetails]= useState(null);

    useEffect(() => {
        const fetchDriverDetails = async () => {
            try{
                const response = await fetch(`/data/${level}_drivers.json`);

                const data = await response.json();
                const driverData = data.find(driver => driver.name === name);
                
                setDetails(driverData);
            } catch (error) {
                console.error('Error fetching country details:', error);
            }
        };

        fetchDriverDetails();
    },  [level, name]);

    if (!details){
        return <div> Loading details...</div>;
    }

    return (
        <div className="driver-details-container">
            <div className="header-section">
                <h1>{details.name}</h1>
            </div>
            <div className="details-table-container">
                <table className="details-table">
                    <tbody>
                        <tr>
                            <th>Championships</th>
                            <td>{details.championships}</td>
                        </tr>
                        <tr>
                            <th>Wins</th>
                            <td>{details.wins}</td>
                        </tr>
                        <tr>
                            <th>Poles</th>
                            <td>{details.poles}</td>
                        </tr>
                        <tr>
                            <th>Points</th>
                            <td>{details.points}</td>
                        </tr>
                        <tr>
                            <th>Best Championship Position</th>
                            <td>{details.best_championship_position}</td>
                        </tr>
                        <tr>
                            <th>Career Span</th>
                            <td>{details.start_year} - {details.last_year}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DriverDetails;