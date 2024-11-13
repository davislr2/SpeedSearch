import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ConstructorDetails.css';

const ConstructorDetails = () => {
    const {level, name } = useParams();
    const [ details, setDetails] = useState(null);

    useEffect(() => {
        const fetchConstructorDetails = async () => {
            try{
                const response = await fetch(`/data/${level}_constructors.json`);

                const data = await response.json();
                const constructorData = data.find(constructor => constructor.name === name);

                setDetails(constructorData);
            }   catch (error) {
                console.error('Error fetching constructor details:', error);
            }
        };

        fetchConstructorDetails();
    },  [level, name]);

    if (!details){
        return <div> Loading details...</div>;
    }

    return(
        <div className="constructor-details-container">
            <div className="header-section">
                <h1>{details.name}</h1>
            </div>
            <div className="details-table-container">
                <table className="details-table>">
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
                            <td>{details.start_year} - {details.end_year}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ConstructorDetails;