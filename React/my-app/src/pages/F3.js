import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../styles/F3.css';

function F3() {
    const [currentDrivers, setCurrentDrivers] = useState([]);
    const [currentConstructors, setCurrentConstructors] = useState([]);
    const [currentCircuits, setCurrentCircuits] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch driver data from json files
                const driversResponse = await fetch(`/data/F3_drivers.json`);
                const driversData = await driversResponse.json();

                // Filter the drivers based on the last year so that only the current drivers are displayed
                const currentYearDrivers = driversData.filter(
                    driver => driver.last_year === "2024"
                );
                setCurrentDrivers(currentYearDrivers);

                // Fetch constructor data from json files
                const constructorsResponse = await fetch(`/data/F3_constructors.json`);
                if (!constructorsResponse.ok) {
                    throw new Error(`HTTP error! status: ${constructorsResponse.status}`);
                }
                const constructorData = await constructorsResponse.json();

                // Filter the constructors based on the last year so that only the current constructors are displayed
                const currentYearConstructors = constructorData.filter(
                    constructor => constructor.end_year === 2024
                );
                setCurrentConstructors(currentYearConstructors);

                // Fetch circuit data from json files
                const circuitsResponse = await fetch('/data/F3_circuits.json');
                if (!circuitsResponse.ok) {
                    throw new Error(`HTTP error! status: ${circuitsResponse.status}`);
                }
                const circuitData = await circuitsResponse.json();

                // Filter the circuits based on the last year so that only the current circuits are displayed
                const currentYearCircuits = circuitData.filter(
                    circuit => circuit.last_year === "2024"
                );
                setCurrentCircuits(currentYearCircuits);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    return (
        <div className="F3">
            <h1>Formula Three</h1>
            {/* Home and back buttons */}
            <Link className='home-button' to='/'>Home</Link>
            <Link className='back-button' to='/'>Back</Link>
            <h3>Seasons</h3>
            {/* Printing the seasons */}
            <table className='seasons-table'>
                <tr>
                    <td><Link className='link' to='/F3/Seasons/2019'>2019</Link></td><td><Link className='link' to='/F3/Seasons/2020'>2020</Link></td><td><Link className='link' to='/F3/Seasons/2021'>2021</Link></td>
                    <td><Link className='link' to='/F3/Seasons/2022'>2022</Link></td><td><Link className='link' to='/F3/Seasons/2023'>2023</Link></td><td><Link className='link' to='/F3/Seasons/2024'>2024</Link></td>
                </tr>
            </table>

            <h3>Grand Prix</h3>
            {/* Printing the grand prix */}
            <table className='gp-table'>
                <tr>
                    <td><Link className='link' to='/F3/grandPrix/2019'>2019</Link></td><td><Link className='link' to='/F3/grandPrix/2020'>2020</Link></td><td><Link className='link' to='/F3/grandPrix/2021'>2021</Link></td>
                    <td><Link className='link' to='/F3/grandPrix/2022'>2022</Link></td><td><Link className='link' to='/F3/grandPrix/2023'>2023</Link></td><td><Link className='link' to='/F3/grandPrix/2024'>2024</Link></td>
                </tr>
            </table>

            <Link to='/F3/drivers' className="header-link">
                <h3>Drivers</h3>
            </Link>

            {/* Printing the drivers from the list of current drivers. */}
            <table className='grid-table'>
                {currentDrivers.map((driver) => (
                    <div key={driver.name} className="grid">
                        <Link to={`/F3/drivers/${driver.name}`} className="details-link">
                            {driver.name}
                        </Link>
                    </div>
                ))}
            </table>
            <Link to='/F3/constructors' className="header-link">
                <h3>Constructors</h3>
            </Link>

            {/* Printing the constructors from the list of current constructors. */}
            <table className='grid-table'>
                {currentConstructors.map((constructor) => (
                    <div key={constructor.name} className="grid">
                        <Link to={`/F3/constructors/${constructor.name}`} className="details-link">
                            {constructor.name}
                        </Link>
                    </div>
                ))}
            </table>

            <Link to='/F3/circuits' className="header-link">
                <h3>Circuits</h3>
            </Link>  
            {/* Printing the circuits from the list of current circuits. */}
            <table className='grid-table'>
                {currentCircuits.map((circuit) => (
                    <div key={circuit.circuit_name} className="grid">
                        <Link to={`/F3/circuits/${circuit.circuit_name}`} className="details-link">
                            {circuit.circuit_name}
                        </Link>
                    </div>
                ))}
            </table>
        </div>
    );
}
export default F3;