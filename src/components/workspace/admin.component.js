import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../css/adminws.css';
import toolImage from '../../images/tool.png'

import Nav from '../common/admin_nav';

export default class AdminWS extends Component {


    render() {
        return (
            <div className="wrapper">
                <Nav></Nav>
                <div className="quote">
                    <span className="quote-wrapper">
                        <div className="first-quote">
                            CUSTOMER SATISFACTION <br />
                            IS OUR <br /> 
                            HAPPINESS.
                        </div>
                        <div className="second-quote">
                            Attitude is a little things that makes a big difference.  Together, let make
                            our company services developed, not the best choice but not the second choice.
                        </div>
                        <div className="button-wrapper">
                            <Link to='/users/admin/posts' className="fake-button">Start working NOW!</Link>
                        </div>
                    </span>
                    <span className="tool-image">
                        <img src={toolImage} alt="tool"></img>
                    </span>
                </div>
            </div>
        )
    }

}