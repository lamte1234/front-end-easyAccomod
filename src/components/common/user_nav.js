import React from 'react';
import {Link} from 'react-router-dom';

import LogOut from '../logout.component';


export default function Nav() {
    return(
        <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
                <Link to="/users/renter" className="navbar-brand">EasyAccomod</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <LogOut />
                        <li className="navbar-item">Welcome {localStorage.getItem('user_type')}</li>
                    </ul>
                </div>
        </nav>
    );
}