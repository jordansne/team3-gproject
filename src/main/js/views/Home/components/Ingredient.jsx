/**
 * Ingredient.jsx - EmptyMyFridge
 * Ingredient component in the list.
 */

import React from 'react';

export class Ingredient extends React.Component {

    render() {
        return (
            <li className="ingredient">
                <h5>{this.props.name}</h5>
                <button onClick={() => this.props.removeFromList(this.props.name)}>
                    Remove
                </button>
            </li>
        );
    }
}
