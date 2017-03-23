/**
 * RecipeGrid.jsx - EmptyMyFridge
 * RecipeGrid component.
 */

import React from 'react';
import { RecipeBox } from './RecipeBox.jsx';

export class RecipeGrid extends React.Component {

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
                    setDetailsView={this.props.setDetailsView}
                />
            );
        }

        return(
            <div id="recipeGrid">
                {recipeBoxes}
            </div>
        );
    }
}
