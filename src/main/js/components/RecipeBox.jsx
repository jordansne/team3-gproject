/**
 * RecipeBox.jsx - EmptyMyFridge
 * RecipeBox component.
 */

import React from 'react';

export class RecipeBox extends React.Component {

    getDivCSS() {
        return {
            backgroundImage: 'url('+this.props.image+')'
        };
    }

    render() {
        return (
            <div className="recipeBox" onClick={() => this.props.currentID(this.props.id)} style={this.getDivCSS()}>
                <section className="buttons">
                    <button className="like">Like</button>
                    <button className="save">Save</button>
                </section>
                <section className="recipeName">
                    {this.props.name}
                </section>
            </div>
        );
    }
}
