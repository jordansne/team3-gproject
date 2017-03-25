/**
 * Comment.jsx - EmptyMyFridge
 * The comment component for displaying in recipe details
 */

import React from 'react';

export class Comment extends React.Component {

    render() {
        return (
            <div className="comment">
                <h4>{this.props.user}</h4>
                <p>{this.props.commentMsg}</p>
            </div>
        );
    }
}
