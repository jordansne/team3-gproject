/**
 * RecipeDetails.jsx - EmptyMyFridge
 * Recipe details component.
 */

import React from 'react';
import Modal from 'react-overlays/lib/Modal';
import { RecipeBox } from './RecipeBox.jsx';


const modalStyle = {
    position: 'fixed',
    zIndex: 1040,
    top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
    modalStyle,
    zIndex: 'auto',
    backgroundColor: '#000',
    opacity: 0.5
};

export class RecipeDetails extends React.Component {

    render() {

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
                    <div className="recipeDetails">
                        <button onClick={this.props.close}>Close</button>
                    </div>
                </Modal>
            </div>
        );
    }

}
