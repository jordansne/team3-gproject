/**
 * RecipeGrid.jsx - EmptyMyFridge
 * RecipeGrid component.
 */

import React from 'react';
import { RecipeBox } from './RecipeBox.jsx';

export class RecipeGrid extends React.Component {

    //Returns box elements for each recipe result returned from the api
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

        //Array to store the recipe boxes
        let recipeBoxes = [];

        // Get recipe JSON from site header

        const length = exampleData.length;

        for (let i = 0; i < length; i++) {
            recipeBoxes.push(<RecipeBox name={exampleData[i].name} key={i}/>); //Append new recipe box to recipebox array
        }

        return recipeBoxes;
    }
    render() {
        return(
            <div id="recipegrid">
                {this.getRecipeBoxes()}
            </div>
        );
    }
}