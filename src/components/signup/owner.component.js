import React, { Component } from 'react';
import axios from 'axios';

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
                window.location = '/';  //handle user page have every thing of user in res.data
            };
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.errors.map((err, index) =>
                        <div className='alert alert-danger' key={index}>{err}</div>)
                }
                <form action="/signup/owner" method="POST" onSubmit={this.onSubmit}>
                    <div className="form-group"><label htmlFor="email">Email</label>
                        <input className="form-control" id="email" type="email" name="email" 
                        value={this.state.email} onChange={this.onChangeEmail} /></div>
                    <div className="form-group"><label htmlFor="name">Name</label>
                        <input className="form-control" id="name" type="text" name="name"
                        value={this.state.name} onChange={this.onChangeName} /></div>
                    <div className="form-group"><label htmlFor="id_card_number">Identification Number</label>
                        <input className="form-control" id="id_card_number" type="text" name="id_card_number"
                        value={this.state.id_card_number} onChange={this.onChangeIDCard} /></div>
                    <div className="form-group"><label htmlFor="phone">Phone</label>
                        <input className="form-control" id="phone" type="number" name="phone" 
                        value={this.state.phone} onChange={this.onChangePhone} /></div>
                    <div className="form-group"><label htmlFor="address">Address</label>
                        <input className="form-control" id="address" type="text" name="address" 
                        value={this.state.address} onChange={this.onChangeAddress} /></div>
                    <div className="form-group"><label htmlFor="password">Password</label>
                        <input className="form-control" id="password" type="password" name="password" 
                        value={this.state.password} onChange={this.onChangePassword} /></div>
                    <div className="form-group"><label htmlFor="cf_pass">Confirm Password</label>
                        <input className="form-control" id="cf_pass" type="password" name="cf_pass" 
                        value={this.state.cf_pass} onChange={this.onChangeCfPass} /></div>
                    <button className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        );
    }
}