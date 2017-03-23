/**
 * RecipeBox.jsx - EmptyMyFridge
 * RecipeBox component.
 */

import React from 'react';

const boxStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
    width: '100%',
    height: '20%',
    backgroundColor: '#000000',
    display: 'table',
    zIndex: '2'
};

export class RecipeBox extends React.Component {

    getDivCSS() {
        return {
            backgroundImage: 'url('+this.props.image+')',
            backgroundSize: '100% auto',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        };
    }

    render() {
        return (
            <div className="recipeBox" onClick={() => this.props.currentID(this.props.id)} style={this.getDivCSS()}>
                <section className="buttons">
                    <button className="like">Like</button>
                    <button className="save">Save</button>
                    <div style = {boxStyle}>
                        <section className="recipeName">{this.props.name}</section>
                    </div>
                </section>

            </div>
        );
    }
}
