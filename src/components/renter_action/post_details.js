import React, {Component} from 'react';
import axios from 'axios';

import Nav from '../common/renter_nav';
import ReviewForm from './review_form.component';

const Review = props => (
    <div>
        <h5 className="renter_name">{props.review.renter_id.name}</h5>
        <p className="star">{props.review.star}</p>
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
                    <br />
                    <h2>{this.state.title}</h2>
                    <br />
                    <h4>Address</h4>
                    <p>{this.state.street}, {this.state.ward}, {this.state.district}, {this.state.city}</p>
                    <br />
                    <h4>Description</h4>
                    <ul>
                        <li>Room Type: {this.state.room_type}</li>
                        <li>Area: {this.state.area} M2</li>
                        <li>Bathroom: {this.state.bathroom ? <p className="text-success">YES</p>:<p className="text-danger">NO</p>}</li>
                        <li>Kitchen: {this.state.kitchen ? <p className="text-success">YES</p>:<p className="text-danger">NO</p>}</li>
                        <li>Air Conditioner: {this.state.air_con ? <p className="text-success">YES</p>:<p className="text-danger">NO</p>}</li>
                        <li>Water Heater: {this.state.water_heater ? <p className="text-success">YES</p>:<p className="text-danger">NO</p>}</li>
                        <li>Electricity rate: {this.state.electricity} per KWH</li>
                        <li>Water rate: {this.state.water} per M3</li>
                        <li>Rented Rate: {this.state.rented_rate} per Month</li>
                    </ul>
                    {this.state.image.map((img, index) => 
                        <img className="img-fluid m-2" src={'http://localhost:5000/'+img} key={index} width="200" alt="room_image"></img>
                    )}
                    <div>Status: {this.state.status ? <p className="text-success">Available</p>:<p className="text-danger">Rented</p>}</div>
                    <p className="small">Views: {this.state.views}</p>
                    <p className="small">Likes: {this.state.likes}</p>
                    {!this.state.addWishlistSuccess ? <button className="btn btn-danger" onClick={this.addToWishlist}>Add to Wish-list</button> : <p className="text-success">In Wishlist</p>}
                    <h4>Contact Infomation</h4>
                    <p>Name of owner: {this.state.owner_name}</p>
                    <p>Phone number: {this.state.owner_phone}</p>
                    <br />
                    <h4>Review</h4>
                    <ReviewForm post_id={this.state.id}/>
                    <br />
                    {this.showReview()}
                </div>
            </div>
        )
    }
}