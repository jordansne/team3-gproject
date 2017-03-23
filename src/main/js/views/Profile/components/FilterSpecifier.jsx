/**
 * FilterSpecifier.jsx - EmptyMyFridge
 * The search box input.
 */

import React from 'react';

export class FilterSpecifier extends React.Component {

    /**
     * Called when the add button is pressed.
     */
    handleSave() {
        // TODO: Firebase - Save restriction to database
        alert("WIP!");
    }

    render() {
        return (
            <div id="filterSpecifier">
                <select id="filterSetting">
                    <option value="none">Select a dietary restriction</option>
                    <option value="lactose-intolerant">Lactose-intolerant</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="pescetarian">Pescetarian</option>
                    <option value="lacto-vegetarian">Lactose Intolerant Vegetarian</option>
                    <option value="ovo-vegetarian">Ovo Vegetarian</option>
                    <option value="paleo">Paleo</option>
                    <option value="primal">Primal</option>
                    <option value="vegan">Vegan</option>
                </select>
                <button onClick={() => this.handleSave()}>
                    Save
                </button>
            </div>
        );
    }
}
