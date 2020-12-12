import React, { Component } from 'react';
import Navbar from './navbar.component';
import axios from 'axios';

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
            account_type: '',
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
        })
    }
    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
            account_type: this.state.account_type
        };

        axios.post('http://localhost:5000/login', user).then(res => {
            console.log(res.data);
            if(res.data.errors) {
                this.setState({
                    errors: res.data.errors 
                })
            };

            if(res.data.email){
                window.location = `/users/${res.data.user_type}/${res.data._id}`;  //handle user page have every thing of user in res.data
            };
        });
    }


    render() {
        return (
            <div>
                <div className="container">
                    <br />
                    {
                        this.state.errors.map((err,index) => 
                        <div className='alert alert-danger' key={index}>{err}</div>)
                    }
                    <form action="/login" method="POST" onSubmit={this.onSubmit}>
                        <div className="form-group"><label htmlFor="email">Email</label>
                            <input className="form-control" id="email" type="email"
                            name="email" value={this.state.email} onChange={this.onChangeEmail} />
                        </div>
                        <div className="form-group"><label htmlFor="password">Password</label>
                            <input className="form-control" id="password" type="password"
                            name="password" value={this.state.password} onChange={this.onChangePassword} />
                        </div>
                        <div className="form-group"> <label htmlFor="account_type">Account Type</label>
                            <select className="form-control" id="account-type" name="account_type"
                            value={this.state.account_type} onChange={this.onChangeAccountType}>
                                <option value="owner_account" defaultValue>Owner</option>
                                <option value="renter_account">Renter</option>
                                <option value="admin_account">Admin</option></select></div>
                        <button className="btn btn-primary">Login</button>
                    </form>
                </div>
                
            </div>
        );
    }
}