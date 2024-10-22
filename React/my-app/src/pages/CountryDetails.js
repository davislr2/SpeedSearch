import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/CountryDetails.css';

const CountryDetails = () => {
    const { year, country } = useParams();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchCountryDetails = async () => {
            try {
                const response = await fetch(`/data/F1_grand_prix.json`);
                const data = await response.json();
                const countryData = data[year]?.[country.toUpperCase()];
                setDetails(countryData);
            } catch (error) {
                console.error('Error fetching country details:', error);
            }
        };

        fetchCountryDetails();
    }, [year, country]);

    if (!details) {
        return <div> Loading details...</div>;
    }

    return(
        <div>
            <h2>{country} Grand Prix - {year}</h2>
            {/* stuff */}
            <pre>{JSON.stringify(details, null, 2)}</pre>
        </div>
    );
};

export default CountryDetails;