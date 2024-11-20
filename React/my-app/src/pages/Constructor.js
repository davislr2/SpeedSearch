import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Constructor.css';
import { Link } from 'react-router-dom';

const Constructor = () => {
    const { level } = useParams();
    const [constructors, setConstructors] = useState([])

    // Fetching the data from json file based on the level
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`/data/${level}_constructors.json`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const construcorNames = data;

                setConstructors(construcorNames)
            } catch (error){
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    },  [level]);

    if (!constructors) {
        return <div>Loading...</div>;
    }

    {/* Sorting function to sort the constructors based on the end year so the most recent teams are listed first. */}
    constructors.sort((a, b) => {
        const aLast = a.end_year;
        const bLast = b.end_year;

        if (aLast > bLast) {
            return -1;
        }
        if (aLast < bLast) {
            return 1;
        }
        return 0
    })

    // Print the constructor names
    return (
        <div className='constructors-table'>
            <tbody>
                {/* Back and home buttons */}
                <Link className='home-button' to='/'>Home</Link>
                <Link className='back-button' to={`/F1/`}>Back</Link>
                {constructors.map((constructor) => (
                    <tr key={constructor.name}>
                        {/*Link to the constructor details page*/}
                        <Link to = {`${constructor.name}`}
                        className ="details-link">
                        {constructor.name}
                        </Link>
                        {console.log(constructor)}
                    </tr>
                ))}
            </tbody>
        </div>
    );
};

export default Constructor;