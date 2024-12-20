import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Circuit.css';
import { Link } from 'react-router-dom';

const Circuit = () => {
    const { level } = useParams();
    const [circuits, setCircuits] = useState(null);

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/data/${level}_circuits.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const circuitNames = data;

                setCircuits(circuitNames)
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, [level]);

    if (!circuits) {
        return <div>Loading...</div>;
    }


    return (
        <div className='circuit-header'>
            <h1>Circuits</h1>
            {/* Back and Home buttons */}
            <Link className='home-button' to='/'>Home</Link>
            <Link className='back-button' to={`/${level}`}>Back</Link>

            <div className='circuit-table'>
                {/*map through the circuit names and print them in a table*/}
                {circuits.map((circuit) => (
                    <div key={circuit.circuit_name} className="grid">
                        {/*Link to the circuit details page*/}
                        <Link to={`${circuit.circuit_name}`}
                            className="details-link">
                            {circuit.circuit_name}
                        </Link>
                        {console.log(circuit)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Circuit;