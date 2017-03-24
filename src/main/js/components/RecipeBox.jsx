/**
 * RecipeBox.jsx - EmptyMyFridge
 * RecipeBox component.
 */

import React from 'react';

export class RecipeBox extends React.Component {

    render() {
        return (
            <div
                className="recipeBox"
                onClick={() => this.props.setDetailsView(this.props.id)}
                style={{
                    backgroundImage: 'url(' + this.props.image + ')'
                }}
            >
                <section className="buttons">
                    <button className="like" onClick = {() => this.props.liked(this.props.id)}/>
                    <div className="titleBackground">
                        <section className="recipeName">
                            {this.props.name}
                        </section>
                    </div>
                </section>

            </div>
        );
    }
}
