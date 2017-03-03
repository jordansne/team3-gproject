/**
 * index.jsx - EmptyMyFridge
 * Indexer of the Home Component.
 */

import React from 'react';

import { IngredientListBuilder } from './components/IngredientListBuilder.jsx';

export class Home extends React.Component {
    render() {
        return (
            <IngredientListBuilder/>
        );
    }
}
