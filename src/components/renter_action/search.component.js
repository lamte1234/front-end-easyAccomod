import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../../css/renter.css';

import Nav from '../common/renter_nav';

const Post = props => {
    return(
        <div className="row mt-3 post" id="post">
            <div className="col-sm-5 col-lg-4 img-demo">
                <Link to={`/users/renter/post/${props.post._id}`}>
                    <img className="img-demo" src={'http://localhost:5000/' + props.post.image[0]} width="100%" alt="preview"></img>
                </Link>
                
            </div>
            <div className="col-sm-4 col-lg-5 info">
                <Link to={`/users/renter/post/${props.post._id}`}><h3 className="text-capitalize">{props.post.title}</h3></Link>
                <p>Address: {props.post.street}, {props.post.ward}, {props.post.district}, {props.post.city}</p>
                {props.post.status ? <p className="text-success">Available</p>:<p className="text-danger">Rented</p>}
            </div>
            <div className="col-sm-3 col-lg-3 rate">
                <p><span className="rented-rate">{props.post.rented_rate} vnd</span>/month</p>
                <Link to={`/users/renter/post/${props.post._id}`}>
                    <button className="btn btn-info">View room</button>
                </Link>
            </div>
        </div>
    )
}


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

    componentDidMount() {
        axios.get('http://localhost:5000/users/renter/explore', {withCredentials: true})
        .then(res => {
            console.log(res.data);
            this.setState({
                posts: res.data
            })

        })
        .catch(err => console.log(err))
    }

    onSubmit(e) {
        e.preventDefault();
        let params= {};
        for (const st in this.state) {
            const key = st;
            const value = this.state[st];
            if(value !== '' && value !== false){
                params[key] = value;
            }
        }
        delete params.posts;
        console.log(params);
        const config = {
            params: {
                ...params
            },
            withCredentials: true
        }
        axios.get('http://localhost:5000/users/renter/search', config)
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
        .catch(err => console.log(err))

        
    }
    
    postList() {
        return this.state.posts.map((post, index) => {
            return <Post post={post} key={index} ></Post>
        })
    }

    render() {
            return(
                <div className="list">
                    <Nav />
                    <br/>
                    <form method='GET' onSubmit={this.onSubmit} className="search-bar">
                        <div className="container">
                            <div className="form-row">
                                    <div className="form-group col-sm-2">
                                        <input className="form-control col-sm-11" id="city" type="text" name="city"
                                        value={this.state.city} onChange={this.onChangeCity} placeholder="City" /></div>
                                    <div className="form-group col-sm-2">
                                        <input className="form-control col-sm-11" id="district" type="text" name="district"
                                        value={this.state.district} onChange={this.onChangeDistrict} placeholder="District" /></div>
                                    <div className="form-group col-sm-2">
                                        <input className="form-control col-sm-11" id="ward" type="text" name="ward" 
                                        value={this.state.ward} onChange={this.onChangeWard} placeholder="Ward" /></div>
                                    <div className="form-group col-sm-2">
                                        <select className="form-control col-sm-11" id="room_type" type="text" name="room_type" 
                                        value={this.state.room_type} onChange={this.onChangeRoomType}>
                                            <option>Apartment</option>
                                            <option>Guest House</option>
                                            <option>Shared Room</option>
                                            <option>Premium Apartment</option>
                                            <option>House</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-sm-2">
                                        <input className="form-control col-sm-11" id="rented_rate" type="number" name="rented_rate" 
                                        value={this.state.rented_rate} onChange={this.onChangeRentedRate} placeholder="Rented Rate" /></div>
                                    
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-sm-2">
                                        <input className="form-control col-sm-11" id="area" type="number" name="area" 
                                        value={this.state.area} onChange={this.onChangeArea} placeholder="Area" /></div>
                                    <div className="col-sm-2">
                                        <div className="form-group col-sm-11 facilities"><label htmlFor="bathroom">Bathroom</label>
                                            <input className="pro-checkbox" id="bathroom" type="checkbox" name="bathroom"
                                            value={this.state.bathroom} onChange={this.onChangeBathroom} /></div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group col-sm-11 facilities"><label htmlFor="kitchen">Kitchen</label>
                                            <input className="pro-checkbox" id="kitchen" type="checkbox" name="kitchen" 
                                            value={this.state.kitchen} onChange={this.onChangeKitchen} /></div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group col-sm-11 facilities"><label htmlFor="air_con">Air Conditioner</label>
                                            <input className="pro-checkbox" id="air_con" type="checkbox" name="air_con" 
                                            value={this.state.air_con} onChange={this.onChangeAirCon} /></div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group col-sm-11 facilities"><label htmlFor="water_heater">Water Heater</label>
                                            <input className="pro-checkbox" id="water_heater" type="checkbox" name="water_heater" 
                                            value={this.state.water_heater} onChange={this.onChangeWaterHeater} /></div>
                                    </div>
                                    <div className="col-sm-2 text-center">
                                        <button className="btn btn-info col-sm-10">Search</button>
                                    </div>
                                </div>
                                
                    </div>
                </form>
                <div className="container">
                    {this.postList()}
                </div>
            </div>
            )
        }
}