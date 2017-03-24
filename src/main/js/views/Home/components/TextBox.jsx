/**
 * SearchBox.jsx - EmptyMyFridge
 * The search box input.
 */

import React from 'react';

export class TextBox extends React.Component {

    /**
     * Called when the add button is pressed.
     */
    handleAdd(e) {
        // Prevent window reload
        e.preventDefault();

        this.props.addToList();

        // Clear the input box
        document.getElementById("textBoxForm").reset();
    }

    render() {
        return (
            <div id="textBox">
                <form id="textBoxForm" onSubmit={(e) => this.handleAdd(e)}>
                    <label>
                        <input type="text" value={this.props.textBoxValue} onChange={this.props.updateText}/>
                    </label>
                    <input id="add" type="submit" value="Add"/>
                </form>

                <br/>
                <div id="filters">
                    <select className="dropdown" id="filter_type">
                        <option value="none">Select a Meal Type</option>
                        <option value="main-course">Main Course</option>
                        <option value="side-dish">Side Dish</option>
                        <option value="dessert">Dessert</option>
                        <option value="appetizer">Appetizer</option>
                        <option value="breakfast">Breakfast</option>
                    </select>
                    <select className="dropdown" id="filter_restriction">
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
                </div>

                <button onClick={this.props.doSearch}>
                    Go
                </button>
            </div>
        );
    }
}
