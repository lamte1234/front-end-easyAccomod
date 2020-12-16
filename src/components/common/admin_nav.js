import React from 'react';
import {Link} from 'react-router-dom';
import LogOut from '../logout.component';

const username = localStorage.getItem('user');
export default function Nav() {
    return(
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
        <Link to="/users/admin" className="navbar-brand">EasyAccomod</Link>
        <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/users/admin" className="nav-link">Notifications</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/users/admin/posts" className="nav-link">Manage Posts</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/users/admin/accounts" className="nav-link">Manage Accounts</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/users/admin/edit-auth" className="nav-link">Edit Authenticate</Link>
                </li>
                <li className="navbar-item">
                    {/* fix later */}
                    <Link to="/users/admin" className="nav-link">Statistics</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/users/change-password" className="nav-link">Change Password</Link>
                </li>
                <LogOut />
                <li className="navbar-item">Welcome {username}</li>
            </ul>
        </div>
    </nav>
    );
}