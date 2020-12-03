import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return(
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
        <Link to="/users/renter" className="navbar-brand">EasyAccomod</Link>
        <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/users/renter" className="nav-link">Search</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/users/renter" className="nav-link">Wish-list</Link>
                </li>
            </ul>
        </div>
    </nav>
    );
}

export default class RenterWS extends Component {


    render() {
        return (
            <div>
                <Nav></Nav>
            </div>
        )
    }

}