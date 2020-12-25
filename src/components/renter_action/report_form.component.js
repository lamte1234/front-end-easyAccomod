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

    validate() {
        const comment_re = /^[a-zA-Z0-9.\s!#$%&'*+/=?^_`{|}~-]+$/;

        let errors = [];

        if(!this.state.comment) {errors.push('You must add report details')}

        if(this.state.comment && !this.state.comment.match(comment_re)) {
            errors.push('Invalid comment');
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

        if (this.validate() === true) {
            const data = {comment: this.state.comment};

            axios.post(`http://localhost:5000/users/renter/report/${this.props.post_id}`, data, {withCredentials: true})
            .then(res => {
                if (res.status === 201){
                    alert ("Your report has been recorded. Thanks for helping us!")
                }
                if(res.data.errors) {
                    this.setState({
                        errors: res.data.errors
                    })
                }
                console.log(res.data);
            })
            .catch(err => console.log(err));
        }
    }

    render() {
        return(
            <div>
                {
                    this.state.errors.map((err, index) =>
                        <div className='alert alert-danger' key={index}>{err}</div>)
                }
                <form method="POST" onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-sm-10">
                            <input type="text" className="form-control" id="comment" 
                            name="comment" value={this.state.comment} onChange={this.onChangeComment} placeholder="What's wrong in this post" ></input>
                        </div>
                        <button className="btn btn-danger">Report</button>
                    </div>
                </form>
            </div>
        );
    }
}