import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    // sửa to attrs ở Link tag
    return(
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
        <Link to="/users/renter" className="navbar-brand">EasyAccomod</Link>
        <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/users/renter" className="nav-link">Notifications</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/users/renter" className="nav-link">Post</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/users/renter" className="nav-link">Edit</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/users/renter" className="nav-link">Statistics</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/users/renter" className="nav-link">Extend</Link>
                </li>
            </ul>
        </div>
    </nav>
    );
}

export default class OwnerWS extends Component {


    render() {
        return (
            <div>
                <Nav></Nav>
            </div>
        )
    }

}