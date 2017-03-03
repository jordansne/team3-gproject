/**
 * IngredientListBuilder.jsx - EmptyMyFridge
 * Main home page component.
 */

import React from 'react';

import { TextBox } from './TextBox.jsx';
import { IngredientList } from './IngredientList.jsx';

export class IngredientListBuilder extends React.Component {

    constructor() {
        super();


        this.state = ({
            ingredientList: [],
            searchTextBox: "" //?
        });
    }

    /**
     * Add an ingredient to the list.
     */
    addToList() {
        const ingredientListNew = this.state.ingredientList.slice();
        ingredientListNew.push(this.state.searchTextBox);
        this.setState( { ingredientList : ingredientListNew, searchTextBox: ""});





    }

    /**
     * Remove an ingredient from the list.
     * @param name The name of the ingredient.
     */
    removeFromList(name) {
        const ingredientListNew = this.state.ingredientList.slice();
        const index = ingredientListNew.indexOf(name);
        ingredientListNew.splice(index,1);
        this.setState( {ingredientList: ingredientListNew, searchTextBox: this.state.searchTextBox});

    }

    /**
     * Update the state of textBox varie.
     * @param event: HTML input event.
     */
    updateText(event) {
        event.preventDefault();
        this.setState({ searchTextBox : event.target.value, ingredientList : this.state.ingredientList });
    }

    search(){
        let ingredientListString = "/#/recipeSearch?ingredients=";

        for(let i=0; i< this.state.ingredientList.length; i++){

            ingredientListString += this.state.ingredientList[i];
            if( i < this.state.ingredientList.length-1){
                ingredientListString += ",";
            }
        }
        window.location.href = ingredientListString;

    }

    render(){
        return(
            <div>
                <TextBox
                    addToList={() => this.addToList()}
                    updateText={(e) => this.updateText(e)}
                    search ={() => this.search() }
                />
                <IngredientList
                    ingredientList={this.state.ingredientList}
                    removeFromList={(name) => this.removeFromList(name)}
                />
            </div>
        );
    }
}

