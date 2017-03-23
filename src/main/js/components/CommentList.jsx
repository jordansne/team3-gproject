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
    }

    render() {
        return (
            <div id="comment">
            </div>
        );
    }
}
