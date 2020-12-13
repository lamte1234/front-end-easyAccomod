import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

import AdminNav from '../common/admin_nav'

const Post = props => (
        <tr>
            <td>{props.post.title}</td>
            <td>{props.post.city}</td>
            <td>{props.post.room_type}</td>
            <td>{props.post.rented_rate}đ</td>
            <td>{props.post.time} weeks</td>
            <Link to={`/users/admin/posts/${props.post._id}`}><a>Detail</a></Link>
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
        axios.get('http://localhost:5000/users/admin/posts')
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
                <div className="container">
                    <h3>List</h3>
                    <hr />
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>City</th>
                                <th>Room type</th>
                                <th>Rented rate</th>
                                <th>Time</th>
                                <th></th>
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