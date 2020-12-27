import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Nav from '../common/owner_nav';

const Post = props => (
    <tr>
        <td>{props.post.title}</td>
        <td>{props.post.city}</td>
        <td>{props.post.street}</td>
        <td>{props.post.rented_rate} vnd</td>
        <td>{props.post.time} weeks</td>
        <td><Link to={`/users/owner/edit/${props.post._id}`}>Edit</Link></td>
    </tr>
)

export default class OwnerPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/owner/edit', {withCredentials: true})
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
        .catch(err => {
            if(err.response.status === 401) {
                console.log(err.response.data);
                alert('You do not have permission to do this request');
            }
            else {console.log(err)}
        })
    }

    PostList () {
        return this.state.posts.map((post,index) => {
            return <Post post={post} key={index}></Post>
        })
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="container">
                    <h3>Posts List</h3>
                    <hr />
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>City</th>
                                <th>Street</th>
                                <th>Rented_rate</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.PostList()}
                        </tbody>
                    </table>
                </div>
            </div>
            
        );
    }
}
