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
            currentDetailsID: 0
        };
    }

    /**
     * Callback to open details window using the recipe ID.
     */
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
                />
            );
        }

        let recipeModal = "";
        if (this.state.currentDetailsID !== 0) {
            recipeModal = <RecipeDetails id={this.state.currentDetailsID} close={() => this.closeDetails()}/>;
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
