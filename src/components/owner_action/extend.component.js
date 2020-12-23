import React, {Component} from 'react';
import axios from 'axios';

import Nav from '../common/owner_nav';

const Post = props => (
    <tr onClick={() => window.location = `/users/owner/extend/${props.post._id}`}>
        <td>{props.post.title}</td>
        <td>{props.post.city}</td>
        <td>{props.post.street}</td>
        <td>Views: {props.post.views} | Likes: {props.post.likes}</td>
        <td className="text-danger">Overtime</td>
    </tr>
)

export default class Extend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/owner/extend', {withCredentials: true})
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
        .catch(err => console.log(err));
    }

    postList() {
        return(this.state.posts.map((post, index) => {
            return <Post post={post} key={index} ></Post>
        }))
    }

    render() {
        return(
            <div>
                <Nav />
                <br/>
                <div className="container">
                    <h2>Extension List</h2>
                    <br/>
                    <table className="table table-hover">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">City</th>
                                <th scope="col">Street</th>
                                <th scope="col">Views|Likes</th>
                                <th scope="col">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.postList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}