/**
 * RecipeDetails.jsx - EmptyMyFridge
 * Recipe details component.
 */

import React from 'react';
import Modal from 'react-overlays/lib/Modal';

import { CommentList } from './CommentList.jsx';

export class RecipeDetails extends React.Component {

    constructor() {
        super();

        // Initialize blank state
        this.state = {
            name: "",
            image: "",
            url: "",
            summary: "",
            likes: 0
        };
    }

    /**
     * Called when the like button is pressed.
     */
    handleLikeClick() {
        if (!this.props.isLiked) {

            // If the recipe is current not liked, increment like number and update state
            let newLikes = this.state.likes;
            newLikes++;

            this.setState({
                name: this.state.name,
                image: this.state.image,
                url: this.state.url,
                summary: this.state.summary,
                likes: newLikes
            });

        } else {

            // If the recipe is current is liked, decrement like number and update state
            let newLikes = this.state.likes;
            newLikes --;

            this.setState({
                name: this.state.name,
                image: this.state.image,
                url: this.state.url,
                summary: this.state.summary,
                likes: newLikes
            });
        }

        // Handle is parent component
        this.props.likeClicked(this.props.id);
    }

    /**
     * Beginning retrieving recipe data once mounted.
     */
    componentDidMount() {
        let apiURL = "/Ingredient/getRecipeInfo?recipeID=" + this.props.id;

        // Retrieve recipe details
        fetch(apiURL).then((response) => {
            if (response.ok) {

                response.json().then((recipeObject) => {
                    this.setState({
                        name: recipeObject["name"],
                        image: recipeObject["image"],
                        url: recipeObject["url"],
                        summary: recipeObject["summary"],
                        likes: this.state.likes
                    });
                })

            } else {
                // TODO: Handle server response error
                console.error("Server response error: " + response.message);
            }

        }).catch((error) => {
            // TODO: Handle connection error
            console.error("Server response error: " + error.message);
        });

        // Retrieve number of likes of recipe
        const firebaseRef = firebase.database().ref('likes/' + this.props.id + '/');

        firebaseRef.once('value').then((snapshot) => {
            let likeCount = snapshot.val();

            if (likeCount === null) {
                this.setState({
                    name: this.state.name,
                    image: this.state.image,
                    url: this.state.url,
                    summary: this.state.summary,
                    likes: 0
                });

            } else {
                this.setState({
                    name: this.state.name,
                    image: this.state.image,
                    url: this.state.url,
                    summary: this.state.summary,
                    likes: likeCount
                });
            }
        });
    }

    render() {
        // CSS for the Modal (pop-up window)
        const modalStyle = {
            position: 'fixed',
            zIndex: 1040,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };

        // Set appropriate like image
        let buttonStyle;
        if (this.props.isLiked) {
            buttonStyle = { backgroundImage: "url('/assets/favouriteliked.png')" };
        } else {
            buttonStyle = { backgroundImage: "url('/assets/favourite.png')" };
        }

        // Do not show number of likes if zero
        let likesHTML = "";
        if (this.state.likes !== 0) {
            likesHTML = this.state.likes;
        }

        return (
            <div>
                <Modal
                    aria-labelledby='modal-label'
                    style={modalStyle}
                    backdrop={true}
                    backdropClassName="backdrop"
                    onHide={this.props.close}
                    show={true}
                >

                    <div className = "recipeDetails">
                        <button className ="like" style={buttonStyle} onClick={() => this.handleLikeClick()}/>

                        <div className="likes">{likesHTML}</div>
                        <button className="close" onClick={this.props.close}>Close</button>

                        <section className="mainCol">
                            <a target="_blank" href={this.state.url}>
                                <div style={{backgroundImage: 'url(' + this.state.image + ')'}} className="img"/>
                            </a>

                            <div className="recipeSummary" dangerouslySetInnerHTML={{__html: this.state.summary}}/>
                        </section>

                        <aside className="commentCol">
                            <CommentList id={this.props.id}/>
                        </aside>
                    </div>

                </Modal>
            </div>
        );
    }
}
