import React from 'react';
import {Link} from 'react-router-dom'; 

const user_type = localStorage.getItem('user_type')
export default function Footer(){
    return(
        <footer className="footer context-dark bottom">
            <div className="container">
                <div className="row import {Link} from 'react-router-dom'; ">
                    <div className="col-sm-6 col-md-5 col-lg-4 introduce">
                        <div className="row">
                            <img src="../../../home.ico" alt="logo" className="logo"/>
                            <Link to={`/users/${user_type}`} className=""><h3>EasyAccomod</h3></Link>
                        </div>
                        <p>Select the best student accommodation, providing safe and cozy living experience</p>
                    </div>
                    <div className="col-sm-2 col-md-3 col-lg-4 space">
                    </div>
                    <div className="col-sm-4 text-right contact">
                        <h3>Contact</h3>
                        <div className="row">
                            <div className="col-sm-8 float-right face"><i className="fab fa-facebook-square"></i></div>
                            <div className="col-sm-2 ins"><i className="fab fa-instagram-square"></i></div>
                            <div className="col-sm-2 youtube"><i className="fab fa-youtube-square"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}