import React, {Component} from 'react';
import axios from 'axios';

import Nav from '../common/owner_nav';

export default class ExtendAction extends Component {
    constructor(props) {
        super(props);

        this.onChangeTime = this.onChangeTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            time: '',
            errors: []
        }
    }

    onChangeTime(e) {
        this.setState({
            time: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        axios.patch('http://localhost:5000/users/owner/extend/'+this.props.match.params.id, {time: this.state.time}, {withCredentials: true})
        .then(res => {
            if (res.status === 200 && !res.data.errors){
                alert ("Extending request has been recorded. Please wait for approval.")
                window.location.href = ('http://localhost:3000/users/owner/all-post')
            }
            if(res.data.errors){
                this.setState({
                    errors: res.data.errors
                })
            }
            console.log(res.data);
        })
        .catch(err => console.log(err))
    }


    render() {
        return(
            <div>
                <Nav />
                <div className="container">
                    <br />
                    {
                        this.state.errors.map((err, index) =>
                            <div className='alert alert-danger' key={index}>{err}</div>)
                    }
                    <div>
                        <form method="PATCH" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="time">Time Extend</label>
                                <input className="form-control" id="time" type="number" name="time" 
                                value={this.state.time} onChange={this.onChangeTime} /></div>
                                {
                                    this.state.time === "1" ?
                                    <p>Pay Fee: 100,000 VND</p>
                                    :
                                    this.state.time === "2" ?
                                    <p>Pay Fee: 200,000 VND</p>
                                    :
                                    this.state.time === "3" ?
                                    <p>Pay Fee: 300,000 VND</p>
                                    :
                                    this.state.time === "4" ?
                                    <p>Pay Fee: 400,000 VND</p>
                                    : 
                                    <p>Please select from 1 - 4 weeks</p>
                                }
                            <button className="btn btn-primary">Extend</button>
                        </form>
                    </div>
                </div>
            </div>
        ) 
    }
}