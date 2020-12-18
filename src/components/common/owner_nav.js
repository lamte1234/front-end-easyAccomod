import React from 'react';
import {Link} from 'react-router-dom';
import LogOut from '../logout.component';

const username = localStorage.getItem('user');
export default function Nav() {
    return(
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
        <Link to="/users/owner" className="navbar-brand">EasyAccomod</Link>
        <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/users/owner" className="nav-link">Notifications</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/users/owner/all-post" className="nav-link">All Posts</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/users/owner/post" className="nav-link">Post</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/users/owner/edit" className="nav-link">Edit</Link>
                </li>
                <li className="navbar-item">
                    {/* fix later */}
                    <Link to="/users/owner" className="nav-link">Statistics</Link> 
                </li>
                <li className="navbar-item">
                    <Link to="/users/owner/extend" className="nav-link">Extend</Link>
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