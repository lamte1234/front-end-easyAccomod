import React, { Component } from 'react';

import Search from '../renter_action/search.component';

import '../../css/renter.css';

export default class RenterWS extends Component {


    render() {
        return (
            <div className="layout">
                <Search/>
            </div>
        )
    }

}