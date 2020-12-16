import React, { Component } from 'react';
import ListPost from '../renter_action/listPost.component';

import Nav from '../common/renter_nav';


export default class RenterWS extends Component {


    render() {
        return (
            <div>
                <Nav></Nav>
                <ListPost />
            </div>
        )
    }

}