/**
 * RecipeBox.jsx - EmptyMyFridge
 * RecipeBox component.
 */

import React from 'react';

export class RecipeBox extends React.Component {


    render() {
        return (
            <div className="recipeBox" onClick={() => this.props.currentID(this.props.id)}>
                <section className="buttons">
                    <button className="like">Like</button>
                    <button className="save">Save</button>
                </section>
                <section className="pic">
                    <img/>
                </section>
                <section className="recipeName">
                    {this.props.name}
                </section>
            </div>
        );
    }
}
