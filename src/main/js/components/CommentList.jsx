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
            commentList: [],
            currentComment: ""
        };

        // Set firebase database reference
        this.myFirebaseRef = firebase.database().ref('comments/' + props.id + '/');
    }

    /**
     * Initialize firebase database listener on mount.
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
                commentList: commentList,
                currentComment: ""
            });
        });
    }

    /**
     * Called when the comment is to be sent.
     * @param event: The click event.
     */
    sendComment(event) {
        event.preventDefault();

        // TODO: Check if user is signed in before allowing comments

        this.myFirebaseRef.push({
            name: firebase.auth().currentUser.displayName,
            //uid: firebase.auth().currentUser.uid,
            message: this.state.currentComment
        }, (error) => {

            if (error) {
                // If comment could not be sent
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
                />
            );
        }

        return (
            <div id="comment">
                <form onSubmit={(event) => this.sendComment(event)}>
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
