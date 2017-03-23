/**
 * Comment.jsx - EmptyMyFridge
 * The comment component for displaying in recipe details
 */

import React from 'react';

export class Comment extends React.Component {

    // TODO: Complete Comment component

    render() {
        return (
            <div id="comment">
                User: {this.props.user}
                Comment: {this.props.commentMsg}
            </div>
        );
    }
}
