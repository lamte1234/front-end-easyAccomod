import React, {Component} from 'react';
import Navbar from '../components/navbar.component';
import {Link} from 'react-router-dom';
import '../css/signup.css';

export default class Signup extends Component {
    render() {
        return(
            <div className="signup-layout">
                <nav className="navbar navbar-dark navbar-expand-lg">
                    <div className="container">
                        <Link to="/" className="navbar-brand">EasyAccomod</Link>
                        <ul className="navbar-nav navbar-right">
                            <li className="navbar-item">
                            <Link to="/login" className="nav-link text-light">
                               <button className="d-block btn btn-outline-light">Login</button>
                            </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container text-center">

                    <div className="link-signup row">
                        <Link to="/signup/renter">
                            <div className="text-center"></div>
                            <button className="d-block btn btn-outline-light">For Renter</button>
                        </Link>
                        <Link to="/signup/owner">
                            <button className="d-block btn btn-outline-light">For Owner</button>
                        </Link>
                    </div>
                        
                </div>
                
            </div>
        );
    }
}