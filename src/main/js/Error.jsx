/**
 * Error.jsx - EmptyMyFridge
 * Error page component that is shown when user tries to access
 * a non-existent URL.
 */

import React from 'react';

export class Error extends React.Component {

    render() {
        return (
            <div>
                <h1>Whoops!</h1>
                <p>That page couldn't be found!</p>
            </div>
        );
    }
}
