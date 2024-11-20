import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Driver.css';
import '../App.css';
import { Link } from 'react-router-dom';

const Driver = () => {
    const { level } = useParams();
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`/data/${level}_drivers.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const driverNames = data;

                setDrivers(driverNames)
            } catch (error){
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    },  [level]);

    if (!drivers) {
        return <div>Loading...</div>;
    }

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
        <div className='drivers-table'>
            <Link className='home-button' to='/'>Home</Link>
            <Link className='back-button' to='/F1/'>Back</Link>
            <tbody>
                {drivers.map((driver) => (
                    <tr key={driver.name}>
                        <Link to = {`${driver.name}`}
                        className="details-link">
                        {driver.name}
                        </Link>
                        {console.log(driver)}
                    </tr>
                ))}
            </tbody>
        </div>
    );
};

export default Driver;