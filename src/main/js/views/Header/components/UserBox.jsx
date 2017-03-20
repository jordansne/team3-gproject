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

        // Initialize blank state
        this.state = {
            profileName: null,
            profilePic: null
        };

        // Register event for updating user account when signing in/out.
        this.registerAuthEvent();
    }

    registerAuthEvent() {
        // Called whenever a user signs in/out or the page is fully refreshed/loaded.
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // If user is signed in.. update state
                this.setState({
                    profileName: user.displayName,
                    profilePic: user.photoURL
                });
            } else {
                // If user not signed in.. clear state
                this.setState({
                    profileName: null,
                    profilePic: null
                });
            }
        });
    }

    /**
     * Called when the sign in button is pressed.
     */
    handleSignButton() {
        if (!this.isSignedIn()) {
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
            console.log("Signed In");
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
        }, (error) => {
            console.log("Error " + error.code + ": Could not sign out: " + error.message);
        });
    }

    /**
     * Check if there is currently an account signed in.
     */
    isSignedIn() {
        return firebase.auth().currentUser != null;
    }

    render() {
        return (
            <div id="userBox">
                <section id="info">
                    <LoginButton signedIn={this.isSignedIn()} handleClick={() => this.handleSignButton()}/>
                </section>
                <section id="pic">
                    <img src={this.state.profilePic}/>
                </section>
            </div>
        );
    }
}
