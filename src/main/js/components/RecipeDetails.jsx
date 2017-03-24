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
            summary: ""
        };
    }

    /**
     * Beginning retrieving recipe data once mounted.
     */
    componentDidMount() {
        let apiURL = "/Ingredient/getRecipeInfo?recipeID=" + this.props.id;

        fetch(apiURL).then((response) => {
            if (response.ok) {

                response.json().then((recipeObject) => {
                    this.setState({
                        name: recipeObject["name"],
                        image: recipeObject["image"],
                        url: recipeObject["url"],
                        summary: recipeObject["summary"]
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

                    <div className="recipeDetails">
                        <button className="like">Like</button>
                        <button className="close" onClick={this.props.close}>Close</button>

                        <section className="mainCol">
                            <a href={this.state.url}>
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
