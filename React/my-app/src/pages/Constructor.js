import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Constructor.css';
import { Link } from 'react-router-dom';

const Constructor = () => {
    const { level } = useParams();
    const [constructors, setConstructors] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/data/${level}_constructors.json`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const construcorNames = data;

                setConstructors(construcorNames)
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, [level]);

    if (!constructors) {
        return <div>Loading...</div>;
    }

    constructors.sort((a, b) => {
        const aLast = a.end_year;
        const bLast = b.end_year;

        if (aLast > bLast) {
            return -1;
        }
        if (aLast < bLast) {
            return 1;
        }
        return 0;
    })

    return (
        <div className='constructor-header'>
            <h1>Constructors</h1>
            <Link className='home-button' to='/'>Home</Link>
            <Link className='back-button' to={`/${level}`}>Back</Link>

            <div className='constructors-table'>
                    {constructors.map((constructor) => (
                        <div key={constructor.name} className="grid">
                            <Link to={`${constructor.name}`}
                                className="details-link">
                                {constructor.name}
                            </Link>
                            {console.log(constructor)}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Constructor;