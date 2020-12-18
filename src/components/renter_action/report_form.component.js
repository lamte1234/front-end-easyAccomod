import React, {Component} from 'react';
import axios from 'axios';

export default class ReportForm extends Component {
    constructor(props) {
        super(props);

        this.onChangeComment = this.onChangeComment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            comment: '',
            errors: []
        }
    }

    onChangeComment(e) {
        this.setState({
            comment: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const data = {comment: this.state.comment};

        axios.post(`http://localhost:5000/users/renter/report/${this.props.post_id}`, data, {withCredentials: true})
        .then(res => {
            if(res.data.errors) {
                this.setState({
                    errors: res.data.errors
                })
            }
            console.log(res.data);
        })
        .catch(err => console.log(err));
    }

    render() {
        return(
            <div>
                <br />
                {
                    this.state.errors.map((err, index) =>
                        <div className='alert alert-danger' key={index}>{err}</div>)
                }
                <form method="POST" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="comment">Report</label>
                        <input type="text" className="form-control" id="comment" 
                        name="comment" value={this.state.comment} onChange={this.onChangeComment}></input>
                    </div>
                    <button className="btn btn-danger">Report</button>
                </form>
            </div>
        );
    }
}