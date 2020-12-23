import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class LogOut extends Component {
    logout(){
        axios.post('http://localhost:5000/logout',{}, {withCredentials: true})
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
        
        if(localStorage.getItem('wishlist') !== undefined){
            localStorage.removeItem('wishlist');
        }
        localStorage.removeItem('user');
        localStorage.removeItem('user_type');
    }

    render() {
        return(
                <Link to="/login/" className="nav-link" onClick={this.logout}>Logout</Link>
        )
    }
}