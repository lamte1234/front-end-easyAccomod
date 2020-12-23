import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";


import AdminNav from '../common/admin_nav'

const Post = props => (
        <tr>
            <td>{props.post.title}</td>
            <td>{props.post.city}</td>
            <td>{props.post.room_type}</td>
            <td>{props.post.rented_rate} VND</td>
            <td>{props.post.time} weeks</td>
            <td><Link to={`/users/admin/posts/${props.post._id}`}>Detail</Link></td>
        </tr>

        
)

export default class ApprovePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
      }

    componentDidMount() {
        axios.get('http://localhost:5000/users/admin/posts', {withCredentials: true})
        .then(res => {
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
        return (
            <div>
                <AdminNav />
                <br/>
                <div className="container">
                    <h3>List of Posts</h3>
                    <hr />
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>City</th>
                                <th>Room type</th>
                                <th>Rented rate</th>
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