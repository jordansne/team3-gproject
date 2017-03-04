/**
 * IngredientListBuilder.jsx - EmptyMyFridge
 * Main home page component.
 */

import React from 'react';

import { TextBox } from './TextBox.jsx';
import { IngredientList } from './IngredientList.jsx';

export class IngredientListBuilder extends React.Component {

    constructor() {
        super();

        this.state = ({
            ingredientList: [],
            textBoxValue: ""
        });
    }

    /**
     * Add an ingredient to the list.
     */
    addToList() {
        // Copy array & add the ingredient to new array
        const ingredientListNew = this.state.ingredientList.slice();
        ingredientListNew.push(this.state.textBoxValue);

        // Update state
        this.setState({
            ingredientList : ingredientListNew,
            textBoxValue: ""
        });
    }

    /**
     * Remove an ingredient from the list.
     * @param name The name of the ingredient.
     */
    removeFromList(name) {
        // Copy array & remove the ingredient from new array
        const ingredientListNew = this.state.ingredientList.slice();
        const index = ingredientListNew.indexOf(name);
        ingredientListNew.splice(index,1);


        // Update state
        this.setState({
            ingredientList: ingredientListNew,
            textBoxValue: this.state.textBoxValue
        });
    }

    /**
     * Update the state of textBoxValue variable.
     * @param event: HTML input event.
     */
    updateText(event) {
        event.preventDefault();

        this.setState({
            textBoxValue : event.target.value,
            ingredientList : this.state.ingredientList
        });
    }

    /**
     * Redirect to the new page with ingredients as the parameters.
     */
    doSearch() {
        let ingredientListURL = "/#/recipeSearch?ingredients=";

        // Build the string from the ingredientList
        for (let i = 0; i < this.state.ingredientList.length; i++) {
            ingredientListURL += this.state.ingredientList[i];

            // Add separator between ingredients
            if (i < this.state.ingredientList.length - 1) {
                ingredientListURL += ",";
            }
        }

        // Set the current window to the new URL
        window.location.href = ingredientListURL;
    }

    render() {
        return (
            <div>
                <TextBox
                    addToList={() => this.addToList()}
                    updateText={(e) => this.updateText(e)}
                    doSearch={() => this.doSearch()}
                />
                <IngredientList
                    ingredientList={this.state.ingredientList}
                    removeFromList={(name) => this.removeFromList(name)}
                />
            </div>
        );
    }
}

