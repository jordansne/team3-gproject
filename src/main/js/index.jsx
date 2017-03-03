/**
 * index.jsx - EmptyMyFridge
 * Main index for Javascript.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import { Header } from './views/Header/index.jsx';
import { Error } from './Error.jsx';
import { RecipeView } from './views/viewRecipeResults/index.jsx';

// App component that represent the entire web app
export class App extends React.Component {

    render() {
        return (
            <div>
                <Header/>

                <article id="app">
                    {this.props.children}
                </article>
            </div>
        );
    }
}

ReactDOM.render((
    // Define 'pages' with a Route, and specify it's main component
    <Router history={hashHistory}>
        <Route component={App}>
            <Route path="/"/>
            <Route path="/results" component={RecipeView}/>
            <Route path="*" component={Error}/>
        </Route>
    </Router>
), document.getElementById('app'));
