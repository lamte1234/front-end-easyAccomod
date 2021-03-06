import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../css/signup.css'

export default class RenterSU extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCfPass = this.onChangeCfPass.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            name: '',
            password: '',
            cf_pass: '',
            errors: []
        }
    };

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    };
    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    };
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    };
    onChangeCfPass(e) {
        this.setState({
            cf_pass: e.target.value
        })
    };

    validate() {
        let errors = [];
        const email_re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const password_re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{6,13}$/;
        const name_re = /^[a-zA-Z0-9.\s!#$%&'*+/=?^_`{|}~-]+$/;

        if (!this.state.email) {
            errors.push('Email is required.');
        }
    
        if(this.state.email && !this.state.email.match(email_re)){
            errors.push('Invalid email.');
        }
    
        if (!this.state.name) {
            errors.push('Name is required.');
        }
    
        if(this.state.name && !this.state.name.match(name_re)){
            errors.push('Name must be non-special text.')
        }
    
        if (!this.state.password) {
            errors.push('Password is required.');
        }
    
        if((this.state.password && !this.state.password.match(password_re)) ||
            (this.state.cf_pass && !this.state.cf_pass.match(password_re))){
            errors.push('Password must have 6-13 non-special characters')
        }
    
        if (this.state.password !== this.state.cf_pass) {
            errors.push('Password must match.');
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

        const dataRenter = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
            cf_pass: this.state.cf_pass
        }

        if(this.validate() === true) {
            axios.post('http://localhost:5000/signup/renter', dataRenter)
            .then(res => {
                if (res.status === 200 && res.data.errors) {
                    this.setState({
                        errors: res.data.errors
                    })
                };

                if (res.status === 201) {
                    alert('Sign up successfully! Please login!');
                    window.location = '/login';  
                };
            })
            .catch(err => console.log(err))
        }
    };


    render() {
        return (
            <div className="">
                <nav className="navbar navbar-dark navbar-expand-lg user-nav">
                    <div className="container">
                        <Link to="/" className="navbar-brand">EasyAccomod</Link>
                        <ul className="navbar-nav navbar-right">
                            <li className="navbar-item">
                            <Link to="/login" className="nav-link text-light">
                               <button className="d-block btn btn-outline-light">Login</button>
                            </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br/>
                <br/>
                <div className="signup-container col-md-6 col-lg-5 col-sm-7 col-xl-4">
                    <br/>
                    <div className="signup-block col-sm-11">
                        {
                            this.state.errors.map((err,index) => 
                            <div className='alert alert-danger' key={index}>{err}</div>)
                        }
                        <h2 className="signup">Create Account</h2>
                        <br/>
                        <form action="/signup/owner" method="POST" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input className="form-control" id="email" type="email" name="email" 
                                value={this.state.email} onChange={this.onChangeEmail} placeholder="Email" /></div>
                            <div className="form-group">
                                <input className="form-control" id="name" type="text" name="name"
                                value={this.state.name} onChange={this.onChangeName} placeholder="Name" /></div>
                            <div className="form-group">
                                <input className="form-control" id="password" type="password" name="password" 
                                value={this.state.password} onChange={this.onChangePassword} placeholder="Password" /></div>
                            <div className="form-group">
                                <input className="form-control" id="cf_pass" type="password" name="cf_pass" 
                                value={this.state.cf_pass} onChange={this.onChangeCfPass} placeholder="Confirm Password" /></div>
                            <div className="text-center"><button className="btn btn-info">Sign Up</button></div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}