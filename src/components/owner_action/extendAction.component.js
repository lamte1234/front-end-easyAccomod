import React, {Component} from 'react';
import axios from 'axios';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import Nav from '../common/owner_nav';

export default class ExtendAction extends Component {
    constructor(props) {
        super(props);

        this.onChangeTime = this.onChangeTime.bind(this);
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
            image: [],
            status: '', //vnd per m3
            time: '',
            errors: []
        }
    }

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
            image: res.data.image,
            status: res.data.status
        }))
        .catch(err => console.log(err));
        
    }

    onChangeTime(e) {
        this.setState({
            time: e.target.value
        })
    }

    validate() {
        let errors = [];

        if(!this.state.time) { errors.push('Time is required') }

        if(this.state.time && !this.state.time.match(/^[1-4]$/)) {
            errors.push('Posting time must in range 1-4 weeks.')
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

        if(this.validate() === true) {
            axios.patch('http://localhost:5000/users/owner/extend/'+this.props.match.params.id, {time: this.state.time}, {withCredentials: true})
            .then(res => {
                if (res.status === 200 && !res.data.errors){
                    alert ("Extending request has been recorded. Please wait for approval.")
                    window.location.href = ('http://localhost:3000/users/owner/all-post')
                }
                if(res.data.errors){
                    this.setState({
                        errors: res.data.errors
                    })
                }
                console.log(res.data);
            })
            .catch(err => console.log(err))
        }
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
                            <div>
                                {
                                    this.state.errors.map((err, index) =>
                                        <div className='alert alert-danger' key={index}>{err}</div>)
                                }
                                <form method="PATCH" onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="time"><h3>Extended time for this post</h3></label>
                                        <input className="form-control" id="time" type="number" name="time" 
                                        value={this.state.time} onChange={this.onChangeTime} /></div>
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
                                            : 
                                            <p>Please select from 1 - 4 weeks</p>
                                        }
                                    <button className="btn btn-info">Extend</button>
                                </form>
                            </div>
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