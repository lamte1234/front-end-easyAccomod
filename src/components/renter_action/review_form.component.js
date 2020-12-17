import React, {Component} from 'react';
import axios from 'axios';

export default class ReviewForm extends Component {

    constructor(props) {
        super(props);

        this.onChangeStar = this.onChangeStar.bind(this);
        this.onChangeReview = this.onChangeReview.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            star: 0,
            review: '', 
            errors: []
        }
    }

    onChangeStar(e) {
        this.setState({
            star: e.target.value
        })
    }

    onChangeReview(e) {
        this.setState({
            review: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const data = {
            ...this.state
        }

        axios.post(`http://localhost:5000/users/renter/review/${this.props.post_id}`, data, {withCredentials: true})
        .then(res => {
            console.log(res.data);
            if(res.data.errors) {
                this.setState({
                    errors: res.data.errors
                })
            }
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
                    {/* <div className="form-group">
                        <label htmlFor="review">Rate</label>
                        <input className="form-control" id="star" type="text" 
                        value={this.state.star} name="review" onChange={this.onChangeReview} />
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="review">Review</label>
                        <input className="form-control" id="review" type="text" 
                        value={this.state.review} name="review" onChange={this.onChangeReview} />
                    </div>
                    <button className="btn btn-primary">Review</button>
                </form>
            </div>
        );
    }
}