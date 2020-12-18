import React, {Component} from 'react';
import Navbar from './navbar.component';
import {Link} from 'react-router-dom';
import '../css/home.css';

export default class Home extends Component {
    render() {
        return(
            <div className="home-layout">
                <nav className="navbar navbar-dark navbar-expand-lg">
                    <div className="container">
                        <Link to="/" className="navbar-brand">EasyAccomod</Link>
                        <ul className="navbar-nav navbar-right">
                            <li className="navbar-item">
                            <Link to="/login" className="nav-link text-light">
                                <button className="d-block btn btn-outline-light">Login</button>
                            </Link>
                            </li>
                            <li className="navbar-item">
                            <Link to="/signup" className="nav-link text-light">
                               <button className="d-block btn btn-outline-light">Sign Up</button>
                            </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <h1 className="text-light slogan">Easy Accomodation</h1>
                <p className="text-light content">Không biết cho content gì hay</p>
            </div>
            

        )
    }
}