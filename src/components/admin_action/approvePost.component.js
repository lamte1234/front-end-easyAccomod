import React, { Component } from "react";
import axios from "axios";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import Nav from '../common/admin_nav'

export default class AdminPostDetail extends Component {

    constructor(props) {
        super(props);



        this.state = {
            id: '',
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
            image: [],
            status: false,
            is_approved: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/admin/posts/'+this.props.match.params.id, {withCredentials: true})
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
            electricity: res.data.electricity, //vnd per kwh
            water: res.data.water, //vnd per m3
            image: res.data.image,
            status: res.data.status,
            is_approved: res.data.is_approved
        }))
        .catch(err => console.log(err));
        
    }
    
    approvePost (id) {
        axios.patch(`http://localhost:5000/users/admin/posts/${id}`,{}, {withCredentials: true})
        .then(res => {
            console.log(res.data);  
            window.location = '/users/admin/posts';
            
        })
        .catch(err => console.log(err));

        
        console.log(this.state.id)
    }
    
    render() {
        return(
            <div>
                <Nav />
                <div className='container'>
                    <br/>
                    <h3>Detail of Post</h3>
                    <br/>
                    <div className="row">
                        <div className="col-sm-8 image">
                            <AwesomeSlider>
                            {this.state.image.map((img, index) => 
                                <div key={index} className="yours-custom-class">
                                    <img src={'http://localhost:5000/'+img} width="100%" alt="room_image"></img>
                                </div>
                            )}
                            </AwesomeSlider>
                        </div>
                        <div className="col-sm-4">
                            <h2>{this.state.title}</h2>
                            <p><span className="rented-rate">{this.state.rented_rate} VND</span>/Month</p>
                            <br/>
                            <div className="form-row">
                                <h5>Status: </h5>
                                {this.state.status ? <h5 className="text-success">Available</h5>:<h5 className="text-danger">Rented</h5>}
                            </div>
                            <br/>
                            {!this.state.is_approved ?
                                <button className="btn btn-info" onClick={() => this.approvePost(this.state.id)}>Approve</button>
                                :
                                <div></div>
                            }   
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="row">
                        <div className="col-sm-6">
                            <h2>Property details</h2>
                            <p>Address: {this.state.street}, {this.state.ward}, {this.state.district}, {this.state.city}</p>
                            <p>Room type: {this.state.room_type}</p>
                            <p>Area: {this.state.area} M2</p>
                            <p>Facilities: {this.state.bathroom ? <span>bathroom</span>:<span></span>} {this.state.kitchen ? <span>, kitchen</span>:<span></span>} {this.state.air_con ? <span>, air conditioner</span>:<span></span>} {this.state.water_heater ? <span>, water heater</span>:<span></span>}</p>
                            <p>Servies: Electricity rate: {this.state.electricity}VND/KWH, water rate: {this.state.water}VND/M3</p>
                        </div>
                        <div className="col-sm-6">
                            <h2>Contact Infomation</h2>
                            <p>Name of owner: {this.state.owner_name}</p>
                            <p>Phone number: {this.state.owner_phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}