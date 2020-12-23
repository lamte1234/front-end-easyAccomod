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
    onSubmit(e) {
        e.preventDefault();

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


    render() {
        return(
            <div>
                <Nav />
                <br />
                <br/>
                <div className="form-container col-sm-4">
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