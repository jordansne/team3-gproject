/**
 * index.jsx - EmptyMyFridge
 * Indexer & renderer of the UserBox.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { UserBox } from './components/UserBox.jsx';

ReactDOM.render(<UserBox/>, document.getElementById('userbox'));
