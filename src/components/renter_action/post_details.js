import React, {Component} from 'react';
import axios from 'axios';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import Nav from '../common/renter_nav';
import ReviewForm from './review_form.component';
import ReportForm from './report_form.component';


const Star = (star) => {
    let arr = [];
    for(let i = 0; i < 5; i++){
        if(i < star) {
            arr[i] = true; 
        }
        else {
            arr[i] = false;
        }
    }
    return (
        arr.map((elem, index) => {
            if(elem === true) {return <span key={index}>X </span>} // replace with bright star image
            else {return <span key={index}>O </span>}
        })
    )
}

const Review = props => (

    <div>
        <h5 className="renter_name">{props.review.renter_id.name}</h5>
        <div className="star">
            {Star(props.review.star)}
        </div>
        <p className="renter_review">{props.review.review}</p>
    </div>
);

export default class PostDetail extends Component {

    constructor(props) {
        super(props);

        this.addToWishlist = this.addToWishlist.bind(this);

        this.state = {
            id: '',
            title: '',
            city: '',
            district: '',
            ward: '',
            street: '',
            room_type: '',
            rented_rate: '',
            area: '',
            bathroom: false,
            kitchen: false,
            air_con: false,
            water_heater: false,
            electricity: '', //vnd per kwh
            water: '', //vnd per m3
            image: [],
            status: '',
            views: '',
            likes: '',
            owner_name: '',
            owner_phone: '',
            addWishlistSuccess: false,
            reviews: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/renter/post/'+this.props.match.params.id,{withCredentials: true})
        .then(res => {
            this.setState({
                id: res.data._id,
                title: res.data.title,
                city: res.data.city,
                district: res.data.district,
                ward: res.data.ward,
                street: res.data.street,
                room_type: res.data.room_type,
                rented_rate: res.data.rented_rate,
                area: res.data.area,
                bathroom: res.data.bathroom,
                kitchen: res.data.kitchen,
                air_con: res.data.air_con,
                water_heater: res.data.water_heater,
                electricity: res.data.electricity, //vnd per kwh
                water: res.data.water, //vnd per m3
                image: res.data.image,
                status: res.data.status,
                views: res.data.views,
                likes: res.data.likes,
                owner_name: res.data.owner_id.name,
                owner_phone: res.data.owner_id.phone
            });
            const wishlist = localStorage.getItem('wishlist').split(',');
            wishlist.forEach(post_id => {
                if(post_id === res.data._id) {
                    this.setState({
                        addWishlistSuccess: true
                    });
                }
            }) 
        })
        .catch(err => console.log(err));

        axios.get('http://localhost:5000/users/renter/review/'+this.props.match.params.id,{withCredentials: true})
        .then(res => this.setState({
            reviews: res.data
        }))
        .catch(err => console.log(err));
    }


    addToWishlist() {
        axios.patch('http://localhost:5000/users/renter/wishlist/'+this.props.match.params.id,{},{withCredentials: true})
        .then(res => {
            if(res.status === 200){
                this.setState({
                    addWishlistSuccess: true
                })
            }
            console.log(this.state.addWishlistSuccess);
        }) //handle notification
        .catch(err => console.log(err));
    }

    showReview() {
        return this.state.reviews.map((review, index) => {
            return <Review review={review} key={index}></Review>
        })
    }

    render() {
        return(
            <div>
                <Nav />
                <div className='container'>
                    <br/>
                    <div className="row">
                        <div className="col-sm-8 image">
                            <AwesomeSlider>
                            {this.state.image.map((img, index) => 
                                <div key={index} className="yours-custom-class">
                                    <img src={'http://localhost:5000/'+img} width="100%" alt="room_image"></img>
                                </div>
                            )}
                            </AwesomeSlider>
                        </div>
                        <div className="col-sm-4">
                            <h2>{this.state.title}</h2>
                            <p><span className="rented-rate">{this.state.rented_rate} vnd</span>/month</p>
                            {this.state.status ? <p className="text-success">Available</p>:<p className="text-danger">Rented</p>}
                            {!this.state.addWishlistSuccess ? <button className="btn btn-info" onClick={this.addToWishlist}>Add to Wish-list</button> : <p className="text-success">In Wishlist</p>}
                            <br/>
                            <h4>Popular!</h4>
                            <p>This post have {this.state.views} views</p>
                            <p>Have {this.state.likes} people save this property to their wishlist</p>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="row">
                        <div className="col-sm-6">
                            <h2>Property details</h2>
                            <p>Address: {this.state.street}, {this.state.ward}, {this.state.district}, {this.state.city}</p>
                            <p>Room type: {this.state.room_type}</p>
                            <p>Area: {this.state.area} M2</p>
                            <p>Facilities: {this.state.bathroom ? <a>bathroom</a>:<a></a>}, {this.state.kitchen ? <a>kitchen</a>:<a></a>}, {this.state.air_con ? <a>air conditioner</a>:<a></a>}, {this.state.water_heater ? <a>water heater</a>:<a></a>}</p>
                            <p>Servies: electricity rate {this.state.electricity} per KWH, water rate {this.state.water} per M3</p>
                        </div>
                        <div className="col-sm-6">
                            <h2>Contact Infomation</h2>
                            <p>Name of owner: {this.state.owner_name}</p>
                            <p>Phone number: {this.state.owner_phone}</p>
                        </div>
                    </div>
                    <h2>Review</h2>
                    <ReviewForm post_id={this.state.id}/>
                    <br />
                    <h2>Report</h2>
                    <ReportForm post_id={this.state.id}></ReportForm>
                    <br />
                    {this.showReview()}
                </div>
            </div>
        )
    }
}