/**
 * FilterSpecifier.jsx - EmptyMyFridge
 * The search box input.
 */

import React from 'react';

export class FilterSpecifier extends React.Component {

    /**
     * Called when component mounted to update the current diet setting.
     */
    componentDidMount() {
        const firebasePath = firebase.database().ref('dietPref/' + firebase.auth().currentUser.uid + '/');

        firebasePath.once('value').then((snapshot) => {
            const setting = snapshot.val();

            if (setting !== null) {
                document.getElementById('filterSetting').value = setting;
            } else {
                document.getElementById('filterSetting').value = "none";
            }
        })
    }

    /**
     * Called when the save button is pressed.
     */
    handleSave() {
        const firebasePath = firebase.database().ref('dietPref/' + firebase.auth().currentUser.uid + '/');
        const setting = document.getElementById('filterSetting').value;

        if (setting !== "none") {
            firebasePath.set(document.getElementById('filterSetting').value);
        } else {
            firebasePath.remove();
        }

        alert("Dietary Restriction saved!");
    }

    render() {
        return (
            <div id="filterSpecifier">
                <h5>Diet Preference Setting</h5>
                <select id="filterSetting">
                    <option value="none">None</option>
                    <option value="lactose-intolerant">Lactose-intolerant</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="pescetarian">Pescetarian</option>
                    <option value="lacto-vegetarian">Lactose Intolerant Vegetarian</option>
                    <option value="ovo-vegetarian">Ovo Vegetarian</option>
                    <option value="paleo">Paleo</option>
                    <option value="primal">Primal</option>
                    <option value="vegan">Vegan</option>
                </select>
                <button onClick={() => this.handleSave()}>
                    Save
                </button>
            </div>
        );
    }
}
