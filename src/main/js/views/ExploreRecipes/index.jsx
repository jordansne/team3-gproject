/**
 * index.jsx - EmptyMyFridge
 * Indexer & renderer of the View Recipes Page.
 */

import React from 'react';

import { RecipeGrid } from '../../components/RecipeGrid.jsx';
import { RecipeDetails } from '../../components/RecipeDetails.jsx';


export class ExploreRecipe extends React.Component {

    constructor() {
        super();
        // Initialize state with blank array
        this.state = {
            recipeList: []
        };
    }

    /**
     * Beginning building the recipe list once the component is mounted.
     */
    componentDidMount() {
        let apiURL = "Ingredient/getRecipesByRandom";

        fetch(apiURL).then((response) => {
            if (response.ok) {

                // Process the JSON and update the component's state
                response.json().then((recipeObject) => {
                    this.setState({
                        recipeList: recipeObject
                    });
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

    render() {
        return (
            <div>
                <h1>Explore Recipes</h1>
                <RecipeGrid recipes={this.state.recipeList}/>
            </div>
        );
    }
}
