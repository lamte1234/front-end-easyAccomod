import React, {Component} from 'react';
import axios from 'axios';

import Nav from '../common/owner_nav';

const Notification = props => (
    <tr className="bg-light">
        <td className="text-success">Your post, title: {props.notification.post_id.title} has been approved</td>
        <td>
        {
            // eslint-disable-next-line
        }<a href="#" onClick={() => props.clear(props.notification._id)}>Clear</a>
        </td>
    </tr>
)

export default class OwnerNotification extends Component {
    constructor(props) {
        super(props);

        this.clear = this.clear.bind(this);

        this.state = {
            notifications: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/owner/notifications', {withCredentials: true})
        .then(res => {
            this.setState({
                notifications: res.data
            })
        })
        .catch(err => console.log(err))
    }

    clear(id) {
        axios.patch(`http://localhost:5000/users/owner/notifications/${id}`, {}, {withCredentials: true})
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

        this.setState({
            notifications: this.state.notifications.filter(nofi => nofi._id !== id)
        })
    }

    nofiList() {
        return this.state.notifications.map((notification, index) => {
            return <Notification notification={notification} key={index} clear={this.clear}></Notification>
        })
    }

    render() {
        return(
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