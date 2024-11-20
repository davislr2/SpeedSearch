import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../styles/F2.css';

function F2() {
    const [currentDrivers, setCurrentDrivers] = useState([]);
    const [currentConstructors, setCurrentConstructors] = useState([]);
    const [currentCircuits, setCurrentCircuits] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const driversResponse = await fetch(`/data/F2_drivers.json`);
                const driversData = await driversResponse.json();
                const currentYearDrivers = driversData.filter(
                    driver => driver.last_year === "2024"
                );
                setCurrentDrivers(currentYearDrivers);

                const constructorsResponse = await fetch(`/data/F2_constructors.json`);
                if (!constructorsResponse.ok) {
                    throw new Error(`HTTP error! status: ${constructorsResponse.status}`);
                }
                const constructorData = await constructorsResponse.json();
                const currentYearConstructors = constructorData.filter(
                    constructor => constructor.end_year === 2024
                );
                setCurrentConstructors(currentYearConstructors);

                const circuitsResponse = await fetch('/data/F2_circuits.json');
                if (!circuitsResponse.ok) {
                    throw new Error(`HTTP error! status: ${circuitsResponse.status}`);
                }
                const circuitData = await circuitsResponse.json();
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
        <div className="F2">
            <h1>Formula Two</h1>
            <Link className='home-button' to='/'>Home</Link>
            <Link className='back-button' to='/'>Back</Link>
            <h3>Seasons</h3>
            <table className='seasons-table'>
                <tr>
                    <td><Link className='link' to='/F2/Seasons/2017'>2017</Link></td><td><Link className='link' to='/F2/Seasons/2018'>2018</Link></td><td><Link className='link' to='/F2/Seasons/2019'>2019</Link></td>
                    <td><Link className='link' to='/F2/Seasons/2020'>2020</Link></td><td><Link className='link' to='/F2/Seasons/2021'>2021</Link></td><td><Link className='link' to='/F2/Seasons/2022'>2022</Link></td>
                    <td><Link className='link' to='/F2/Seasons/2023'>2023</Link></td><td><Link className='link' to='/F2/Seasons/2024'>2024</Link></td>
                </tr>
            </table>

            <h3>Grand Prix</h3>
            <table className='gp-table'>
                <tr>
                    <td><Link className='link' to='/F2/grandPrix/2017'>2017</Link></td><td><Link className='link' to='/F2/grandPrix/2018'>2018</Link></td><td><Link className='link' to='/F2/grandPrix/2019'>2019</Link></td>
                    <td><Link className='link' to='/F2/grandPrix/2020'>2020</Link></td><td><Link className='link' to='/F2/grandPrix/2021'>2021</Link></td><td><Link className='link' to='/F2/grandPrix/2022'>2022</Link></td>
                    <td><Link className='link' to='/F2/grandPrix/2023'>2023</Link></td><td><Link className='link' to='/F2/grandPrix/2024'>2024</Link></td>
                </tr>
            </table>

            <Link to='/F2/drivers' className="header-link">
                <h3>Drivers</h3>
            </Link>
            <table className='grid-table'>
                {currentDrivers.map((driver) => (
                    <div key={driver.name} className="grid">
                        <Link to={`/F2/drivers/${driver.name}`} className="details-link">
                            {driver.name}
                        </Link>
                    </div>
                ))}
            </table>

            <Link to='/F2/constructors' className="header-link">
                <h3>Constructors</h3>
            </Link>
            <table className='grid-table'>
                {currentConstructors.map((constructor) => (
                    <div key={constructor.name} className="grid">
                        <Link to={`/F2/constructors/${constructor.name}`} className="details-link">
                            {constructor.name}
                        </Link>
                    </div>
                ))}
            </table>

            <Link to='/F2/circuits' className="header-link">
                <h3>Circuits</h3>
            </Link>
            <table className='grid-table'>
                {currentCircuits.map((circuit) => (
                    <div key={circuit.circuit_name} className="grid">
                        <Link to={`/F2/circuits/${circuit.circuit_name}`} className="details-link"> 
                        {circuit.circuit_name}
                        </Link>
                    </div>
                ))}
            </table>
        </div>
    );
}
export default F2;