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

        // TODO: Write constructor

        // Initialize state
        this.state = ({
            ingredientList: []
        });
    }

    /**
     * Add an ingredient to the list.
     */
    addToList() {
        // TODO: Write method
    }

    /**
     * Remove an ingredient from the list.
     * @param name The name of the ingredient.
     */
    removeFromList(name) {
        // TODO: Write method
    }

    /**
     * Update the state of textBox variable.
     * @param event: HTML input event.
     */
    updateText(event) {
        // TODO: Write method
    }

    render() {
        return (
            <div>
                <TextBox
                    addToList={() => this.addToList()}
                    updateText={(e) => this.updateText(e)}
                />
                <IngredientList
                    ingredientList={this.state.ingredientList}
                    removeFromList={(name) => this.removeFromList(name)}
                />
            </div>
        );
    }
}
