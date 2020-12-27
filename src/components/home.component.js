import React, {Component} from 'react';
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
                            <Link to="/signup" className="nav-link text-light">
                               <button className="d-block btn btn-outline-light">Sign Up</button>
                            </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="title">
                    <div className="container">
                        <h1 className="text-light home-slogan col-sm-11">Student Housing Made Easy</h1>
                        <br/>
                        <p className="text-light home-content col-xl-9 col-lg-10 col-md-11 col-sm-11">We’re with you every step of your student journey, starting with the perfect place to live. We want to give you total peace of mind so we strive to treat every student with passion, integrity, excellence and a positive attitude.</p>
                        <div className="col-sm-5 col-lg-3">
                            <Link to="/login" className="nav-link text-light login-button">
                                <button className="d-block btn btn-light col-sm-12 text-info">Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            

        )
    }
}