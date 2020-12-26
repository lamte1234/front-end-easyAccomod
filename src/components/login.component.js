import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeAccountType = this.onChangeAccountType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            account_type: 'owner_account',
            errors: []
        }

    }


    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    onChangeAccountType(e) {
        this.setState({
            account_type: e.target.value
        });
    }

    validate() {
        let errors = [];
        const email_re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const password_re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{6,13}$/;

        if(this.state.account_type !== 'renter_account' && 
            this.state.account_type !== 'owner_account' &&
            this.state.account_type !== 'admin_account' ){
            errors.push('Invalid account.')
        }

        if(!this.state.email){
            errors.push('Email is required.');
        }
    
        if(this.state.email && !this.state.email.match(email_re)){
            errors.push('Invalid email.')
        }
    
        if(!this.state.password){
            errors.push('Password is required.');
        }

        if(this.state.email && this.state.password && !this.state.password.match(password_re)) {
            errors.push('Wrong password or email.');
        }
        
        if(errors.length) {
            this.setState({
                errors: errors
            })
            return false;
        }
        else {return true};
    }


    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
            account_type: this.state.account_type
        };
        
        if(this.validate() === true){
            axios.post('http://localhost:5000/login', user,{withCredentials: true})
            .then(res => {
                console.log(res.data);
                localStorage.setItem('user', res.data.name);
                localStorage.setItem('user_type', res.data.user_type);
                if(res.data.wishlist) {
                    localStorage.setItem('wishlist', res.data.wishlist);
                }
                if(res.data.errors) {
                    this.setState({
                        errors: res.data.errors 
                    })
                };

                if(res.data.email){
                    window.location = `/users/${res.data.user_type}`;  //handle user page have every thing of user in res.data
                };
            })
            .catch(err => console.log(err));
        }
    }


    render() {
        return (
            <div className="login-layout">
                <nav className="navbar navbar-dark navbar-expand-lg">
                    <div className="container">
                        <Link to="/" className="navbar-brand">EasyAccomod</Link>
                        <ul className="navbar-nav navbar-right">
                            <li className="navbar-item">
                            <Link to="/signup" className="nav-link text-light">
                               <button className="d-block btn btn-outline-light">Sign Up</button>
                            </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="login-container col-lg-6 col-sm-8 col-xl-4">
                    <div className="login-block col-sm-11">
                        <br />
                        {
                            this.state.errors.map((err,index) => 
                            <div className='alert alert-danger' key={index}>{err}</div>)
                        }
                        <h2 className="text-light login">Login</h2>
                        <form action="/login" method="POST" onSubmit={this.onSubmit}>
                            <div className="form-group text-light"><label htmlFor="email">Email</label>
                                <input className="form-control" id="email" type="email"
                                name="email" value={this.state.email} onChange={this.onChangeEmail} />
                            </div>
                            <div className="form-group text-light"><label htmlFor="password">Password</label>
                                <input className="form-control " id="password" type="password"
                                name="password" value={this.state.password} onChange={this.onChangePassword} />
                            </div>
                            <div className="form-group  text-light"> <label htmlFor="account_type">Account Type</label>
                                <select className="form-control" id="account_type" name="account_type"
                                value={this.state.account_type} onChange={this.onChangeAccountType}>
                                    <option value="owner_account">Owner</option>
                                    <option value="renter_account">Renter</option>
                                    <option value="admin_account">Admin</option></select></div>
                            <div className="text-center"><button className="btn btn-outline-light">Login</button></div>
                            
                        </form>
                    </div>

                </div>
                
            </div>
        );
    }
}