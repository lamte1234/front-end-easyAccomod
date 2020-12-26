import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../css/signup.css'

export default class OwnerSU extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeIDCard = this.onChangeIDCard.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCfPass = this.onChangeCfPass.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            name: '',
            id_card_number: '',
            phone: '',
            address: '',
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
    onChangeIDCard(e) {
        this.setState({
            id_card_number: e.target.value
        })
    };
    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        })
    };
    onChangeAddress(e) {
        this.setState({
            address: e.target.value
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
        const phone_re = /^[0-9]{10}$/;
        const id_num_re = /^[a-zA-Z0-9]{16}$/;
        const password_re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{6,13}$/;
        const name_re = /^[a-zA-Z0-9.\s!#$%&'*+/=?^_`{|}~-]+$/;
        const address_re = /^[a-zA-Z0-9.,\s]+$/;

        if (!this.state.email) {
            errors.push('Email is required');
        }
    
        if(this.state.email && !this.state.email.match(email_re)){
            errors.push('Invalid email');
        }
        
        if (!this.state.name) {
            errors.push('Name is required');
        }
    
        if(this.state.name && !this.state.name.match(name_re)){
            errors.push('Name must be non-special text.')
        }
    
        if (!this.state.id_card_number) {
            errors.push('Identificaton number is required');
        }
    
        if(this.state.id_card_number && !this.state.id_card_number.match(id_num_re)){
            errors.push('Identification number must have 16 normal characters')
        }
    
        if (!this.state.phone) {
            errors.push('Phone is required');
        }
    
        if(this.state.phone && !this.state.phone.match(phone_re)){
            errors.push('Phone must have 10 digits');
        }
    
        if (!this.state.address) {
            errors.push('Address is required');
        }
    
        if(this.state.address && !this.state.address.match(address_re)) {
            errors.push('Invalid address');
        }
    
        if (!this.state.password) {
            errors.push('Password is required');
        }
    
        if((this.state.password && !this.state.password.match(password_re)) ||
            (this.state.cf_pass && !this.state.cf_pass.match(password_re))){
            errors.push('Password must have 6-13 non-special characters')
        }
    
        if (this.state.password !== this.state.cf_pass) {
            errors.push('Password must match');
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
            id_card_number: this.state.id_card_number,
            phone: this.state.phone,
            address: this.state.address,
            password: this.state.password,
            cf_pass: this.state.cf_pass
        }

        if(this.validate() === true) {
            axios.post('http://localhost:5000/signup/owner', dataRenter)
            .then(res => {
                console.log(res.data);
                if (res.data.errors) {
                    this.setState({
                        errors: res.data.errors
                    })
                };

                if (res.data.email) {
                    window.location = '/login';  //handle user page have every thing of user in res.data
                };
            })
            .catch(err => console.log(err));
        }
    }

    render() {
        return (
            <div className="signup-layout">
                <nav className="navbar navbar-dark navbar-expand-lg">
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
                <div className="signup-container col-md-6 col-lg-5 col-sm-7 col-xl-4">
                    <div className="signup-block col-sm-11">
                        {
                            this.state.errors.map((err,index) => 
                            <div className='alert alert-danger' key={index}>{err}</div>)
                        }
                        <h2 className="text-light signup">Create Account</h2>
                        <br/>
                        <form action="/signup/owner" method="POST" onSubmit={this.onSubmit}>
                            <div className="form-group text-light">
                                <input className="form-control" id="email" type="email" name="email" 
                                value={this.state.email} onChange={this.onChangeEmail} placeholder="Email" /></div>
                            <div className="form-group text-light">
                                <input className="form-control" id="name" type="text" name="name"
                                value={this.state.name} onChange={this.onChangeName} placeholder="Name" /></div>
                            <div className="form-group text-light">
                                <input className="form-control" id="id_card_number" type="text" name="id_card_number"
                                value={this.state.id_card_number} onChange={this.onChangeIDCard} placeholder="Identification Number" /></div>
                            <div className="form-group text-light">
                                <input className="form-control" id="phone" type="number" name="phone" 
                                value={this.state.phone} onChange={this.onChangePhone} placeholder="Phone Number" /></div>
                            <div className="form-group text-light">
                                <input className="form-control" id="address" type="text" name="address" 
                                value={this.state.address} onChange={this.onChangeAddress} placeholder="Address" /></div>
                            <div className="form-group text-light">
                                <input className="form-control" id="password" type="password" name="password" 
                                value={this.state.password} onChange={this.onChangePassword} placeholder="Password" /></div>
                            <div className="form-group text-light">
                                <input className="form-control" id="cf_pass" type="password" name="cf_pass" 
                                value={this.state.cf_pass} onChange={this.onChangeCfPass} placeholder="Confirm Password" /></div>
                            <div className="text-center"><button className="btn btn-outline-light">Sign Up</button></div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}