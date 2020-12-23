import React from 'react';
import {Link} from 'react-router-dom';

import LogOut from '../logout.component';


export default function Nav() {
    return(
        <nav className="navbar navbar-dark bg-primary navbar-expand-lg user-nav">
            <div className="container">
                <Link to={'/users/'+localStorage.getItem('user_type')} className="navbar-brand">EasyAccomod</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                    <div className="navbar-item navbar-nav text-light"><LogOut/></div>
                    <div className="navbar-item nav-link text-light">Hi, {localStorage.getItem('user_type')}</div>
                </div>
            </div>
                
        </nav>
    );
}