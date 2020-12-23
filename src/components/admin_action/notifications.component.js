import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'; 

import Nav from '../common/admin_nav';

const Notification = props => (
    <tr className="bg-light">
        <td className="text-warning">Owner, name: {props.notification.owner_id.name} has changed post status, title:
        <Link to={"/users/admin/posts/" + props.notification.post_id._id}> {props.notification.post_id.title}</Link></td>
        <td>
        {
            // eslint-disable-next-line
        }<a href="#" onClick={() => props.clear(props.notification._id)}>Clear</a>
        </td>
    </tr>
)

export default class AdminNotifications extends Component {
    constructor(props) {
        super(props)

        this.clear = this.clear.bind(this);

        this.state = {
            notifications: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/admin/notifications', {withCredentials: true})
        .then(res => {
            this.setState({
                notifications: res.data
            })
        })
        .catch(err => console.log(err))
    }

    clear(id) {
        axios.patch(`http://localhost:5000/users/admin/notifications/${id}`, {}, {withCredentials: true})
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        this.setState({
            notifications: this.state.notifications.filter(notification => notification._id !== id)
        })
    }

    nofiList () {
        return this.state.notifications.map((notification, index) => {
            return <Notification notification={notification} key={index} clear={this.clear}></Notification>
        })
    }

    render() {
        return (
            <div>
                <Nav />
                <br />
                <div className="container">
                    <table className="table table-hover">
                        <tbody>
                            {this.nofiList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}