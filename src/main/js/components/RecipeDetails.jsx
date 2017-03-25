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

    liked() {

        if (this.props.isliked) {
            let newLikes = this.state.likes;
            newLikes -= 1;

            this.setState({
                name: this.state.name,
                image: this.state.image,
                url: this.state.url,
                summary: this.state.summary,
                likes: newLikes
            });
        } else {
            let newLikes = this.state.likes;
            newLikes += 1;

            this.setState({
                name: this.state.name,
                image: this.state.image,
                url: this.state.url,
                summary: this.state.summary,
                likes: newLikes
            });
        }

        this.props.liked(this.props.id)
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

        this.likesref = firebase.database().ref('likes/' + this.props.id + '/');
        this.likesref.once('value').then((snapshot) => {
            let likecount = snapshot.val();

            if (likecount === null) {
                this.setState({
                    name: this.state.name,
                    image: this.state.image,
                    url: this.state.url,
                    summary: this.state.summary,
                    likes: 0
                })
            }
            else {
                this.setState({
                    name: this.state.name,
                    image: this.state.image,
                    url: this.state.url,
                    summary: this.state.summary,
                    likes: likecount
                });
            }
        })

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
    let likeStyle = "";
    if(this.state.likes !== 0){
        likeStyle = this.state.likes;
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
                    <button className ="like" style ={buttonStyle} onClick={() => this.liked()}/>

                    <div className="likes">{likeStyle}</div>
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
