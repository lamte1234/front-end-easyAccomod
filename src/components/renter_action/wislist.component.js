import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../../css/renter.css';

import Nav from '../common/renter_nav';
import Footer from '../common/footer';

const Post = props => {
    return(
    <div className="row mt-3 post">
        <div className="col-sm-5 col-lg-4 img-demo">
            <Link to={`/users/renter/post/${props.post._id}`}>
                <img className="img-demo" src={'http://localhost:5000/' + props.post.image[0]} width="100%" alt="preview"></img>
            </Link>
            
        </div>
        <div className="col-sm-4 col-lg-5 info">
            <Link to={`/users/renter/post/${props.post._id}`}><h3  className="text-capitalize">{props.post.title}</h3></Link>
            <p>Address: {props.post.street}, {props.post.ward}, {props.post.district}, {props.post.city}</p>
            {props.post.status ? <p className="text-success">Available</p>:<p className="text-danger">Rented</p>}
        </div>
        <div className="col-sm-3 col-lg-3 rate">
            <p><span className="rented-rate">{props.post.rented_rate} vnd</span>/month</p>
            <Link to={`/users/renter/post/${props.post._id}`}>
                <button className="btn btn-info">View room</button>
            </Link>
        </div>
    </div>
    )
}

export default class Wishlist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/renter/wishlist', {withCredentials: true})
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
    }

    postList() {
        return this.state.posts.map((post, index) => {
            return <Post post={post} key={index} ></Post>
        })
    }

    render() {
        return(
            <div className="">
                <Nav />
                <div className="container">
                    <br/>
                    <h3>Wish List</h3>
                    {this.postList()}
                </div>
                <Footer/>
            </div>
        );
    }
}