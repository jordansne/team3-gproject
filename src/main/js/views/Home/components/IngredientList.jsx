/**
 * IngredientList.jsx - EmptyMyFridge
 * List of components for Ingredients.
 */

import React from 'react';

import { Ingredient } from './Ingredient.jsx';

export class IngredientList extends React.Component {

    render() {
        let componentContent;
        let ingredientHTML = [];
        let counter = 0;

        // Build an array of Ingredient components
        this.props.ingredientList.forEach((ingredient) => {
            ingredientHTML.push(
                <Ingredient
                    name={ingredient}
                    removeFromList={this.props.removeFromList}
                    key={counter}
                />
            );
            counter++;
        });

        // Display a message if no ingredients have been added
        if (ingredientHTML.length <= 0) {
            componentContent = (
                <h4 id="empty">What's in your fridge?</h4>
            );
        } else {
            componentContent = (
                <div>
                    <h4>Ingredient List</h4>
                    <ul id="ingredientList">
                        {ingredientHTML}
                    </ul>
                </div>
            );
        }

        return (
            <div id="ingredientList">
                {componentContent}
            </div>
        );
    }
}
