/**
 * index.jsx - EmptyMyFridge
 * Indexer & renderer of the View Recipes Page.
 */

import React from 'react';

import { RecipeGrid } from '../../components/RecipeGrid.jsx';

export class RecipeView extends React.Component {

    constructor() {
        super();

        // Initialize state with blank array
        this.state = {
            recipeList: [],
            apiCallFinished: false
        };
    }

    /**
     * Beginning building the recipe list once the component is mounted.
     */
    componentDidMount() {
        let apiURL = this.buildApiParams(this.props.location.query);

        fetch(apiURL).then((response) => {
            if (response.ok) {

                // Process the JSON and update the component's state
                response.json().then((recipeObject) => {
                    this.setState({
                        recipeList: recipeObject,
                        apiCallFinished: true
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
        let paramString = "/Ingredient/getRecipesByComplex?foodtype=";

        // Add food type to API request
        if (search.type) {
            let foodParam = search.type;
            const foodType = foodParam.replace("-", "%2B");
            paramString += foodType + "&diet=";
        } else {
            paramString += "&diet=";
        }

        // Add restriction to API request
        if (search.restriction) {
            const diet = search.restriction;
            paramString += diet + "&cuisine=&ingredients=";
        } else {
            paramString += "&cuisine=&ingredients=";
        }

        // Add ingredients to API request
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
        if (this.state.apiCallFinished && this.state.recipeList.length === 0) {
            return (
                <div>
                    <h1>No Results Found</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Recipe Search Results</h1>
                    <RecipeGrid recipes={this.state.recipeList}/>
                </div>
            );
        }

    }
}
