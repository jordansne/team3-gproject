/**
 * index.jsx - EmptyMyFridge
 * Indexer & renderer of the View Recipes Page.
 */

import React from 'react';

import { RecipeGrid } from '../../components/RecipeGrid.jsx';
import { RecipeDetails } from '../../components/RecipeDetails.jsx';

export class RecipeView extends React.Component {

    constructor() {
        super();

        // Initialize state with blank array
        this.state = {
            recipeList: [],
            currentDetailsID: 0
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
                        currentDetailsID: this.state.currentDetailsID
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
        let paramString = "/Ingredient/getRecipesByComplex?foodtype=&diet=&cuisine=&ingredients=";

        // TODO: Enable filter search in query

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

    /**
     * Callback to open details window using the recipe ID.
     */
    setDetailsView(recipeID) {
       this.setState({recipeList: this.state.recipeList, currentDetailsID: recipeID});
    }

    /**
     * Callback to close the details window.
     */
    closeDetails() {
        this.setDetailsView(0);
    }

    render() {
        let recipeModal = "";

        if (this.state.currentDetailsID !== 0) {
            recipeModal = <RecipeDetails id={this.state.currentDetailsID} close={() => this.closeDetails()}/>;
        }

        return (
            <div>
                <h1>Recipe Search Results</h1>
                <RecipeGrid recipes={this.state.recipeList} setDetailsView={(id)=>this.setDetailsView(id)}/>
                {recipeModal}
            </div>
        );
    }
}
