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
                <button onClick={this.props.doSearch}>
                    Go
                </button>
            </div>
        );
    }
}
