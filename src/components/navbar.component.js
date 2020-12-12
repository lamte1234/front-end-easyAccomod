import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return(
        <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
            <div className="container">
                <Link to="/" className="navbar-brand">EasyAccomod</Link>
                <ul className="navbar-nav navbar-right">
                    <li className="navbar-item">
                    <Link to="/login" className="nav-link">Log In</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/signup" className="nav-link">Sign Up</Link>
                    </li>
                </ul>
            </div>
        </nav>
        );
    }

}