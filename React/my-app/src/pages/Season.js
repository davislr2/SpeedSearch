import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Season.css';

const Season = () => {
    const { level, year } = useParams();
    const [data, setData] = useState(null);
    const [races, setRaces] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/data/${level}_seasons.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                setData(json[year]);

                // Extract race names from the first driver's results
                if (json[year]) {
                    const firstDriverResults = Object.values(json[year])[0];
                    const raceNames = firstDriverResults.map(result => result[0]);
                    setRaces(raceNames);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchData();
    }, [level, year]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{level} Championship - {year}</h1>
            <table>
                <thead>
                    <tr className='seasons-table-header'>
                        <th>Driver</th>
                        {races.map((race, index) => (
                            <th key={index}>{race}</th>
                        ))}
                        <th>Total Points</th> {/* Add a column for Total Points */}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(data).map(([driver, results]) => {
                        // Calculate total points for the driver
                        const totalPoints = results.reduce((sum, result) => sum + parseInt(result[1]), 0);
                        
                        return (
                            <tr key={driver}>
                                <td>{driver}</td>
                                {races.map((_, index) => (
                                    <td key={index}>
                                        {results[index] ? results[index][1] : 0} {/* Points or 0 if no data */}
                                    </td>
                                ))}
                                <td>{totalPoints}</td> {/* Display Total Points */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Season;
