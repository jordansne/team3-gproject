/**
 * index.jsx - EmptyMyFridge
 * Indexer & renderer of the View Recipes Page.
 */

import React from 'react';

import { RecipeGrid } from './components/RecipeGrid.jsx';

export class RecipeView extends React.Component {

    render() {
        return(
            <RecipeGrid/>
        );
    }
}
