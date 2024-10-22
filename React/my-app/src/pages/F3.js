import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/F3.css';

function F3(){
    return (
        <div className="F3">
            <h1>Formula Three</h1>
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

            <h3>Drivers</h3>
            <table className='drivers-table'>
                <tr>

                </tr>
            </table>

            <h3>Constructors</h3>
            <table className='constructors-table'>
                <tr>

                </tr>
            </table>
            <h3>Circuits</h3>
            <table className='circut-table'>
                <tr>

                </tr>
            </table>
        </div>
    );
}
export default F3;