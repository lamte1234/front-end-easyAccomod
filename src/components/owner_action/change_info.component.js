import React, {Component} from 'react';
import axios from 'axios';

import Nav from '../common/owner_nav';

export default class OwnerChangeInfo extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeIDCard = this.onChangeIDCard.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            phone: '',
            id_card_number: '',
            address: '',
            errors: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/owner/account', {withCredentials: true}) 
        .then(res => {
            this.setState({
                name: res.data.name,
                phone: res.data.phone,
                id_card_number: res.data.id_card_number,
                address: res.data.address
            })
        })
        .catch(err => console.log(err))
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    };
    onChangeIDCard(e) {
        this.setState({
            id_card_number: e.target.value
        })
    };
    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        })
    };
    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        })
    };

    validate() {
        let errors = [];
    
        const phone_re = /^[0-9]{10}$/;
        const id_num_re = /^[a-zA-Z0-9]{16}$/;
        const name_re = /^[a-zA-Z0-9\s.!#$%&'*+/=?^_`{|}~-]+$/;
        const address_re = /^[a-zA-Z0-9\s]+$/;

        if (!this.state.name) {
            errors.push('Name is required');
        }

        if(this.state.name && !this.state.name.match(name_re)){
            errors.push('Name must be non-special text.')
        }

        if (!this.state.id_card_number) {
            errors.push('Identificaton number is required');
        }

        if(this.state.id_card_number && !this.state.id_card_number.match(id_num_re)){
            errors.push('Identification number must have 16 normal characters')
        }

        if (!this.state.phone) {
            errors.push('Phone is required');
        }

        if(this.state.phone && !this.state.phone.match(phone_re)){
            errors.push('Phone must have 10 digits');
        }

        if (!this.state.address) {
            errors.push('Address is required');
        }

        if(this.state.address && !this.state.address.match(address_re)) {
            errors.push('Invalid address');
        }

        if(errors.length) {
            this.setState({
                errors: errors
            })
            return false;
        }
        else {return true};
    }

    onSubmit(e) {
        e.preventDefault();

        const dataOwner = {
            name: this.state.name,
            id_card_number: this.state.id_card_number,
            phone: this.state.phone,
            address: this.state.address
        }

        if(this.validate() === true) {
            axios.put('http://localhost:5000/users/owner/account', dataOwner, {withCredentials: true})
            .then(res => {
                if (res.data.errors) {
                    this.setState({
                        errors: res.data.errors
                    })
                };

                if (res.status === 200 && !res.data.errors) {
                    alert('Update infomation successfully');
                    window.location = '/users/owner';
                }

            })
            .catch(err => {
                if(err.response.status === 401) {
                    console.log(err.response.data);
                    alert('You do not have permission to do this request');
                }
                else {console.log(err)}
            });
        }
    }

    render() {
        return(
            <div>
                <Nav />
                <br />
                <br/>
                <div className="form-container col-md-6 col-lg-5 col-sm-7 col-xl-4">
                    <br/>
                    <div className="form-block col-sm-11">
                        {
                            this.state.errors.map((err,index) => 
                            <div className='alert alert-danger' key={index}>{err}</div>)
                        }
                        <h2 className="text-center">Change Account Infomation</h2>
                        <br/>
                        <form method="PUT" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input className="form-control" id="name" type="text" name="name"
                            value={this.state.name} onChange={this.onChangeName} placeholder="Name" /></div>
                        <div className="form-group">
                        <label htmlFor="name">Identification Number</label>
                            <input className="form-control" id="id_card_number" type="text" name="id_card_number"
                            value={this.state.id_card_number} onChange={this.onChangeIDCard} placeholder="Identification Number" /></div>
                        <div className="form-group">
                        <label htmlFor="name">Phone</label>
                            <input className="form-control" id="phone" type="number" name="phone" 
                            value={this.state.phone} onChange={this.onChangePhone} placeholder="Phone Number" /></div>
                        <div className="form-group">
                        <label htmlFor="name">Address</label>
                            <input className="form-control" id="address" type="text" name="address" 
                            value={this.state.address} onChange={this.onChangeAddress} placeholder="Address" /></div>
                        <div className="text-center"><button className="btn btn-info">Update</button></div>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}