/**
 * RecipeBox.jsx - EmptyMyFridge
 * RecipeBox component.
 */

import React from 'react';

export class RecipeBox extends React.Component {

    /**
     * Called when the like button is pressed.
     * @param event
     */
    handleLikeClick(event) {
        // Prevent from triggering div onClick event
        event.stopPropagation();

        this.props.likeClicked(this.props.id);
    }

    render() {
        let buttonStyle;

        // Set appropriate like image
        if (this.props.isLiked) {
            buttonStyle = { backgroundImage: "url('/assets/favouriteliked.png')" };
        } else {
            buttonStyle = { backgroundImage: "url('/assets/favourite.png')" };
        }

        return (
            <div
                className="recipeBox"
                onClick={() => this.props.setDetailsView(this.props.id)}
                style={{
                    backgroundImage: 'url(' + this.props.image + ')'
                }}
            >
                <section className="buttons">
                    <button className="like" style={buttonStyle} onClick={(event) => this.handleLikeClick(event)}/>
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
