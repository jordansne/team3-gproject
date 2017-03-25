/**
 * RecipeGrid.jsx - EmptyMyFridge
 * RecipeGrid component.
 */

import React from 'react';
import { RecipeBox } from './RecipeBox.jsx';
import { RecipeDetails } from './RecipeDetails.jsx';

export class RecipeGrid extends React.Component {

    constructor() {
        super();

        // Initialize state with blank array
        this.state = {
            currentDetailsID: 0,
            recipesLikeStatus: {},
            signedIn: false
        };
    }

    /**
     * Called to initialize firebase reference
     */
    componentDidMount() {
        // onAuthStateChanged returns an unregister function
        this.unregisterAuthEvent = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    currentDetailsID: 0,
                    recipesLikeStatus: {},
                    signedIn: true
                });

                this.firebaseSavedRef = firebase.database().ref('saved/' + firebase.auth().currentUser.uid + '/');

                // If provided with any recipes immediately in props, initialize liked recipes
                if (this.props.recipes.length > 0) {
                    this.initializeLikedRecipes(this.props);
                }
            } else {
                this.setState({
                    currentDetailsID: 0,
                    recipesLikeStatus: {},
                    signedIn: false
                });

                this.firebaseSavedRef = null;
                this.initializeLikedRecipes();
            }
        });
    }

    /**
     * Initialize any new recipes that are added to props (i.e. in the case that they are coming from API calls)
     * @param newProps: The new props object with the new recipe
     */
    componentWillReceiveProps(newProps) {
        this.initializeLikedRecipes(newProps);
    }

    initializeLikedRecipes(props) {
        if (this.state.signedIn) {

            for (let i = 0; i < props.recipes.length; i++) {
                const currentID = props.recipes[i].identity;

                // Check if liked already
                this.firebaseSavedRef.once('value').then((snapshot) => {
                    let likedRecipes = snapshot.val();

                    // If no likes are in a user saved recipe
                    if (likedRecipes === null) {
                        this.state.recipesLikeStatus[currentID] = false;
                        this.setState({
                            recipesLikeStatus: this.state.recipesLikeStatus,
                            currentDetailsID: this.state.currentDetailsID,
                            signedIn: this.state.signedIn,
                        });

                        return;
                    }

                    // Check if already liked
                    for (let i = 0; i < likedRecipes.length; i++) {
                        if (likedRecipes[i] === currentID) {
                            this.state.recipesLikeStatus[currentID] = true;
                            this.setState({
                                recipesLikeStatus: this.state.recipesLikeStatus,
                                currentDetailsID: this.state.currentDetailsID,
                                signedIn: this.state.signedIn,
                            });

                            return;
                        }
                    }

                    // If not found, user has not liked
                    this.state.recipesLikeStatus[currentID] = false;
                    this.setState({
                        recipesLikeStatus: this.state.recipesLikeStatus,
                        currentDetailsID: this.state.currentDetailsID,
                        signedIn: this.state.signedIn,
                    });
                });
            }
        } else {

            // If not signed in
            const newRecipesLikeStatus = {};
            for (let i = 0; i < this.props.recipes.length; i++) {
                const currentID = this.props.recipes[i].identity;

                newRecipesLikeStatus[currentID] = false;
            }

            this.setState({
                recipesLikeStatus: newRecipesLikeStatus,
                currentDetailsID: this.state.currentDetailsID,
                signedIn: this.state.signedIn
            });

        }
    }

    /**
     * Called to unregister the authentication event listener
     */
    componentWillUnmount() {
        this.unregisterAuthEvent();
    }

    /**
     * Called when a user pressed the like button.
     * @param recipeID: The recipe to like/unlike.
     * @return: If like was processed.
     */
    handleLikeClick(recipeID) {
        if (!this.state.signedIn) {
            alert("Please sign up or sign in to like recipes!");
            return false;
        }

        this.firebaseLikesRef = firebase.database().ref('likes/' + recipeID + '/');

        this.firebaseSavedRef.once('value').then((snapshot) => {
            let likedRecipes = snapshot.val();

            // If no likes are in a user saved recipe
            if (likedRecipes === null) {
                this.handleLike(recipeID, likedRecipes);
                return;
            }

            // Check if already liked
            for (let i = 0; i < likedRecipes.length; i++) {
                if (likedRecipes[i] === recipeID) {
                    this.handleUnlike(recipeID, likedRecipes);
                    return;
                }
            }

            // Like if not already liked
            this.handleLike(recipeID, likedRecipes);
        });

        return true;
    }

    /**
     * Called when need to handle liking a recipe.
     * @param recipeID: The recipe to like.
     * @param currentList: The current list of liked recipes from the database.
     */
    handleLike(recipeID, currentList) {
        // Create new array if currently blank in database
        if (currentList === null) {
            currentList = [];
        }

        // Add recipe & set the new liked list for user on the database
        currentList.push(recipeID);
        this.firebaseSavedRef.set(currentList);

        // Update recipe like count on the database
        this.firebaseLikesRef.once('value').then((snapshot) => {
            let likes = snapshot.val();

            if (likes === null) {
                likes = 1;
            } else {
                likes++;
            }

            this.firebaseLikesRef.set(likes);
        });

        // Update state with new liked status
        this.state.recipesLikeStatus[recipeID] = true;
        this.setState({
            recipesLikeStatus: this.state.recipesLikeStatus,
            currentDetailsID: this.state.currentDetailsID,
            signedIn: this.state.signedIn
        });
    }

    /**
     * Called when need to handle unliking a recipe.
     * @param recipeID: The recipe to unlike.
     * @param currentList: The current list of liked recipes from the database.
     */
    handleUnlike(recipeID, currentList) {
        // Remove recipe & set the new liked list for user on the database
        const index = currentList.indexOf(recipeID);
        currentList.splice (index, 1);
        this.firebaseSavedRef.set(currentList);

        // Update recipe like count on the database
        this.firebaseLikesRef.once('value').then((snapshot) => {
            let likes = snapshot.val();

            likes -= 1;

            if (likes <= 0) {
                this.firebaseLikesRef.remove();

            } else {
                this.firebaseLikesRef.set(likes);

            }
        });

        // Update state with new liked status
        this.state.recipesLikeStatus[recipeID] = false;
        this.setState({
            recipesLikeStatus: this.state.recipesLikeStatus,
            currentDetailsID: this.state.currentDetailsID,
            signedIn: this.state.signedIn
        });
    }

    /**
     * Called when a RecipeBox is clicked to view recipe details.
     * @param recipeID: The recipe to open details of.
     */
    setDetailsView(recipeID) {
        this.setState({
            currentDetailsID: recipeID,
            signedIn: this.state.signedIn,
            recipesLikeStatus: this.state.recipesLikeStatus
        });
    }

    /**
     * Callback to close the details window.
     */
    closeDetails() {
        this.setDetailsView(0);
    }

    render() {
        // Array to store the recipe boxes
        const recipeBoxes = [];

        // Generate RecipeBox's
        for (let i = 0; i < this.props.recipes.length; i++) {
            // Append new recipe box to recipeBox array
            recipeBoxes.push(
                <RecipeBox
                    name={this.props.recipes[i].name}
                    key={i}
                    id={this.props.recipes[i].identity}
                    image={this.props.recipes[i].image}
                    setDetailsView={(id) => this.setDetailsView(id)}
                    likeClicked={(id) => {return this.handleLikeClick(id)}}
                    isLiked={this.state.recipesLikeStatus[this.props.recipes[i].identity]}
                />

            );
        }

        // Show RecipeDetail modal is user opened it
        let recipeModal = "";
        if (this.state.currentDetailsID !== 0) {
            recipeModal = <RecipeDetails
                id={this.state.currentDetailsID}
                likeClicked={(id) => {return this.handleLikeClick(id)}}
                close={() => this.closeDetails()}
                isLiked = {this.state.recipesLikeStatus[this.state.currentDetailsID]}
            />;
        }

        return (
            <div>
                <div id="recipeGrid">
                    {recipeBoxes}
                </div>
                {recipeModal}
            </div>
        );
    }
}
