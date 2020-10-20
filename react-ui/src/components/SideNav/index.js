import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class SideNav extends Component {
    render() {
        return (
            <div>
                <Link to="/users">
                    <h2>Users</h2>
                </Link>
            </div>
        )
    }
}

export default SideNav
