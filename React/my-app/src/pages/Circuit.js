import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Circuit.css';
import { Link } from 'react-router-dom';

const Circuit = () => {
    const { level } = useParams();
    const [circuits, setCircuits] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`/data/${level}_circuits.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const circuitNames = data;

                setCircuits(circuitNames)
            } catch (error){
                console.error("Error fetching data", error);
            }
        };
        
        fetchData();
    }, [level]);

    if (!circuits) {
        return <div>Loading...</div>;
    }

    return (
        <div className='circuit-table'>
            <tbody>
                {circuits.map((circuit) => (
                    <tr key={circuit.circuit_name}>
                        <Link to = {`${circuit.circuit_name}`}
                        className="details-link">
                        {circuit.circuit_name}
                        </Link>
                    </tr>
                ))}
            </tbody>
        </div>
    );
};

export default Circuit;