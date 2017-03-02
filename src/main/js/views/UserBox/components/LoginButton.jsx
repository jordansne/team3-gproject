/**
 * LoginButton.jsx - EmptyMyFridge
 * Log In/Sign up & Logout button component for the UserBox.
 */

import React from 'react';

export class LoginButton extends React.Component {

    render() {
        const buttonText = this.props.signedIn ? "Log Out" : "Log In / Sign Up";
        let profileLink = "";

        if (this.props.signedIn) {
            profileLink = <h5><a href="./profile">Profile</a></h5>;
        }

        return (
            <div>
                {profileLink}
                <button onClick={this.props.handleClick}>
                    {buttonText}
                </button>
            </div>
        );
    }

}
