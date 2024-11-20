import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../styles/F1.css';



function F1() {
    const [currentDrivers, setCurrentDrivers] = useState([]);
    const [currentConstructors, setCurrentConstructors] = useState([]);
    const [currentCircuits, setCurrentCircuits] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const driversResponse = await fetch(`/data/F1_drivers.json`);
                const driversData = await driversResponse.json();
                const currentYearDrivers = driversData.filter(
                    driver => driver.last_year === "2024"
                );
                setCurrentDrivers(currentYearDrivers);

                const constructorsResponse = await fetch(`/data/F1_constructors.json`);
                if (!constructorsResponse.ok) {
                    throw new Error(`HTTP error! status: ${constructorsResponse.status}`);
                }
                const constructorData = await constructorsResponse.json();
                const currentYearConstructors = constructorData.filter(
                    constructor => constructor.end_year === 2024
                );
                setCurrentConstructors(currentYearConstructors);

                const circuitsResponse = await fetch('/data/F1_circuits.json');
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
        <div className="F1">
            <h1>Formula One</h1>
            <Link className='home-button' to='/'>Home</Link>
            <Link className='back-button' to='../'>Back</Link>
            <h3>Seasons</h3>
            <table className='seasons-table'>
                {/* 1950-1964 */}
                <tr>
                    <td><Link className='link' to='/F1/Seasons/1950'>1950</Link></td><td><Link className='link' to='/F1/Seasons/1951'>1951</Link></td><td><Link className='link' to='/F1/Seasons/1952'>1952</Link></td>
                    <td><Link className='link' to='/F1/Seasons/1953'>1953</Link></td><td><Link className='link' to='/F1/Seasons/1954'>1954</Link></td><td><Link className='link' to='/F1/Seasons/1955'>1955</Link></td>
                    <td><Link className='link' to='/F1/Seasons/1956'>1956</Link></td><td><Link className='link' to='/F1/Seasons/1957'>1957</Link></td><td><Link className='link' to='/F1/Seasons/1958'>1958</Link></td>
                    <td><Link className='link' to='/F1/Seasons/1959'>1959</Link></td><td><Link className='link' to='/F1/Seasons/1960'>1960</Link></td><td><Link className='link' to='/F1/Seasons/1961'>1961</Link></td>
                    <td><Link className='link' to='/F1/Seasons/1962'>1962</Link></td><td><Link className='link' to='/F1/Seasons/1963'>1963</Link></td><td><Link className='link' to='/F1/Seasons/1964'>1964</Link></td>
                </tr>
                {/* 1965-1979 */}
                <tr>
                    <td><Link className='link' to='/F1/Seasons/1965'>1965</Link></td><td><Link className='link' to='/F1/Seasons/1966'>1966</Link></td><td><Link className='link' to='/F1/Seasons/1967'>1967</Link></td>
                    <td><Link className='link' to='/F1/Seasons/1968'>1968</Link></td><td><Link className='link' to='/F1/Seasons/1969'>1969</Link></td><td><Link className='link' to='/F1/Seasons/1970'>1970</Link></td>
                    <td><Link className='link' to='/F1/Seasons/1971'>1971</Link></td><td><Link className='link' to='/F1/Seasons/1972'>1972</Link></td><td><Link className='link' to='/F1/Seasons/1973'>1973</Link></td>
                    <td><Link className='link' to='/F1/Seasons/1974'>1974</Link></td><td><Link className='link' to='/F1/Seasons/1975'>1975</Link></td><td><Link className='link' to='/F1/Seasons/1976'>1976</Link></td>
                    <td><Link className='link' to='/F1/Seasons/1977'>1977</Link></td><td><Link className='link' to='/F1/Seasons/1978'>1978</Link></td><td><Link className='link' to='/F1/Seasons/1979'>1979</Link></td>
                </tr>
                {/* 1980-1994 */}
                <tr>
                    <td><Link className='link' to='/F1/Seasons/1980'>1980</Link></td><td><Link className='link' to='/F1/Seasons/1981'>1981</Link></td><td><Link className='link' to='/F1/Seasons/1982'>1982</Link></td>
                    <td><Link className='link' to='/F1/Seasons/1983'>1983</Link></td><td><Link className='link' to='/F1/Seasons/1984'>1984</Link></td><td><Link className='link' to='/F1/Seasons/1985'>1985</Link></td>
                    <td><Link className='link' to='/F1/Seasons/1986'>1986</Link></td><td><Link className='link' to='/F1/Seasons/1987'>1987</Link></td><td><Link className='link' to='/F1/Seasons/1988'>1988</Link></td>
                    <td><Link className='link' to='/F1/Seasons/1989'>1989</Link></td><td><Link className='link' to='/F1/Seasons/1990'>1990</Link></td><td><Link className='link' to='/F1/Seasons/1991'>1991</Link></td>
                    <td><Link className='link' to='/F1/Seasons/1992'>1992</Link></td><td><Link className='link' to='/F1/Seasons/1993'>1993</Link></td><td><Link className='link' to='/F1/Seasons/1994'>1994</Link></td>
                </tr>
                {/* 1995-2009 */}
                <tr>
                    <td><Link className='link' to='/F1/Seasons/1995'>1995</Link></td><td><Link className='link' to='/F1/Seasons/1996'>1996</Link></td><td><Link className='link' to='/F1/Seasons/1997'>1997</Link></td>
                    <td><Link className='link' to='/F1/Seasons/1998'>1998</Link></td><td><Link className='link' to='/F1/Seasons/1999'>1999</Link></td><td><Link className='link' to='/F1/Seasons/2000'>2000</Link></td>
                    <td><Link className='link' to='/F1/Seasons/2001'>2001</Link></td><td><Link className='link' to='/F1/Seasons/2002'>2002</Link></td><td><Link className='link' to='/F1/Seasons/2003'>2003</Link></td>
                    <td><Link className='link' to='/F1/Seasons/2004'>2004</Link></td><td><Link className='link' to='/F1/Seasons/2005'>2005</Link></td><td><Link className='link' to='/F1/Seasons/2006'>2006</Link></td>
                    <td><Link className='link' to='/F1/Seasons/2007'>2007</Link></td><td><Link className='link' to='/F1/Seasons/2008'>2008</Link></td><td><Link className='link' to='/F1/Seasons/2009'>2009</Link></td>
                </tr>
                {/* 2010-2024 */}
                <tr>
                    <td><Link className='link' to='/F1/Seasons/2010'>2010</Link></td><td><Link className='link' to='/F1/Seasons/2011'>2011</Link></td><td><Link className='link' to='/F1/Seasons/2012'>2012</Link></td>
                    <td><Link className='link' to='/F1/Seasons/2013'>2013</Link></td><td><Link className='link' to='/F1/Seasons/2014'>2014</Link></td><td><Link className='link' to='/F1/Seasons/2015'>2015</Link></td>
                    <td><Link className='link' to='/F1/Seasons/2016'>2016</Link></td><td><Link className='link' to='/F1/Seasons/2017'>2017</Link></td><td><Link className='link' to='/F1/Seasons/2018'>2018</Link></td>
                    <td><Link className='link' to='/F1/Seasons/2019'>2019</Link></td><td><Link className='link' to='/F1/Seasons/2020'>2020</Link></td><td><Link className='link' to='/F1/Seasons/2021'>2021</Link></td>
                    <td><Link className='link' to='/F1/Seasons/2022'>2022</Link></td><td><Link className='link' to='/F1/Seasons/2023'>2023</Link></td><td><Link className='link' to='/F1/Seasons/2024'>2024</Link></td>
                </tr>
            </table>

            <h3>Grand Prix</h3>
            <table className='gp-table'>
                {/* 1950-1964 */}
                <tr>
                    <td><Link className='link' to='/F1/grandPrix/1950'>1950</Link></td><td><Link className='link' to='/F1/grandPrix/1951'>1951</Link></td><td><Link className='link' to='/F1/grandPrix/1952'>1952</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/1953'>1953</Link></td><td><Link className='link' to='/F1/grandPrix/1954'>1954</Link></td><td><Link className='link' to='/F1/grandPrix/1955'>1955</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/1956'>1956</Link></td><td><Link className='link' to='/F1/grandPrix/1957'>1957</Link></td><td><Link className='link' to='/F1/grandPrix/1958'>1958</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/1959'>1959</Link></td><td><Link className='link' to='/F1/grandPrix/1960'>1960</Link></td><td><Link className='link' to='/F1/grandPrix/1961'>1961</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/1962'>1962</Link></td><td><Link className='link' to='/F1/grandPrix/1963'>1963</Link></td><td><Link className='link' to='/F1/grandPrix/1964'>1964</Link></td>
                </tr>
                {/* 1965-1979 */}
                <tr>
                    <td><Link className='link' to='/F1/grandPrix/1965'>1965</Link></td><td><Link className='link' to='/F1/grandPrix/1966'>1966</Link></td><td><Link className='link' to='/F1/grandPrix/1967'>1967</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/1968'>1968</Link></td><td><Link className='link' to='/F1/grandPrix/1969'>1969</Link></td><td><Link className='link' to='/F1/grandPrix/1970'>1970</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/1971'>1971</Link></td><td><Link className='link' to='/F1/grandPrix/1972'>1972</Link></td><td><Link className='link' to='/F1/grandPrix/1973'>1973</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/1974'>1974</Link></td><td><Link className='link' to='/F1/grandPrix/1975'>1975</Link></td><td><Link className='link' to='/F1/grandPrix/1976'>1976</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/1977'>1977</Link></td><td><Link className='link' to='/F1/grandPrix/1978'>1978</Link></td><td><Link className='link' to='/F1/grandPrix/1979'>1979</Link></td>
                </tr>
                {/* 1980-1994 */}
                <tr>
                    <td><Link className='link' to='/F1/grandPrix/1980'>1980</Link></td><td><Link className='link' to='/F1/grandPrix/1981'>1981</Link></td><td><Link className='link' to='/F1/grandPrix/1982'>1982</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/1983'>1983</Link></td><td><Link className='link' to='/F1/grandPrix/1984'>1984</Link></td><td><Link className='link' to='/F1/grandPrix/1985'>1985</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/1986'>1986</Link></td><td><Link className='link' to='/F1/grandPrix/1987'>1987</Link></td><td><Link className='link' to='/F1/grandPrix/1988'>1988</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/1989'>1989</Link></td><td><Link className='link' to='/F1/grandPrix/1990'>1990</Link></td><td><Link className='link' to='/F1/grandPrix/1991'>1991</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/1992'>1992</Link></td><td><Link className='link' to='/F1/grandPrix/1993'>1993</Link></td><td><Link className='link' to='/F1/grandPrix/1994'>1994</Link></td>
                </tr>
                {/* 1995-2009 */}
                <tr>
                    <td><Link className='link' to='/F1/grandPrix/1995'>1995</Link></td><td><Link className='link' to='/F1/grandPrix/1996'>1996</Link></td><td><Link className='link' to='/F1/grandPrix/1997'>1997</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/1998'>1998</Link></td><td><Link className='link' to='/F1/grandPrix/1999'>1999</Link></td><td><Link className='link' to='/F1/grandPrix/2000'>2000</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/2001'>2001</Link></td><td><Link className='link' to='/F1/grandPrix/2002'>2002</Link></td><td><Link className='link' to='/F1/grandPrix/2003'>2003</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/2004'>2004</Link></td><td><Link className='link' to='/F1/grandPrix/2005'>2005</Link></td><td><Link className='link' to='/F1/grandPrix/2006'>2006</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/2007'>2007</Link></td><td><Link className='link' to='/F1/grandPrix/2008'>2008</Link></td><td><Link className='link' to='/F1/grandPrix/2009'>2009</Link></td>
                </tr>
                {/* 2010-2024 */}
                <tr>
                    <td><Link className='link' to='/F1/grandPrix/2010'>2010</Link></td><td><Link className='link' to='/F1/grandPrix/2011'>2011</Link></td><td><Link className='link' to='/F1/grandPrix/2012'>2012</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/2013'>2013</Link></td><td><Link className='link' to='/F1/grandPrix/2014'>2014</Link></td><td><Link className='link' to='/F1/grandPrix/2015'>2015</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/2016'>2016</Link></td><td><Link className='link' to='/F1/grandPrix/2017'>2017</Link></td><td><Link className='link' to='/F1/grandPrix/2018'>2018</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/2019'>2019</Link></td><td><Link className='link' to='/F1/grandPrix/2020'>2020</Link></td><td><Link className='link' to='/F1/grandPrix/2021'>2021</Link></td>
                    <td><Link className='link' to='/F1/grandPrix/2022'>2022</Link></td><td><Link className='link' to='/F1/grandPrix/2023'>2023</Link></td><td><Link className='link' to='/F1/grandPrix/2024'>2024</Link></td>
                </tr>
            </table>

            <Link to='/F1/drivers' className="header-link">
                <h3>Drivers</h3>
            </Link>
            <table className='grid-table'>
                {currentDrivers.map((driver) => (
                    <div key={driver.name} className="grid">
                        <Link to={`/F1/drivers/${driver.name}`} className="details-link">
                            {driver.name}
                        </Link>
                    </div>
                ))}
            </table>

            <Link to='/F1/constructors' className="header-link">
                <h3>Constructors</h3>
            </Link>
            <table className='grid-table'>
                {currentConstructors.map((constructor) => (
                    <div key={constructor.name} className="grid">
                        <Link to={`/F1/constructors/${constructor.name}`} className="details-link">
                            {constructor.name}
                        </Link>
                    </div>
                ))}
            </table>

            <Link to='/F1/circuits' className="header-link">
                <h3>Circuits</h3>
            </Link>
            <table className='grid-table'>
                {currentCircuits.map((circuit) => (
                    <div key={circuit.circuit_name} className="grid">
                        <Link to={`/F1/circuits/${circuit.circuit_name}`} className="details-link">
                            {circuit.circuit_name}
                        </Link>
                    </div>
                ))}
            </table>
        </div>
    );
}

export default F1;