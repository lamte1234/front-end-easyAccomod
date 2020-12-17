import React, {Component} from 'react';
import axios from 'axios';

import Nav from '../common/renter_nav';

const Post = props => (
    <tr onClick={() => window.location = `/users/renter/post/${props.post._id}`}>
        <td>{props.post.title}</td>
        <td>{props.post.city}</td>
        <td>{props.post.district}</td>
        <td>{props.post.ward}</td>
        <td>{props.post.room_type}</td>
        <td>{props.post.rented_rate}</td>
    </tr>
)

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
            <div>
                <Nav />
                <div className="container">
                    <br />
                    <table className='table table-hover'>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">City</th>
                                <th scope="col">District</th>
                                <th scope="col">Ward</th>
                                <th scope="col">Room Type</th>
                                <th scope="col">Rented Rate</th>
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