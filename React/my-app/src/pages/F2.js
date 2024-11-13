import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/F2.css';
import '../pages/Driver.js'
import '../pages/Constructor.js'
import '../pages/Circuit.js'

function F2(){
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
            <table className='drivers-table'>
                
            </table>
            <Link to='/F2/constructors' className="header-link">
            <h3>Constructors</h3>
            </Link>
            <table className='constructors-table'>
                
            </table>
            
            <Link to='/F2/circuits' className="header-link">
            <h3>Circuits</h3>
            </Link>
            <table className='circuit-table'>

            </table>
            
        </div>
    );
}
export default F2;