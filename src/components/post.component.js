import React, { Component } from 'react';
import Navbar from './navbar.component';
import axios from 'axios';

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
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            city: '',
            district: '',
            ward: '',
            street: '',
            room_type: '',
            rented_rate: '', //vnd per month
            area: '',
            bathroom: false,
            kitchen: false,
            air_con: false,
            water_heater: false,
            electricity: '', //vnd per kwh
            water: '', //vnd per m3
            image: [],
            status: false,
            // is_approved: '',
            time: '',
            errors: []
        }

    };
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
            bathroom: e.target.value
        })
    };

    onChangeKitchen(e) {
        this.setState({
            kitchen: e.target.value
        })
    };

    onChangeAirCon(e) {
        this.setState({
            air_con: e.target.value
        })
    };

    onChangeWaterHeater(e) {
        this.setState({
            water_heater: e.target.value
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

    onChangeImage(e) {
        this.setState({ 
            image: e.target.files[0] 
        });
    };

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        })
    };

    onChangeTime(e) {
        this.setState({
            time: e.target.value
        })
    };

    onSubmit(e) {
        e.preventDefault();
        let data = new FormData();
        data.set("title",this.state.title);
        data.set("city",this.state.city);
        data.set("district",this.state.district);
        data.set("ward",this.state.ward);
        data.set("street",this.state.street);
        data.set("room_type",this.state.room_type);
        data.set("rented_rate",this.state.rented_rate);
        data.set("area",this.state.area);
        data.set("bathroom",this.state.bathroom);
        data.set("kitchen",this.state.kitchen);
        data.set("air_con",this.state.air_con);
        data.set("water_heater",this.state.water_heater);
        data.set("electricity",this.state.electricity);
        data.set("water",this.state.water);
        data.append("image",this.state.image);
        data.set("status",this.state.status);
        data.set("time",this.state.time);
        // const dataRenter = {
        //     title: this.state.title,
        //     city: this.state.city,
        //     district: this.state.district,
        //     ward: this.state.ward,
        //     street: this.state.street,
        //     room_type: this.state.room_type,
        //     rented_rate: this.state.rented_rate, //vnd per month
        //     area: this.state.area,
        //     bathroom: this.state.bathroom,
        //     kitchen: this.state.kitchen,
        //     air_con: this.state.air_con,
        //     water_heater: this.state.water_heater,
        //     electricity: this.state.electricity, //vnd per kwh
        //     water: this.state.water, //vnd per m3
        //     image: this.state.image,    
        //     status: this.state.status,
        //     time: this.state.time,
        // }

        axios.post('http://localhost:5000/users/owner/post', data).then(res => {
            console.log(res.data);
            if (res.data.errors) {
                this.setState({
                    errors: res.data.errors
                })
            };

            if (res.data.email) {
                window.location = '/';  //handle user page have every thing of user in res.data
            };
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <br />
                    {
                        this.state.errors.map((err, index) =>
                            <div className='alert alert-danger' key={index}>{err}</div>)
                    }
                    <form action="" method="POST" encType="multipart/form-data" onSubmit={this.onSubmit}>
                        <div className="form-group"><label htmlFor="Title">Title</label>
                            <input className="form-control" id="title" type="text" name="title" 
                            value={this.state.title} onChange={this.onChangeTitle} /></div>
                        <div className="form-group"><label htmlFor="city">City</label>
                            <input className="form-control" id="city" type="text" name="city"
                            value={this.state.city} onChange={this.onChangeCity} /></div>
                        <div className="form-group"><label htmlFor="district">District</label>
                            <input className="form-control" id="district" type="text" name="district"
                            value={this.state.district} onChange={this.onChangeDistrict} /></div>
                        <div className="form-group"><label htmlFor="ward">Ward</label>
                            <input className="form-control" id="ward" type="text" name="ward" 
                            value={this.state.ward} onChange={this.onChangeWard} /></div>
                        <div className="form-group"><label htmlFor="street">Street</label>
                            <input className="form-control" id="street" type="text" name="street" 
                            value={this.state.street} onChange={this.onChangeStreet} /></div>
                        <div className="form-group"><label htmlFor="room_type">Room Type</label>
                            <input className="form-control" id="room_type" type="text" name="room_type" 
                            value={this.state.room_type} onChange={this.onChangeRoomType} /></div>
                        <div className="form-group"><label htmlFor="rented_rate">Rented Rate</label>
                            <input className="form-control" id="rented_rate" type="text" name="rented_rate" 
                            value={this.state.rented_rate} onChange={this.onChangeRentedRate} /></div>
                        <div className="form-group"><label htmlFor="area">Area</label>
                            <input className="form-control" id="area" type="text" name="area" 
                            value={this.state.area} onChange={this.onChangeArea} /></div>
                        <div className="form-group"><label htmlFor="bathroom">Bathroom</label>
                            <input className="form-control" id="bathroom" type="checkbox" name="bathroom"
                            value={this.state.bathroom} onChange={this.onChangeBathroom} /></div>
                        <div className="form-group"><label htmlFor="kitchen">Kitchen</label>
                            <input className="form-control" id="kitchen" type="checkbox" name="kitchen" 
                            value={this.state.kitchen} onChange={this.onChangeKitchen} /></div>
                        <div className="form-group"><label htmlFor="air_con">Air Conditioner</label>
                            <input className="form-control" id="air_con" type="checkbox" name="air_con" 
                            value={this.state.air_con} onChange={this.onChangeAirCon} /></div>
                        <div className="form-group"><label htmlFor="water_heater">Water Heater</label>
                            <input className="form-control" id="water_heater" type="checkbox" name="water_heater" 
                            value={this.state.water_heater} onChange={this.onChangeWaterHeater} /></div>
                        <div className="form-group"><label htmlFor="electricity">Electricity</label>
                            <input className="form-control" id="electricity" type="number" name="street" 
                            value={this.state.electricity} onChange={this.onChangeElectricity} /></div>
                        <div className="form-group"><label htmlFor="water">Water</label>
                            <input className="form-control" id="water" type="number" name="water" 
                            value={this.state.water} onChange={this.onChangeWater} /></div>
                        <div className="form-group"><label htmlFor="image">Image</label>
                            <input className="" id="image" type="file" name="image" accept="image/*" multiple 
                            onChange={this.onChangeImage} /></div>
                        <div className="form-group"><label htmlFor="status">Status</label>
                            <input className="form-control" id="status" type="checkbox" name="status" 
                            value={this.state.status} onChange={this.onChangeStatus} /></div>
                        <div className="form-group"><label htmlFor="time">Time</label>
                            <input className="form-control" id="time" type="text" name="time" 
                            value={this.state.time} onChange={this.onChangeTime} /></div>
                        <button className="btn btn-primary">Commit</button>
                    </form>
                </div>
            </div>
        )
    }
}