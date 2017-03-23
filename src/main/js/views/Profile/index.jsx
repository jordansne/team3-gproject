/**
 * index.jsx - EmptyMyFridge
 * Index of the Profile Component.
 */

import React from 'react';

import { FilterSpecifier } from './components/FilterSpecifier.jsx';
import { RecipeGrid } from '../../components/RecipeGrid.jsx';

export class Profile extends React.Component {

    constructor() {
        super();

        this.state = {
            signedIn: false,
            likedRecipes: []
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
                    signedIn: true,
                    likedRecipes: this.retrieveLikedRecipes()
                });
            } else {
                this.setState({
                    signedIn: false,
                    likedRecipes: []
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

    /**
     * Retrieve a list of liked recipes from backend.
     */
    retrieveLikedRecipes() {
        // TODO: Set up with proper firebase backend API

        // Test data
        return [
            { name: "Food Item #1" },
            { name: "Food Item #2" },
            { name: "Food Item #3" },
            { name: "Food Item #4" },
            { name: "Food Item #5" }
        ];
    }

    /**
     * Called when the delete account button is pressed.
     */
    handleDeleteAccount() {
        // Show confirmation window to verify they actually want to delete their account.
        const confirmDelete = confirm(
            "****WARNING****: \n\nAre you sure you want to delete your account? This will erase all user data!!"
        );

        if (confirmDelete) {
            firebase.auth().currentUser.delete().then(() => {
                console.log("Account deleted");
            }, (error) => {
                console.error("Error: Could not delete account: " + error.message);
            })
        }
    }

    render() {
        let profilePage;

        if (this.state.signedIn) {
            // If the user is signed in..
            profilePage = (
                <div id="profile">
                    <h1>Profile</h1>
                    <p>Currently Signed in as: {firebase.auth().currentUser.displayName}</p>

                    <aside id="pref">
                        <h2>Preferences</h2>
                        <FilterSpecifier/>
                    </aside>

                    <h2>Liked Recipes</h2>
                    <RecipeGrid recipes={this.state.likedRecipes}/>

                    <h2>Settings</h2>
                    <button id="deleteAccount" onClick={() => this.handleDeleteAccount()}>
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
