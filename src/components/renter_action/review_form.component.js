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
            star_checked: [false, false, false, false, false],
            errors: []
        }
    }

    onChangeStar(e) {
        this.setState(state => {
            const star = parseInt(e.target.value);
            const star_checked = state.star_checked.map((elem, index) => {
                if(index <= (star - 1)) {
                    elem = true;
                }
                else {
                    elem = false;
                }
                return elem;
            });
            return {
                star: star,
                star_checked: star_checked
            }  
        });
    }

    onChangeReview(e) {
        this.setState({
            review: e.target.value
        });
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
                {
                    this.state.errors.map((err, index) =>
                        <div className='alert alert-danger' key={index}>{err}</div>)
                }
                <form method="POST" onSubmit={this.onSubmit}>
                    <div className="form-group rating">
                            <span><input type="checkbox" className="star" name="star1" id="star1" value="1" checked={this.state.star_checked[0]} onChange={this.onChangeStar}></input></span>
                            <span><input type="checkbox" className="star"  name="star2" id="star2" value="2" checked={this.state.star_checked[1]} onChange={this.onChangeStar}></input></span>
                            <span><input type="checkbox" className="star"  name="star3" id="star3" value="3" checked={this.state.star_checked[2]} onChange={this.onChangeStar}></input></span>
                            <span><input type="checkbox" className="star"  name="star4" id="star4" value="4" checked={this.state.star_checked[3]} onChange={this.onChangeStar}></input></span>
                            <span><input type="checkbox" className="star"  name="star5" id="star5" value="5" checked={this.state.star_checked[4]} onChange={this.onChangeStar}></input></span>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-sm-10">
                            <input className="form-control mr-auto" id="review" type="text" 
                            value={this.state.review} name="review" onChange={this.onChangeReview} placeholder="Share your thoughts" />
                        </div>
                        <button className="btn btn-info">Review</button>
                    </div>
                </form>
            </div>
        );
    }
}