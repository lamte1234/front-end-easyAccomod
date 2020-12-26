import React from 'react';
import {Link} from 'react-router-dom';
import LogOut from '../logout.component';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const username = localStorage.getItem('user')
export default function NavBar() {
    return(
        <Navbar collapseOnSelect expand="lg" className="user-nav" variant="dark">
        <div className="container">
            <Navbar.Brand><Link to="/users/admin" className="navbar-brand text-light">EasyAccomod</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/users/admin/notifications" className="nav-link text-light">Notifications</Link>
                    <Link to="/users/admin/posts" className="nav-link text-light">Manage Posts</Link>
                    <Link to="/users/admin/accounts" className="nav-link text-light">Manage Accounts</Link>
                    <Link to="/users/admin/report" className="nav-link text-light">Manage Reports</Link>
                    <Link to="/users/admin/edit-auth" className="nav-link text-light">Edit Authenticate</Link>
                    <Link to="/users/admin" className="nav-link text-light">Statistics</Link>
                </Nav>
                <Nav>
                    <NavDropdown title={username} id="collasible-nav-dropdown">
                        <NavDropdown.Item><Link to="/users/change-password" className="nav-link text-dark">Change Password</Link></NavDropdown.Item>
                        <NavDropdown.Item ><LogOut/></NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </div>
    </Navbar> 
    );
}