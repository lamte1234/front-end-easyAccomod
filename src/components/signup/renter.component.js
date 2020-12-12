import React, { Component } from 'react';
import Navbar from '../navbar.component';
import axios from 'axios';

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
    onSubmit(e) {
        e.preventDefault();

        const dataRenter = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
            cf_pass: this.state.cf_pass
        }

        axios.post('http://localhost:5000/signup/renter', dataRenter).then(res => {
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
    };


    render() {
        return (
            <div>
                <div className="container">
                    <br />
                    {
                        this.state.errors.map((err, index) =>
                            <div className='alert alert-danger' key={index}>{err}</div>)
                    }
                    <form action="/signup/renter" method="POST" onSubmit={this.onSubmit}>
                        <div className="form-group"><label htmlFor="email" >Email</label>
                            <input className="form-control" id="email" type="email" name="email" value={this.state.email} onChange={this.onChangeEmail} /></div>
                        <div className="form-group"><label htmlFor="name">Name</label>
                            <input className="form-control" id="name" type="text" name="name" value={this.state.name} onChange={this.onChangeName} /></div>
                        <div className="form-group"><label htmlFor="password">Password</label>
                            <input className="form-control" id="password" type="password" name="password" value={this.state.password} onChange={this.onChangePassword} /></div>
                        <div className="form-group"><label htmlFor="cf_pass">Confirm Password</label>
                            <input className="form-control" id="cf_pass" type="password" name="cf_pass" value={this.state.cf_pass} onChange={this.onChangeCfPass} /></div>
                        <button className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
                
            </div>
        );
    }
}