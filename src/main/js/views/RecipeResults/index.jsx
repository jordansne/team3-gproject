/**
 * index.jsx - EmptyMyFridge
 * Indexer & renderer of the View Recipes Page.
 */

import React from 'react';

import { RecipeGrid } from './components/RecipeGrid.jsx';

export class RecipeView extends React.Component {

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
        let apiURL = "http://localhost:8080/Ingredient/getRecipesByIngredients";
        apiURL += this.buildApiParams(this.props.location.query);

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

    /**
     * Takes the search parameters and converts to a GET API query string.
     */
    buildApiParams(search) {
        let paramString = "?ingredients=";

        const ingredientArray = search.ingredients.split(",");
        for (let i = 0; i < ingredientArray.length; i++) {
            paramString += ingredientArray[i];

            // Add separator between ingredients
            if (i < ingredientArray.length - 1) {
                paramString += "%2C";
            }
        }

        return paramString;
    }

    render() {
        return(
            <RecipeGrid recipes={this.state.recipeList}/>
        );
    }
}
