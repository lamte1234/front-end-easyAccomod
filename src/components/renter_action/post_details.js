import React, {Component} from 'react';
import axios from 'axios';

import Nav from '../common/renter_nav';

export default class PostDetail extends Component {

    constructor(props) {
        super(props);



        this.state = {
            title: '',
            city: '',
            district: '',
            ward: '',
            street: '',
            room_type: '',
            rented_rate: '',
            area: '',
            bathroom: false,
            kitchen: false,
            air_con: false,
            water_heater: false,
            electricity: '', //vnd per kwh
            water: '', //vnd per m3
            image: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/renter/post/'+this.props.match.params.id)
        .then(res => this.setState({
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
            electricity: res.data.electricity, //vnd per kwh
            water: res.data.water, //vnd per m3
            image: res.data.image
        }))
        .catch(err => console.log(err));
    }




    render() {
        return(
            <div>
                <Nav />
                <div className='container'>
                    <br />
                    <h2>{this.state.title}</h2>
                    <br />
                    <h3>Address</h3>
                    <p>City: {this.state.city}</p>
                    <p>District: {this.state.district}</p>
                    <p>Ward: {this.state.ward}</p>
                    <p>Street: {this.state.street}</p>
                    <br />
                    <h3>Description</h3>
                    <ul>
                        <li>Room Type: {this.state.room_type}</li>
                        <li>Area: {this.state.area} M2</li>
                        <li>Bathroom: {this.state.bathroom ? <p className="text-success">YES</p>:<p className="text-danger">NO</p>}</li>
                        <li>Kitchen: {this.state.kitchen ? <p className="text-success">YES</p>:<p className="text-danger">NO</p>}</li>
                        <li>Air Conditioner: {this.state.air_con ? <p className="text-success">YES</p>:<p className="text-danger">NO</p>}</li>
                        <li>Water Heater: {this.state.water_heater ? <p className="text-success">YES</p>:<p className="text-danger">NO</p>}</li>
                        <li>Electricity rate: {this.state.electricity} per KWH</li>
                        <li>Water rate: {this.state.water} per M3</li>
                        <li>Rented Rate: {this.state.rented_rate} per Month</li>
                    </ul>
                    {this.state.image.map((img, index) => 
                        <img className="img-fluid m-2" src={'http://localhost:5000/'+img} key={index} width="200" alt="room_image"></img>
                    )}
                </div>
            </div>
        )
    }
}