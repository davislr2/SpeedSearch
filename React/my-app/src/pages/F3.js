import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/F3.css';
import '../pages/Driver.js'
import '../pages/Constructor.js'
import '../pages/Circuit.js'

function F3(){
    return (
        <div className="F3">
            <h1>Formula Three</h1>
            <Link className='home-button' to='/'>Home</Link>
            <Link className='back-button' to='/'>Back</Link>
            <h3>Seasons</h3>
            <table className='seasons-table'>
                <tr>
                    <td><Link className='link' to='/F3/Seasons/2019'>2019</Link></td><td><Link className='link' to='/F3/Seasons/2020'>2020</Link></td><td><Link className='link' to='/F3/Seasons/2021'>2021</Link></td>
                    <td><Link className='link' to='/F3/Seasons/2022'>2022</Link></td><td><Link className='link' to='/F3/Seasons/2023'>2023</Link></td><td><Link className='link' to='/F3/Seasons/2024'>2024</Link></td>
                </tr>
            </table>

            <h3>Grand Prix</h3>
            <table className='gp-table'>
                <tr>
                    <td><Link className='link' to='/F3/grandPrix/2019'>2019</Link></td><td><Link className='link' to='/F3/grandPrix/2020'>2020</Link></td><td><Link className='link' to='/F3/grandPrix/2021'>2021</Link></td>
                    <td><Link className='link' to='/F3/grandPrix/2022'>2022</Link></td><td><Link className='link' to='/F3/grandPrix/2023'>2023</Link></td><td><Link className='link' to='/F3/grandPrix/2024'>2024</Link></td>
                </tr>
            </table>

            <Link to='/F3/drivers' className="header-link">
            <h3>Drivers</h3>
            </Link>
            <table className='drivers-table'>
                
            </table>
            <Link to='/F3/constructors' className="header-link">
            <h3>Constructors</h3>
            </Link>
            <table className='constructors-table'>
                
            </table>
            
            <Link to='/F3/circuits' className="header-link">
            <h3>Circuits</h3>
            </Link>
            <table className='circuit-table'>

            </table>
        </div>
    );
}
export default F3;