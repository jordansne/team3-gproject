/**
 * index.jsx - EmptyMyFridge
 * Index of the Profile Component.
 */

import React from 'react';

export class Profile extends React.Component {

    constructor() {
        super();

        this.state = {
            signedIn: false
        };
    }

    /**
     * Called before component is mounted. Register event listener for if user logs in
     * while on the profile page is open so it can be updated with user info.
     */
    componentWillMount() {
        // onAuthStateChanged returns an unregister function
        this.unregisterAuthEvent = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    signedIn: true
                });
            } else {
                this.setState({
                    signedIn: false
                });
            }
        });
    }

    /**
     * Called before component is unmounted. Unregister event listener when user leaves
     * profile page to prevent setting state of component that isn't mounted.
     */
    componentWillUnmount() {
        this.unregisterAuthEvent();
    }

    render() {
        let profilePage;

        if (this.state.signedIn) {
            // If the user is signed in..
            profilePage = (
                <div id="profile">
                    <h1>User Profile</h1>
                    <p>Currently Signed in as: {firebase.auth().currentUser.displayName}</p>

                    <button id="deleteAccount">
                        Delete Account
                    </button>
                </div>
            );

        } else {
            // If the user is not signed in..
            profilePage = (
                <div id="profileNoSignIn">
                    <h1>Woops!</h1>
                    <h2>You must be signed in to see this page</h2>
                    <h3>(Hint: You can <i>log in</i> using the button in the header..)</h3>
                </div>
            );
        }

        return profilePage;
    }
}
