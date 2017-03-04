/**
 * Filters.jsx - EmptyMyFridge
 * Recipe filter selector component.
 */

import React from 'react';

export class Filters extends React.Component {

    render() {
        return (
            <div>
                <select>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Diner</option>
                </select>
                <select>
                    <option value="vegan">Vegan</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lactose-intolerant">Lactose-intolerant</option>
                </select>
            </div>
        );
    }
}
