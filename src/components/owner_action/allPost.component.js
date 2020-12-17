import React, {Component} from 'react';
import axios from 'axios';

import Nav from '../common/owner_nav';

const Post = props => (
    <tr>
        <td>{props.post.title}</td>
        <td>{props.post.city}</td>
        <td>{props.post.street}</td>
        <td>{props.post.time} Weeks</td>
        <td>Views: {props.post.views} | Likes: {props.post.likes}</td>
        <td>{props.post.is_approved ? <p className="text-success">Approved</p>:<p className="text-danger">Unapproved</p>}</td>
        <td>{props.post.status ? <p className="text-success">Available</p>:<p className="text-danger">Rented</p>}</td>
        <td>
        {
            // eslint-disable-next-line
        }<a href="#" onClick={() => {
            props.changeStatus(props.post._id);
            props.post.status = !props.post.status;
        }}>Change Status</a>
        </td>
    </tr>
)

export default class AllPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }

        // this.changeStatus = this.changeStatus.bind(this);
    }


    componentDidMount() {
        axios.get('http://localhost:5000/users/owner/all-post', {withCredentials: true})
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
        .catch(err => console.log(err));
    }

    changeStatus(id) {
        axios.patch(`http://localhost:5000/users/owner/change-status/${id}`,{},{withCredentials: true})
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

    }

    postList() {
        return(this.state.posts.map((post, index) => {
            return <Post post={post} key={index} changeStatus={this.changeStatus}></Post>
        }))
    }

    render() {
        return(
            <div>
                <Nav />
                <div classname="container">
                    <br />
                    <table className="table table-hover">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">City</th>
                                <th scope="col">Street</th>
                                <th scope="col">Time</th>
                                <th scope="col">Views|Likes</th>
                                <th scope="col">Approvement</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.postList()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}