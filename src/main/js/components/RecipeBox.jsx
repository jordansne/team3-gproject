/**
 * RecipeBox.jsx - EmptyMyFridge
 * RecipeBox component.
 */

import React from 'react';

export class RecipeBox extends React.Component {

    handleLikeClick(event) {
        event.stopPropagation();
        this.props.liked(this.props.id);
    }

    render() {
        let buttonStyle;
        if (this.props.isliked) {

            buttonStyle = {

                backgroundImage: "url('/assets/favouriteliked.png')"
            }
        }
        else{
            buttonStyle = {

                backgroundImage: "url('/assets/favourite.png')"
            }
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
                    <button className="like" style ={buttonStyle} onClick = {(event) => this.handleLikeClick(event)}/>
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
