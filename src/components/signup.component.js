import React, {Component} from 'react';
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
                <h1 className="text-light slogan">Register an account to access the website</h1>
                <div className="link-signup">
                    <div className="text-center row">
                        <div className="col-sm-6">
                            <Link to="/signup/renter"className="d-block btn btn-outline-light float-right" >For Renter</Link></div>
                        <div className="col-sm-6">
                            <Link to="/signup/owner" className="d-block btn btn-outline-light float-left" >For Owner</Link></div>
                    </div>   
                </div>
            </div>
        );
    }
}