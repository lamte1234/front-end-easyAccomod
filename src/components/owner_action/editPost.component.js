import React, { Component } from 'react';
import axios from 'axios';

import Nav from '../common/owner_nav';

export default class Post extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeDistrict = this.onChangeDistrict.bind(this);
        this.onChangeWard = this.onChangeWard.bind(this);
        this.onChangeStreet = this.onChangeStreet.bind(this);
        this.onChangeRoomType = this.onChangeRoomType.bind(this);
        this.onChangeRentedRate = this.onChangeRentedRate.bind(this);
        this.onChangeArea = this.onChangeArea.bind(this);
        this.onChangeBathroom = this.onChangeBathroom.bind(this);
        this.onChangeKitchen = this.onChangeKitchen.bind(this);
        this.onChangeAirCon = this.onChangeAirCon.bind(this);
        this.onChangeWaterHeater = this.onChangeWaterHeater.bind(this);
        this.onChangeElectricity = this.onChangeElectricity.bind(this);
        this.onChangeWater = this.onChangeWater.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
            title: '',
            city: '',
            district: '',
            ward: '',
            street: '',
            room_type: '',
            rented_rate: '', //vnd per month
            area: '',
            bathroom: '',
            kitchen: '',
            air_con: '',
            water_heater: '',
            electricity: '', //vnd per kwh
            water: '',
            status: '', //vnd per m3
            errors: []
        }

    };

    componentDidMount() {
        axios.get('http://localhost:5000/users/owner/edit/'+this.props.match.params.id, {withCredentials: true})
        .then(res => this.setState({
            id: res.data._id,
            title: res.data.title,
            city: res.data.city,
            district: res.data.district,
            ward: res.data.ward,
            street: res.data.street,
            room_type: res.data.room_type,
            rented_rate: res.data.rented_rate,
            area: res.data.area,
            bathroom: res.data.bathroom,
            kitchen: res.data.kitchen,
            air_con: res.data.air_con,
            water_heater: res.data.water_heater,
            electricity: res.data.electricity, 
            water: res.data.water,
            status: res.data.status
        }))
        .catch(err => console.log(err));
        
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    };

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        })
    };

    onChangeDistrict(e) {
        this.setState({
            district: e.target.value
        })
    };

    onChangeWard(e) {
        this.setState({
            ward: e.target.value
        })
    };

    onChangeStreet(e) {
        this.setState({
            street: e.target.value
        })
    };

    onChangeRoomType(e) {
        this.setState({
            room_type: e.target.value
        })
    };

    onChangeRentedRate(e) {
        this.setState({
            rented_rate: e.target.value
        })
    };

    onChangeArea(e) {
        this.setState({
            area: e.target.value
        })
    };

    onChangeBathroom(e) {
        this.setState({
            bathroom: !this.state.bathroom
        })
    };

    onChangeKitchen(e) {
        this.setState({
            kitchen: !this.state.kitchen
        })
    };

    onChangeAirCon(e) {
        this.setState({
            air_con: !this.state.air_con
        })
    };

    onChangeWaterHeater(e) {
        this.setState({
            water_heater: !this.state.water_heater
        })
    };

    onChangeElectricity(e) {
        this.setState({
            electricity: e.target.value
        })
    };

    onChangeWater(e) {
        this.setState({
            water: e.target.value
        })
    };

    onChangeStatus(e) {
        this.setState({
            status : !this.state.status
        })
    };

    onSubmit(e) {
        e.preventDefault();
        const data = {
            ...this.state
        }
        delete data.errors;

        axios.put(`http://localhost:5000/users/owner/edit/${this.state.id}`, data, {withCredentials: true})
        .then(res =>{
            if (res.data.errors) {
                this.setState({
                    errors: res.data.errors
                })
            }
            if (res.status === 200 && !res.data.errors){
                alert ("Post has been updated. Please wait for approval.")
                window.location.href = ('http://localhost:3000/users/owner/all-post')
            }
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="container">
                    <br />
                    {
                        this.state.errors.map((err, index) =>
                            <div className='alert alert-danger' key={index}>{err}</div>)
                    }
                    <form action="" method="PUT" encType="multipart/form-data" onSubmit={this.onSubmit}>
                    <h3>Title</h3>
                        <div className="form-group">
                            <input className="form-control" id="title" type="text" name="title" 
                            value={this.state.title} onChange={this.onChangeTitle} placeholder="Title of post" /></div>
                        <br/>
                        <div className="row">
                            <div className="col-sm-6">
                                <h3>Address Infomation</h3>
                                <div className="form-group">
                                    <input className="form-control" id="city" type="text" name="city"
                                    value={this.state.city} onChange={this.onChangeCity} placeholder="City" /></div>
                                <div className="form-group">
                                    <input className="form-control" id="district" type="text" name="district"
                                    value={this.state.district} onChange={this.onChangeDistrict} placeholder="District" /></div>
                                <div className="form-group">
                                    <input className="form-control" id="ward" type="text" name="ward" 
                                    value={this.state.ward} onChange={this.onChangeWard} placeholder="Ward" /></div>
                                <div className="form-group">
                                    <input className="form-control" id="street" type="text" name="street" 
                                    value={this.state.street} onChange={this.onChangeStreet} placeholder="Street" /></div>
                                <br/>
                            </div>
                            <div className="col-sm-6">
                                <h3>Description</h3>
                                <div className="form-group">
                                    <select className="form-control" id="room_type" type="text" name="room_type" 
                                    value={this.state.room_type} onChange={this.onChangeRoomType}>
                                        <option>Apartment</option>
                                        <option>Guest House</option>
                                        <option>Shared Room</option>
                                        <option>Premium Apartment</option>
                                        <option>House</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" id="rented_rate" type="number" name="rented_rate" 
                                    value={this.state.rented_rate} onChange={this.onChangeRentedRate} placeholder="Rented Rate (VND/month)" /></div>
                                <div className="form-group">
                                    <input className="form-control" id="area" type="number" name="area" 
                                    value={this.state.area} onChange={this.onChangeArea} placeholder="Area (M2)" /></div>
                                <br/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <h3>Property Infomation</h3>
                                {this.state.bathroom === true ?
                                <div className="form-group"><label htmlFor="bathroom">Bathroom</label>
                                    <input className="pro-checkbox" id="bathroom" type="checkbox" name="bathroom"
                                    value={this.state.bathroom} onChange={this.onChangeBathroom} defaultChecked /></div>
                                    :
                                <div className="form-group"><label htmlFor="bathroom">Bathroom</label>
                                    <input className="pro-checkbox" id="bathroom" type="checkbox" name="bathroom"
                                    value={this.state.bathroom} onChange={this.onChangeBathroom} /></div>
                                }
                                {this.state.kitchen === true ?
                                <div className="form-group"><label htmlFor="kitchen">Kitchen</label>
                                    <input className="pro-checkbox" id="kitchen" type="checkbox" name="kitchen" 
                                    value={this.state.kitchen} onChange={this.onChangeKitchen} defaultChecked /></div>
                                    :
                                <div className="form-group"><label htmlFor="kitchen">Kitchen</label>
                                    <input className="pro-checkbox" id="kitchen" type="checkbox" name="kitchen" 
                                    value={this.state.kitchen} onChange={this.onChangeKitchen} /></div>
                                }
                                {this.state.air_con === true ?
                                <div className="form-group"><label htmlFor="air_con">Air Conditioner</label>
                                    <input className="pro-checkbox" id="air_con" type="checkbox" name="air_con" 
                                    value={this.state.air_con} onChange={this.onChangeAirCon} defaultChecked /></div>
                                    :
                                <div className="form-group"><label htmlFor="air_con">Air Conditioner</label>
                                    <input className="pro-checkbox" id="air_con" type="checkbox" name="air_con" 
                                    value={this.state.air_con} onChange={this.onChangeAirCon} /></div>
                                }
                                {this.state.water_heater === true ?
                                <div className="form-group"><label htmlFor="water_heater">Water Heater</label>
                                    <input className="pro-checkbox" id="water_heater" type="checkbox" name="water_heater" 
                                    value={this.state.water_heater} onChange={this.onChangeWaterHeater} defaultChecked /></div>
                                    :
                                <div className="form-group"><label htmlFor="water_heater">Water Heater</label>
                                    <input className="pro-checkbox" id="water_heater" type="checkbox" name="water_heater" 
                                    value={this.state.water_heater} onChange={this.onChangeWaterHeater} /></div>
                                }
                                <br/>
                            </div>
                            <div className="col-sm-6">
                                <h3>Services</h3>
                                <div className="form-group">
                                    <input className="form-control" id="electricity" type="number" name="street" 
                                    value={this.state.electricity} onChange={this.onChangeElectricity} placeholder="Electricity Rate" /></div>
                                <div className="form-group">
                                    <input className="form-control" id="water" type="number" name="water" 
                                    value={this.state.water} onChange={this.onChangeWater} placeholder="Water Rate" /></div>
                                <h3>Room status</h3>
                                {this.state.status === true ?
                                <div className="form-group"><label htmlFor="status">Available</label>
                                    <input className="pro-checkbox" id="status" type="checkbox" name="status" 
                                    value={this.state.status} onChange={this.onChangeStatus} defaultChecked /></div>
                                    :
                                    <div className="form-group"><label htmlFor="status">Room Status</label>
                                    <input className="pro-checkbox" id="status" type="checkbox" name="status" 
                                    value={this.state.status} onChange={this.onChangeStatus} defaultChecked /></div>
                                }
                            </div>
                        </div>
                        <button className="btn btn-primary">Commit</button>
                    </form>
                </div>
            </div>
        )
    }
}