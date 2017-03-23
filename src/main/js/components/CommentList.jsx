/**
 * CommentList.jsx - EmptyMyFridge
 * The component for displaying the list of comments
 */

import React from 'react';

export class CommentList extends React.Component {

    // TODO: Complete CommentList component

    constructor() {
        super();

        this.setState({
            commentList: []
        });
    }

    componentDidMount() {
        // TODO: Setup firebase API call to retrieve comments
        var myFirebaseRef = firebase.database().ref('comments/');

        var pushedRef;

        var sendMessage = function () {
            pushedRef = myFirebaseRef.push({
                name: document.getElementById('name').value,
                //name: firebase.auth().currentUser.displayName,
                //uid: firebase.auth().currentUser.uid,
                message: document.getElementById('message').value
            });
            document.getElementById('message').value = '';
        };



        myFirebaseRef.on('child_added', function(snapshot) {
            var message = snapshot.val();
            addMessage(message.name, message.message);
        });


        var addMessage = function(name, message) {
            var messages = document.getElementById('messages');
            messages.innerHTML = '<dt class="entry">'+name+'</dt><dd class="entry"> '+message+'</dd>'+messages.innerHTML;
        };

    }

    render() {
        return (
            <div id="comment">
            </div>
        );
    }
}
