import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Driver.css';
import '../App.css';
import { Link } from 'react-router-dom';

const Driver = () => {
    const { level } = useParams();
    const [drivers, setDrivers] = useState([]);

    // Fetching driver data from json file based on the level
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/data/${level}_drivers.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const driverNames = data;

                setDrivers(driverNames)
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, [level]);

    if (!drivers) {
        return <div>Loading...</div>;
    }

    // Sorting function to sort the drivers based on the end year so the most recent drivers are listed first.
    drivers.sort((a, b) => {
        const aLast = a.last_year;
        const bLast = b.last_year;

        if (aLast > bLast) {
            return -1;
        }
        if (aLast < bLast) {
            return 1;
        }
        return 0;
    })

    return (
        <div className='driver-header'>
            <h1>Drivers</h1>
            {/* Back and home buttons */}
            <Link className='home-button' to='/'>Home</Link>
            <Link className='back-button' to={`/${level}`}>Back</Link>

            <div className='drivers-table'>
                {/* Mapping through the json and printing the driver names */}
                {drivers.map((driver) => (
                    <div key={driver.name} className="grid">
                        <Link to={`${driver.name}`}
                            className="details-link">
                            {driver.name}
                        </Link>
                        {console.log(driver)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Driver;