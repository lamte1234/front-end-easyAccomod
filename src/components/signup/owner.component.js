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

        axios.post('http://localhost:5000/signup/owner', dataRenter).then(res => {
            console.log(res.data);
            if (res.data.errors) {
                this.setState({
                    errors: res.data.errors
                })
            };

            if (res.data.email) {
                window.location = '/login';  //handle user page have every thing of user in res.data
            };
        });
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
                <div className="signup-container col-sm-4">
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