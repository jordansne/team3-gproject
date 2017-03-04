/**
 * UserBox.jsx - EmptyMyFridge
 * UserBox component.
 */

import React from 'react';

import { LoginButton } from './LoginButton.jsx';

export class UserBox extends React.Component {

    constructor() {
        super();

        // Initialize secure cookie
        if (document.cookie.indexOf("secure") === -1) {
            document.cookie = "secure";
        }

        // Determine initial state
        if (this.isSignedIn()) {
            this.state = {
                signedIn: true
            };
        } else {
            this.state = {
                signedIn: false
            };
        }
    }

    /**
     * Called when the sign in button is pressed.
     */
    handleSignButton() {
        if (!this.state.signedIn) {
            this.signIn();
        } else {
            this.signOut();
        }
    }

    /**
     * Display the Google Sign in/sign up dialog.
     */
    signIn() {
        const fbProvider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(fbProvider).then((result) => {
            const token = result.credential.accessToken;
            const user = result.user;

            // Save access token in a cookie
            document.cookie = "access_token=" + token + ";";

            this.setState({
                signedIn: true
            });
        }).catch((error) => {
            console.error("Error " + error.code + ": Could not sign in: " + error.message);
        });
    }

    /**
     * Display the Google Sign in/sign up dialog.
     */
    signOut() {
        firebase.auth().signOut().then(() => {
            console.log("Signed Out");

            // Clear the token in the cookie
            document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

            this.setState({
                signedIn: false
            });
        }, (error) => {
            console.log("Error " + error.code + ": Could not sign out: " + error.message);
        });
    }

    /**
     * Check if the user is signed in.
     */
    isSignedIn() {
        const cookie = document.cookie;
        return !(cookie === "" || cookie.indexOf("access_token") == -1);
    }

    getProfileImage() {
        return null;
    }

    render() {
        return (
            <div id="userBox">
                <section id="info">
                    <LoginButton signedIn={this.state.signedIn} handleClick={() => this.handleSignButton()}/>
                </section>
                <section id="pic">
                    <img src={this.getProfileImage()}/>
                </section>
            </div>
        );
    }
}
