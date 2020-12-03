import React, {Component} from 'react';
import Navbar from './navbar.component';
import {Link} from 'react-router-dom';

export default class Signup extends Component {
    render() {
        return(
            <div>
                <Navbar />
                <br />
                <Link to="/signup/renter" className="nav-link">Renter</Link>
                <Link to="/signup/owner" className="nav-link">Owner</Link>
            </div>
        );
    }
}