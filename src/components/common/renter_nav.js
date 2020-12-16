import React from 'react';
import {Link} from 'react-router-dom';
import LogOut from '../logout.component';

const username = localStorage.getItem('user');
export default function Nav() {

    return(
                <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
                    <Link to="/users/renter" className="navbar-brand">EasyAccomod</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/users/renter/search" className="nav-link">Search</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/users/renter/wishlist" className="nav-link">Wish-list</Link>
                            </li>
                            <LogOut />
                            <li className="navbar-item">Welcome {username}</li>
                        </ul>
                    </div>
                </nav>
        
    
    );
}