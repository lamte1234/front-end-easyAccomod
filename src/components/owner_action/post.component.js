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
        this.onChangeImage = this.onChangeImage.bind(this);
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

    onChangeImage(e) {
        console.log(e.target.files);
        let files = e.target.files;
        let img = []
        for(const file in files){
            img.push(files[file]);
        };
        this.setState({
            image: img
        });
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
        data.set("time",this.state.time);
        this.state.image.forEach(img => {
            data.append('image', img);
        })

        axios.post('http://localhost:5000/users/owner/post', data, {withCredentials: true}).then(res => {
            if (res.status == 201){
                alert ("Thành công! Bài đăng của bạn đang chờ phê duyệt.")
                window.location.href = ('http://localhost:3000/users/owner/all-post')
            }
            if (res.data.errors) {
                this.setState({
                    errors: res.data.errors
                })
            };

        });
        
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
                            <input className="form-control" id="rented_rate" type="number" name="rented_rate" 
                            value={this.state.rented_rate} onChange={this.onChangeRentedRate} /></div>
                        <div className="form-group"><label htmlFor="area">Area</label>
                            <input className="form-control" id="area" type="number" name="area" 
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
                        <div className="form-group"><label htmlFor="time">Time</label>
                            <input className="form-control" id="time" type="number" name="time" 
                            value={this.state.time} onChange={this.onChangeTime} onKeyUp={this.onChangeTime}/></div>
                            {
                                this.state.time === "1" ?
                                <p>Pay Fee: 100,000 VND</p>
                                :
                                this.state.time === "2" ?
                                <p>Pay Fee: 200,000 VND</p>
                                :
                                this.state.time === "3" ?
                                <p>Pay Fee: 300,000 VND</p>
                                :
                                this.state.time === "4" ?
                                <p>Pay Fee: 400,000 VND</p>
                                : <p></p>
                            }
                        <div className="form-group"><label htmlFor="image">Image</label>
                            <input className="" id="image" type="file" name="image" accept="image/*" multiple 
                            onChange={this.onChangeImage} /></div>
                        <button className="btn btn-primary">Commit</button>
                    </form>
                </div>
            </div>
        )
    }
}