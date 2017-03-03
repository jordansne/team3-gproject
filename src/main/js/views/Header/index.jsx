/**
 * index.jsx - EmptyMyFridge
 * Main Header component.
 */

import React from 'react';
import { Link } from 'react-router';

import { UserBox } from './components/UserBox.jsx';

export class Header extends React.Component {

    render() {
        return (
            <header>
                <h1><Link to="/">EmptyMyFridge</Link></h1>

                <aside id="right">
                    <ul>
                        <li><Link to="/explore">Explore</Link></li>
                    </ul>

                    <UserBox/>
                </aside>
            </header>
        );
    }
}
