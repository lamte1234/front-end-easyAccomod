import React, { Component } from 'react';

import ListPost from '../renter_action/listPost.component';

import Nav from '../common/renter_nav';

import '../../css/renter.css';

export default class RenterWS extends Component {


    render() {
        return (
            <div className="layout">
                <Nav></Nav>
                <ListPost />
            </div>
        )
    }

}