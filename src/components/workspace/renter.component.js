import React, { Component } from 'react';

import Search from '../renter_action/search.component';
import Footer from '../common/footer';

import '../../css/renter.css';

export default class RenterWS extends Component {


    render() {
        return (
            <div className="main">
                <Search/>
                <Footer/>
            </div>
        )
    }

}