import axios from 'axios';
import React, {Component} from 'react';

import Nav from '../common/admin_nav';

const Account = props => (
    <tr>
        <td>{props.account.name}</td>
        <td>{props.account.id_card_number}</td>
        <td>{props.account.phone}</td>
        <td>{props.account.address}</td>
        <td>
        {
            // eslint-disable-next-line
        }<a href="" onClick={() => props.approve(props.account._id)}>Approved</a>
        </td>
    </tr>
)

export default class EditAcc extends Component {

    constructor(props){
        super(props);

        this.approveEditAccount = this.approveEditAccount.bind(this);

        this.state = {
            accounts: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/admin/edit-auth',{withCredentials: true})
        .then(res => {
            this.setState({
                accounts: res.data
            })
        })
        .catch(err => console.log(err))
    }

    accountList () {
        return this.state.accounts.map((account,index) => {
            return <Account account={account} key={index} approve={this.approveEditAccount}></Account>
        })
    }

    approveEditAccount (id) {
        axios.patch(`http://localhost:5000/users/admin/edit-auth/${id}`,{}, {withCredentials: true})
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        this.setState({
            accounts: this.state.accounts.filter(account => account._id !== id)
        })
    }

    render() {
        return(
            <div>
                <Nav />
                <br />
                <div className='container'>
                <h3>List of Accounts</h3>
                <br/>
                <table className='table'>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">ID Number</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.accountList()}
                    </tbody>
                </table>
                </div>
            </div>
        );
    }

}


