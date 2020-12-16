import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const Post = props => {
    return(
    <div className="row mt-3">
        <div className="col-sm-4">
            <Link to={`/users/renter/post/${props.post._id}`}>
                <img className="" src={'http://localhost:5000/' + props.post.image[0]} width="100%" alt="preview"></img>
            </Link>
            
        </div>
        <div className="col-sm-8">
            <Link to={`/users/renter/post/${props.post._id}`}><h3>{props.post.title}</h3></Link>
            <p>Address: {props.post.street}, {props.post.ward}, {props.post.district}, {props.post.city}</p>
            <p>Rented rate: {props.post.rented_rate} vnd/month</p>
            {props.post.status ? <p className="text-success">Available</p>:<p className="text-danger">Rented</p>}
        </div>
    </div>
    )
}

export default class ListPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
      }

    componentDidMount() {
        axios.get('http://localhost:5000/users/renter/explore', {withCredentials: true})
        .then(res => {
            console.log(res.data);
            console.log("success");
            this.setState({
                posts: res.data
            })

        })
        .catch(err => console.log(err))
    }

    PostList () {
        return this.state.posts.map((post,index) => {
            return <Post post={post} key={index}></Post>
        })
    }

    render() {
        return(
            <div className="container">
                {this.PostList()}
            </div>
        )
    }
}