/**
 * index.jsx - EmptyMyFridge
 * Indexer & renderer of the IngredientListBuilder.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { IngredientListBuilder } from './components/IngredientListBuilder.jsx';

ReactDOM.render(<IngredientListBuilder/>, document.getElementById('ingredientListBuilder'));
