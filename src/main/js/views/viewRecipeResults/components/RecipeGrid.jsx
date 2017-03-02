/**
 * RecipeGrid.jsx - EmptyMyFridge
 * RecipeGrid component.
 */

import React from 'react';
import { RecipeBox } from './RecipeBox.jsx';

export class RecipeGrid extends React.Component {

    constructor() {
        super();
        this.state = {
            numRecipes: 0,
            boxes: null
        };
    }

    getRecipeBoxes() {
        const exampleData = [
            {"name":"Brown Butter Apple Crumble"},
            {"name":"Apple fritters"},
            {"name":"Apple Tart"},
            {"name":"Brown Butter Apple Crumble"},
            {"name":"Apple fritters"},
            {"name":"Apple Tart"},
            {"name":"Brown Butter Apple Crumble"},
            {"name":"Apple fritters"}];
        let recipeBoxes = [];

        // Get recipe JSON from site header

        const length = exampleData.length;

        for (let i = 0; i < length; i++) {
            recipeBoxes.push(<RecipeBox name={exampleData[i].name} key={i}/>);
        }

        return recipeBoxes;
    }
    render() {
        return(
            <div>
                {this.getRecipeBoxes()}
            </div>
        );
    }
}