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
    componentDidMount() {
        // onAuthStateChanged returns an unregister function
        this.unregisterAuthEvent = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    signedIn: true,
                    likedRecipes: this.state.likedRecipes
                });
            } else {
                this.setState({
                    signedIn: false,
                    likedRecipes: []
                });
            }
        });

        this.retrieveLikedRecipes();
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
        const firebaseRef = firebase.database().ref('saved/' + firebase.auth().currentUser.uid + '/');
        const newLikedRecipes = [];

        firebaseRef.once('value').then((snapshot) => {
            let likedRecipes = snapshot.val();

            if (likedRecipes !== null) {
                // Add all recipes to the likedRecipe list
                for (let i = 0; i < likedRecipes.length; i++) {
                    this.addToLikedRecipes(newLikedRecipes, likedRecipes[i]);
                }
            }
        });
    }

    addToLikedRecipes(recipeList, id) {
        let apiURL = "/Ingredient/getRecipeInfo?recipeID=" + id;

        fetch(apiURL).then((response) => {
            if (response.ok) {

                response.json().then((recipeObject) => {
                    const recipeList = this.state.likedRecipes.slice();
                    recipeList.push(recipeObject);

                    this.setState({
                        likedRecipes: recipeList,
                        signedIn: this.state.signedIn
                    })
                })

            } else {
                // TODO: Handle server response error
                console.error("Server response error: " + response.message);
            }

        }).catch((error) => {
            // TODO: Handle connection error
            console.error("Server response error: " + error.message);
        });
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
        let recipes;

        if (this.state.likedRecipes.length > 0) {
            recipes = (
                <div>
                    <h2>Liked Recipes</h2>
                    <RecipeGrid recipes={this.state.likedRecipes}/>
                </div>
            );
        } else {
            recipes = (
                <div>
                    <h2>Liked Recipes</h2>
                    <p>Like recipes your favourite recipes and see them all right here!</p>
                </div>
            );
        }

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

                    {recipes}

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
