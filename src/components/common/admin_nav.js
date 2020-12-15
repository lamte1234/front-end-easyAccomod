import React from 'react';
import {Link} from 'react-router-dom';

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
                    {/* fix later */}
                    <Link to="/users/admin/accounts" className="nav-link">Manage Accounts</Link>
                </li>
                <li className="navbar-item">
                    {/* fix later */}
                    <Link to="/users/admin" className="nav-link">Statistics</Link>
                </li>
                <li className="navbar-item">
                    {/* fix later */}
                    <Link to="/users/admin/edit-auth" className="nav-link">Manage Edit</Link>
                </li>
            </ul>
        </div>
    </nav>
    );
}