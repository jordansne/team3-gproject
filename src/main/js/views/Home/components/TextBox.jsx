/**
 * SearchBox.jsx - EmptyMyFridge
 * The search box input.
 */

import React from 'react';

export class TextBox extends React.Component {

    /**
     * Called when the add button is pressed.
     */

    handleAdd(e){
        e.preventDefault();
        this.props.addToList();
        document.getElementById("addingredient").reset();
    }


    render() {
        // TODO: Writer HTML r
        return (
            <div>
                <form id="addingredient" onSubmit={(e) => this.handleAdd(e)}>
                    <label>
                        <input type="text" value={this.props.searchTextBox} onChange={this.props.updateText}/>
                    </label>
                    <input type="submit" value="Add"/>
                </form>
                <button onClick={this.props.search}>
                    go
                </button>




            </div>
        );
    }
}
