import React from 'react';
import {Link} from 'react-router-dom';
import LogOut from '../logout.component';
import Dropdown from 'react-bootstrap/Dropdown';

const username = localStorage.getItem('user')
export default function Nav() {
    return(
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg user-nav">
        <div className="container">
            <Link to="/users/owner" className="navbar-brand">EasyAccomod</Link>
            <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/users/owner" className="nav-link text-light">Notifications</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/users/owner/all-post" className="nav-link text-light">All Posts</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/users/owner/post" className="nav-link text-light">Post</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/users/owner/edit" className="nav-link text-light">Edit</Link>
                    </li>
                    <li className="navbar-item">
                        {/* fix later */}
                        <Link to="/users/owner" className="nav-link text-light">Statistics</Link> 
                    </li>
                    <li className="navbar-item">
                        {/* fix later */}
                        <Link to="/users/owner/extend" className="nav-link text-light">Extend</Link>
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