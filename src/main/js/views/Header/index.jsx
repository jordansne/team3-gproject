/**
 * index.jsx - EmptyMyFridge
 * Main Header component.
 */

import React from 'react';
import { Link } from 'react-router';

import { UserBox } from './components/UserBox.jsx';
import { TweetButton } from './components/TweetButton.jsx';
import { FacebookButton } from './components/FacebookButton.jsx';

export class Header extends React.Component {

    render() {
        return (
            <header>
                <Link to="/"><img src = "/assets/EmptyMyFridgeLogo.jpg" id = "logo" /></Link>

                <aside id="right">
                    <ul>
                        <li> <FacebookButton/></li>
                    </ul>
                    <ul>
                        <li> <TweetButton/></li>
                    </ul>
                    <ul>
                        <li><Link to="/explore">Explore</Link></li>
                    </ul>

                    <UserBox/>
                </aside>
            </header>
        );
    }
}
