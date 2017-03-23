/**
 * RecipeDetails.jsx - EmptyMyFridge
 * Recipe details component.
 */

import React from 'react';
import Modal from 'react-overlays/lib/Modal';


const modalStyle = {
    position: 'fixed',
    zIndex: 1040,
    top: 0, bottom: 0, left: 0, right: 0
};



const backdropStyle = {
    modalStyle,
    zIndex: 'auto',
    backgroundColor: '#000',
    opacity: 0.5
};

export class RecipeDetails extends React.Component {

    constructor(){
        super();
        this.state={name: "", image: "", url: "", summary: "" };
    }

    componentDidMount() {


        let apiURL = "/Ingredient/getRecipeInfo?recipeID=";
        apiURL += this.props.id;

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
    getDivCSS() {
        return {
            width: "100%",
            height: "40%",
            backgroundImage: 'url('+this.state.image+')',
            backgroundSize: '100% auto',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            marginTop: '10%'

        };
    }

    render() {

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
                        <a href = {this.state.url}>
                            <div style ={this.getDivCSS()}></div>
                        </a>
                        <div className="recipeSummary" dangerouslySetInnerHTML={{__html: this.state.summary}}></div>


                    </div>

                </Modal>
            </div>
       );
    }
  }