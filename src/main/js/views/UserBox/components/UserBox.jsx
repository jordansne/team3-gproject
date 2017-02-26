/**
 * UserBox.jsx - EmptyMyFridge
 * UserBox component.
 */

import React from 'react';

import { LoginButton } from './LoginButton.jsx';

export class UserBox extends React.Component {

    constructor() {
        super();
        this.state = {
            signedIn: false
        };
    }

    openLoginWindow() {
        alert("WIP");
    }

    getProfileImage() {
        return null;
    }

    render() {
        return (
            <div>
                <section id="info">
                    <LoginButton signedIn={this.state.signedIn} handleClick={() => this.openLoginWindow()}/>
                </section>
                <section id="pic">
                    <img src={this.getProfileImage()}/>
                </section>
            </div>
        );
    }
}
