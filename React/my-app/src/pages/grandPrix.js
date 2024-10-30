import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/grandPrix.css';
import { Link } from 'react-router-dom';

const GrandPrix = () => {
    const { level, year } = useParams();
    const [data, setData] = useState(null);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/data/${level}_grand_prix.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                setData(json[year]);

                if (json[year]) {
                    const countryNames = Object.keys(json[year]);
                    setCountries(countryNames);
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, [level, year]);

    if (!data) {
        return <div>Loading...</div>;
    }


    return (
        <div className='grand-prix-container'>
            <h1>Grand Prix - {year}</h1>
            <div className="table-container">
                <table className="grand-prix-table">
                    <thead>
                        <tr>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map((country, index) => (
                            <tr key={country}>
                                <td className="country-column">
                                    <Link
                                        to={`${country}`}
                                        className="details-link">
                                        {country}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GrandPrix;