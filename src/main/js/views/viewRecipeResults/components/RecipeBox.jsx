/**
 * RecipeBox.jsx - EmptyMyFridge
 * RecipeBox component.
 */

import React from 'react';

export class RecipeBox extends React.Component {

    render() {
        return(
            <div className="recipeBox">
                <section id="buttons">
                    <button className="like">Like</button>
                    <button className="save">Save</button>
                </section>
                <section id="pic">
                    <img/>
                </section>
                <section id="recipename">
                    {this.props.name}
                </section>
            </div>
        );
    }
}