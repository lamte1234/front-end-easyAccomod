import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Nav() {
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
            </ul>
        </div>
    </nav>
    );
}

export default class AdminWS extends Component {


    render() {
        return (
            <div>
                <Nav></Nav>
            </div>
        )
    }

}