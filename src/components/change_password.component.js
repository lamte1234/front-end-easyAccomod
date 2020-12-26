import React, {Component} from 'react';
import axios from 'axios';
import '../css/change_password.css'

import Nav from './common/user_nav';

export default class ChangePass extends Component {

    constructor(props) {
        super(props);

        this.state = {
            current_password: '',
            new_password: '',
            cf_pass: '',
            errors: []
        }


        this.onChangeCurrentPass = this.onChangeCurrentPass.bind(this);
        this.onChangeNewPass = this.onChangeNewPass.bind(this);
        this.onChangeConfirmPass =this.onChangeConfirmPass.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }


    onChangeCurrentPass(e) {
        this.setState({
            current_password: e.target.value
        });
    }
    onChangeNewPass(e) {
        this.setState({
            new_password: e.target.value
        });
    }
    onChangeConfirmPass(e) {
        this.setState({
            cf_pass: e.target.value
        });
    }

    validate() {
        let errors = [];
        const password_re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{6,13}$/;

        if(!this.state.current_password || !this.state.new_password || !this.state.cf_pass) {
            errors.push('Password is required')
        }

        if((this.state.current_password && !this.state.current_password.match(password_re)) ||
            (this.state.new_password && !this.state.new_password.match(password_re)) ||
            (this.state.cf_pass && !this.state.cf_pass.match(password_re))){
        errors.push('Password must have 6-13 non-special characters')
        }

        if (this.state.new_password !== this.state.cf_pass) {
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

        if(this.validate() === true) {
            axios.patch(`http://localhost:5000/users/${localStorage.getItem('user_type')}/change-password`,{
                current_password: this.state.current_password,
                new_password: this.state.new_password,
                cf_pass: this.state.cf_pass
            }, {withCredentials: true})
            .then(res => {
                if(res.data.errors) {
                    this.setState({
                        errors: res.data.errors
                    })
                };
                if(res.status === 200) {
                    window.location = `/users/${localStorage.getItem('user_type')}`;
                }
            })
            .catch(err => console.log(err));
        }

    }


    render() {
        return(
            <div>
                <Nav />
                <br />
                <br/>
                <div className="form-container col-lg-6 col-sm-8 col-xl-4">
                    <div className="form-block col-sm-11">
                        {
                            this.state.errors.map((err,index) => 
                            <div className='alert alert-danger' key={index}>{err}</div>)
                        }
                        <h2 className="header">Change Password</h2>
                        <br/>
                        <form method="PATCH" onSubmit={this.onSubmit}>
                            <div className="form-group"><label htmlFor="current_password">Current Password</label>
                                <input className="form-control" id="current_password" type="password"
                                name="current_password" value={this.state.current_password} onChange={this.onChangeCurrentPass} />
                            </div>
                            <div className="form-group"><label htmlFor="new_password">New Password</label>
                                <input className="form-control" id="new_password" type="password"
                                name="new_password" value={this.state.new_password} onChange={this.onChangeNewPass} />
                            </div>
                            <div className="form-group"><label htmlFor="cf_pass">Confirm Password</label>
                                <input className="form-control" id="cf_pass" type="password"
                                name="cf_pass" value={this.state.cf_pass} onChange={this.onChangeConfirmPass} />
                            </div>
                            <div className="text-center"><button className="btn btn-info">Commit</button></div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    
}