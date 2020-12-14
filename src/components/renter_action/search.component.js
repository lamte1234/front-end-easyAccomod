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


export default class Search extends Component {
    constructor(props) {
        super(props);

        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeDistrict = this.onChangeDistrict.bind(this);
        this.onChangeWard = this.onChangeWard.bind(this);
        this.onChangeRoomType = this.onChangeRoomType.bind(this);
        this.onChangeBathroom = this.onChangeBathroom.bind(this);
        this.onChangeKitchen = this.onChangeKitchen.bind(this);
        this.onChangeAirCon = this.onChangeAirCon.bind(this);
        this.onChangeWaterHeater = this.onChangeWaterHeater.bind(this);
        this.onChangeRentedRate = this.onChangeRentedRate.bind(this);
        this.onChangeArea = this.onChangeArea.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            city: '',
            district: '',
            ward: '',
            room_type: '',
            bathroom: false,
            kitchen: false,
            air_con: false,
            water_heater: false,
            rented_rate: '',
            area: '', // in range error of 3m2
            posts: []
        };
    }


    onChangeCity(e) {
        this.setState({
            city: e.target.value
        })
    }
    onChangeDistrict(e) {
        this.setState({
            district: e.target.value
        })
    }
    onChangeWard(e) {
        this.setState({
            ward: e.target.value
        })
    }
    onChangeRoomType(e) {
        this.setState({
            room_type: e.target.value
        })
    }
    onChangeBathroom(e) {
        this.setState({
            bathroom: !this.state.bathroom
        })
    }
    onChangeKitchen(e) {
        this.setState({
            kitchen: !this.state.kitchen
        })
    }
    onChangeAirCon(e) {
        this.setState({
            air_con: !this.state.air_con
        })
    }
    onChangeWaterHeater(e) {
        this.setState({
            water_heater: !this.state.water_heater
        })
    }
    onChangeRentedRate(e) {
        this.setState({
            rented_rate: e.target.value
        })
    }
    onChangeArea(e) {
        this.setState({
            area: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();

        const data = {
            ...this.state,
            withCredentials: true
        }
        axios.get('http://localhost:5000/users/renter/search', data)
        .then(res => {this.setState({
            posts: res.data
        })
        console.log(this.state.posts);
        })
        .catch(err => console.log(err))
    }
    
    postList() {
        return this.state.posts.map((post, index) => {
            return <Post post={post} key={index} ></Post>
        })
    }

    render() {
        if (this.state.posts.length === 0){
            return(
                <div>
                    <Nav />
                    <div className="container">
                        <br />
                        <form method='GET' onSubmit={this.onSubmit}>
                            <div className="form-group"><label htmlFor="city">City</label>
                                <input className="form-control" id="city" type="text" name="city"
                                value={this.state.city} onChange={this.onChangeCity} /></div>
                            <div className="form-group"><label htmlFor="district">District</label>
                                <input className="form-control" id="district" type="text" name="district"
                                value={this.state.district} onChange={this.onChangeDistrict} /></div>
                            <div className="form-group"><label htmlFor="ward">Ward</label>
                                <input className="form-control" id="ward" type="text" name="ward" 
                                value={this.state.ward} onChange={this.onChangeWard} /></div>
                            <div className="form-group"><label htmlFor="room_type">Room Type</label>
                                <input className="form-control" id="room_type" type="text" name="room_type" 
                                value={this.state.room_type} onChange={this.onChangeRoomType} /></div>
                            <div className="form-group"><label htmlFor="rented_rate">Rented Rate Min</label>
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
                            <button className="btn btn-primary">Search</button>
                        </form>
                    </div>
                </div>
            )
        }
        else if (this.state.posts.length > 0){
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
            )
        }
    }
}