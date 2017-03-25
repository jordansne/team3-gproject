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
            signedIn: false,
            recipesLikeStatus: {}
        };
    }

    /**
     * Called to initialize firebase reference
     */
    componentDidMount() {
        // Initialize reference is currentUser has been set
        if (firebase.auth().currentUser != null) {
            this.firebaseSavedRef = firebase.database().ref('saved/' + firebase.auth().currentUser.uid + '/');
        }
    }

    /**
     * Called to initialize like status of each recipe.
     */
    componentWillReceiveProps(props) {
        // Initialize reference if is has not already
        if (this.firebaseSavedRef == null) {
            this.firebaseSavedRef = firebase.database().ref('saved/' + firebase.auth().currentUser.uid + '/');
        }

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
    }

    /**
     * Called when a user pressed the like button.
     * @param recipeID: The recipe to like/unlike.
     */
    handleLikeClick(recipeID) {
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
                    likeClicked={(id) => this.handleLikeClick(id)}
                    isLiked={this.state.recipesLikeStatus[this.props.recipes[i].identity]}
                />

            );
        }

        // Show RecipeDetail modal is user opened it
        let recipeModal = "";
        if (this.state.currentDetailsID !== 0) {
            recipeModal = <RecipeDetails
                id={this.state.currentDetailsID}
                likeClicked={(id) => this.handleLikeClick(id)}
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
