import React, {Component} from 'react';
import axios from 'axios';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import Nav from '../common/renter_nav';
import ReviewForm from './review_form.component';
import ReportForm from './report_form.component';
import Footer from '../common/footer';


const Star = (star) => {
    let arr = [];
    for(let i = 0; i < star; i++){
        if(i < star) {
            arr[i] = true; 
        }
        else {
            arr[i] = false;
        }
    }
    return (
        arr.map((elem, index) => {
            if(elem === true) {return <span key={index} className="star-rating">X </span>} // replace with bright star image
            else {return <span key={index}>O </span>}
        })
    )
}

const Review = props => (

    <div className="review form-row">
        <div className="avatar">
            <img  className="user_avatar" src={'https://picsum.photos/seed/'+ Math.random() +'/200'} width="100%" alt="user-avatar"></img>
        </div>
        <div>
            <h6 className="renter_name">{props.review.renter_id.name}</h6>
            {Star(props.review.star)}
            <p className="renter_review">{props.review.review}</p>
        </div>
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
                localStorage.setItem('wishlist', localStorage.getItem('wishlist') + ',' + this.props.match.params.id);
            }
        })
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
                            <h2 className="text-capitalize">{this.state.title}</h2>
                            <p><span className="rented-rate">{this.state.rented_rate} VND</span>/Month</p>
                            <div className="form-row">
                                <h5>Status: </h5>
                                {this.state.status ? <h5 className="text-success">Available</h5>:<h5 className="text-danger">Rented</h5>}
                            </div>
                            {!this.state.addWishlistSuccess ? 
                            <button className="btn btn-info" onClick={this.addToWishlist}>Add to Wish-list</button> 
                            : <p className="text-success">In Wishlist</p>}
                            <br/>
                            <br/>
                            <h4>Popular!</h4>
                            <div className="form-row">
                                <i className="fas fa-eye"></i>
                                <p>This post has {this.state.views} views</p>
                            </div>
                            <div className="form-row">
                                <i className="fas fa-heart"></i>
                                <p>Have {this.state.likes} people save this post to their wishlist</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="row">
                        <div className="col-sm-6">
                            <h2>Property details</h2>
                            <br/>
                            <div className="form-row">
                                <i className="fas fa-map-marked-alt"></i>
                                <p>Address: {this.state.street}, {this.state.ward}, {this.state.district}, {this.state.city}</p>
                            </div>
                            <div className="form-row">
                                <i className="fas fa-home"></i>
                                <p>Room type: {this.state.room_type}</p>
                            </div>
                            <div className="form-row">
                                <i className="fas fa-warehouse"></i>
                                <p>Area: {this.state.area} M2</p>
                            </div>
                            <div className="form-row">
                                <i className="fas fa-couch"></i>
                                <p>Facilities: {this.state.bathroom ? <span>bathroom</span>:<span></span>} {this.state.kitchen ? <span>, kitchen</span>:<span></span>} {this.state.air_con ? <span>, air conditioner</span>:<span></span>} {this.state.water_heater ? <span>, water heater</span>:<span></span>}</p>
                            </div>
                            <div className="form-row">
                                <i className="fas fa-credit-card"></i>
                                <p>Servies: Electricity rate: {this.state.electricity}VND/KWH, water rate: {this.state.water}VND/M3</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <h2>Contact Infomation</h2>
                            <br/>
                            <div className="form-row">
                                <i className="fas fa-user-tag"></i>
                                <p>Name of owner: {this.state.owner_name}</p>
                            </div>
                            <div className="form-row">
                                <i className="fas fa-phone"></i>
                                <p>Phone number: {this.state.owner_phone}</p>
                            </div>
                        </div>
                    </div>
                    <h3>Review</h3>
                    <ReviewForm post_id={this.state.id}/>
                    <br />
                    {this.showReview()}
                    <h3>Report</h3>
                    <ReportForm post_id={this.state.id}></ReportForm>
                    <br />
                </div>
                <Footer/>
            </div>
        )
    }
}