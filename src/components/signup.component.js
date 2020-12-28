import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../css/signup.css';

export default class Signup extends Component {
    render() {
        return(
            <div className="">
                <nav className="navbar navbar-dark navbar-expand-lg user-nav">
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
                <br/>
                <br/>
                <br/>
                <div className="form-container col-md-6 col-lg-5 col-sm-7 col-xl-4">
                    <br/>
                    <div className="form-block col-sm-11">
                        <div className="">
                            <div className="text-center">
                                <img src="../../../home.ico" alt="logo" className="logo"/>
                                <h2 className="text-info">EasyAccomod</h2>
                            </div>
                        </div>
                        <br/>
                        <p className="slogan">EasyAccomod is much better when you have an account </p>
                        <h3 className="text-center">Sign Up Now</h3>
                        <br/>
                        <div className="link-signup">
                            <div className="text-center row">
                                <div className="text-center col-sm-6">
                                    <Link to="/signup/renter"className="d-block btn btn-info" >For Renter</Link></div>
                                <div className="text-center col-sm-6">
                                    <Link to="/signup/owner" className="d-block btn btn-info" >For Owner</Link></div>
                            </div>   
                        </div>
                    </div>
                </div>
                <h1 className="text-light slogan">Register an account to access the website</h1>
                
            </div>
        );
    }
}