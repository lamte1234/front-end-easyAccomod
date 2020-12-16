import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class LogOut extends Component {
    logout(){
        axios.post('http://localhost:5000/logout',{}, {withCredentials: true})
        .then(res => {
            console.log(res.data);
            if(res.data.errors) {
                this.setState({
                    errors: res.data.errors 
                })
            };
        });
        localStorage.removeItem('user');
        localStorage.removeItem('user_type');
    }

    render() {
        return(
            <li className="navbar-item">
                {/* fix later */}
                <Link to="/login" className="nav-link" onClick={this.logout}>Logout</Link>
            </li>
        )
    }
}