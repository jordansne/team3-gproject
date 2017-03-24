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
            signedIn: false
        };

        //creates a path??



    }
    /**
     * Callback to open details window using the recipe ID.
     */
    componentDidMount(){
        this.myFirebaseRefsaved = firebase.database().ref('saved/' + firebase.auth().currentUser.uid + '/');
    }

    likeRecipe(recipeID){

        this.myFirebaseRefsaved.push(recipeID);
        this.incrementLikeCount(recipeID);



    }

    incrementLikeCount(recipeID){



        this.myFirebaseReflikes = firebase.database().ref('likes/' + recipeID + '/');

        this.myFirebaseReflikes.once('value').then((snapshot) => {
            let likes = snapshot.val();
            if (likes === null){
                likes = 1;
                this.myFirebaseReflikes.set(likes);
            }
            else {
                if (this.myFirebaseRefsaved.equalTo(recipeID.toString()).ref === null) {
                    likes += 1;
                    this.myFirebaseReflikes.set(likes);
                } else {
                    this.myFirebaseRefsaved.equalTo(recipeID.toString()).ref.remove();
                    likes -= 1;

                    if (likes === 0) {
                        this.myFirebaseReflikes.remove();
                    } else {
                        this.myFirebaseReflikes.set(likes);
                    }
                }
            }
        })


    }
    setDetailsView(recipeID) {
        this.setState({
            currentDetailsID: recipeID
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

        for (let i = 0; i < this.props.recipes.length; i++) {
            // Append new recipe box to recipeBox array
            recipeBoxes.push(
                <RecipeBox
                    name={this.props.recipes[i].name}
                    key={i}
                    id={this.props.recipes[i].identity}
                    image={this.props.recipes[i].image}
                    setDetailsView={(id) => this.setDetailsView(id)}
                    liked = {(id) => this.likeRecipe(id) }
                />
            );

        }

        let recipeModal = "";
        if (this.state.currentDetailsID !== 0) {
            recipeModal = <RecipeDetails
                id={this.state.currentDetailsID}
                liked={(id) => this.likeRecipe(id)}
                close={() => this.closeDetails()}
            />;
        }

        return(
            <div>
                <div id="recipeGrid">
                    {recipeBoxes}
                </div>
                {recipeModal}
            </div>
        );
    }
}
