import React, {Component} from 'react';
import axios from 'axios';

import Nav from '../common/admin_nav';

const Report = props => (
    <tr onClick={() => window.location = `/users/admin/posts/${props.report.post_id._id}`}>
        <td>{props.report.renter_id.name}</td>
        <td>{props.report.post_id.title}</td>
        <td>{props.report.comment}</td>
    </tr>
)


export default class AdminReport extends Component {
    constructor(props){
        super(props);

        this.state = {
            reports: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/admin/report',{withCredentials: true})
        .then(res => {
            this.setState({
                reports: res.data
            })
        })
        .catch(err => console.log(err))
    }

    reportList() {
        return this.state.reports.map((report, index) => {
            return <Report report={report} key={index}></Report>
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
                                <th scope="col">Renter-name</th>
                                <th scope="col">Title</th>
                                <th scope="col">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.reportList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}