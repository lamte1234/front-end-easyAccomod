import React from 'react';
import {Link} from 'react-router-dom';
import LogOut from '../logout.component';
import Dropdown from 'react-bootstrap/Dropdown';

const username = localStorage.getItem('user');
export default function Nav() {
    return(
                <nav className="navbar navbar-dark navbar-expand-lg user-nav">
                    <div className="container">
                        <Link to="/users/renter" className="navbar-brand">EasyAccomod</Link>
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/users/renter/search" className="nav-link text-light">Search</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/users/renter/wishlist" className="nav-link text-light">Wish-list</Link>
                                </li>
                            </ul>
                            <div className="navbar-item text-light nav-link">Hi, {username}</div>
                            <Dropdown>
                                <Dropdown.Toggle variant="info" id="dropdown-menu">
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item><Link to="/users/change-password" className="nav-link">Change Password</Link></Dropdown.Item>
                                    <Dropdown.Item><LogOut /></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    
                </nav>
        
    );
}