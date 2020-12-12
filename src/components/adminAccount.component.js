import axios from 'axios';
import React, {Component} from 'react';

const Account = props => (
    <tr>
        <td>{props.account.email}</td>
        <td>{props.account.name}</td>
        <td>{props.account.id_card_number}</td>
        <td>{props.account.phone}</td>
        <td>{props.account.address}</td>
        <td><a href="#">Approved</a></td>
    </tr>
)

export default class AdminAcc extends Component {
    constructor(props){
        super(props);

        this.state = {
            accounts: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/admin/accounts')
        .then(res => {
            this.setState({
                accounts: res.data
            })
        })
        .catch(err => console.log(err))
    }

    accountList () {
        return this.state.accounts.map((account,index) => {
            return <Account account={account} key={index}></Account>
        })
    }

    render() {
        return(
            <div>
                <table className='table'>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Email</th>
                            <th scope="col">Name</th>
                            <th scope="col">ID Number</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.accountList()}
                    </tbody>
                </table>
            </div>
        );
    }
}