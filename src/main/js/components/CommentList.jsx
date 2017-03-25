/**
 * CommentList.jsx - EmptyMyFridge
 * The component for displaying the list of comments
 */

import React from 'react';

import { Comment } from './Comment.jsx';

export class CommentList extends React.Component {

    constructor(props) {
        super();

        this.state = {
            signedIn: false,
            commentList: [],
            currentComment: ""
        };

        // Set firebase database reference
        this.myFirebaseRef = firebase.database().ref('comments/' + props.id + '/');
    }

    /**
     * Initialize firebase database listener on mount & add authentication listener.
     */
    componentDidMount() {
        // Add comment listener
        this.myFirebaseRef.on('child_added', (snapshot) => {
            const comment = snapshot.val();

            // Add new comment to state
            const commentList = this.state.commentList;
            commentList.push({
                user: comment.name,
                message: comment.message
            });

            this.setState({
                signedIn: this.state.signedIn,
                commentList: commentList,
                currentComment: ""
            });
        });

        // onAuthStateChanged returns an unregister function
        this.unregisterAuthEvent = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    signedIn: true,
                    commentList: this.state.commentList,
                    currentComment: this.state.currentComment
                });
            } else {
                this.setState({
                    signedIn: false,
                    commentList: this.state.commentList,
                    currentComment: this.state.currentComment
                });
            }
        });

    }

    /**
     * Called before component is unmounted. Unregister event listener when user leaves
     * profile page to prevent setting state of component that isn't mounted.
     */
    componentWillUnmount() {
        this.unregisterAuthEvent();
    }

    /**
     * Called when the comment is to be sent.
     * @param event: The click event.
     */
    sendComment(event) {
        event.preventDefault();

        if (!this.state.signedIn) {
            alert("Please sign up or sign in to comment on recipes!");
            return;
        }

        this.myFirebaseRef.push({
            name: firebase.auth().currentUser.displayName,
            //uid: firebase.auth().currentUser.uid,
            message: this.state.currentComment
        }, (error) => {

            if (error) {
                alert("Could not send your comment! Please check your internet connection or try again later!");
                console.error("Error: failed to send comment. " + error.message);
            }

        });
    }

    /**
     * Called when updating the comment text box.
     * @param event: The onChange event.
     */
    updateComment(event) {
        event.preventDefault();

        this.setState({
            signedIn: this.state.signedIn,
            commentList: this.state.commentList,
            currentComment: event.target.value
        });
    }

    render() {
        // Array to store the comment components
        const comments = [];

        for (let i = 0; i < this.state.commentList.length; i++) {
            // Append new comment components
            comments.push(
                <Comment
                    user={this.state.commentList[i].user}
                    commentMsg={this.state.commentList[i].message}
                    key={i}
                />
            );
        }

        return (
            <div id="commentList">
                <h3>Comments</h3>
                <section id="comments">
                    {comments}
                </section>

                <form id="commentInput" onSubmit={(event) => this.sendComment(event)}>
                    <input
                        type="text"
                        value={this.state.currentComment}
                        onChange={(event) => this.updateComment(event)}
                        id="commentMessage"
                    />

                    <button type="submit">
                        Send
                    </button>
                </form>
            </div>
        );
    }
}
