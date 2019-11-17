import { Ingredient } from './../../shared/ingredient.model';
import { Action } from '@ngrx/store';


export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGRIDIENT = 'UPDATE_INGRIDIENT';
export const DELETE_INGRIDIENT = 'DELETE_INGRIDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddIngridient implements Action {
    readonly type = ADD_INGREDIENT;

    constructor(public payload: Ingredient) { }
}
export class AddIngridients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) { }
}
export class UpdateIngridient implements Action {
    readonly type = UPDATE_INGRIDIENT;

    constructor(public payload: { index: number, ingredient: Ingredient }) { }
}
export class DeleteIngridient implements Action {
    readonly type = DELETE_INGRIDIENT;

    constructor(public payload: number) { }
}
export class StartEdit implements Action {
    readonly type = START_EDIT;

    constructor(public payload: number) { }
}
export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}



export type ShoppingListActions =

    | AddIngridient
    | AddIngridients
    | UpdateIngridient
    | DeleteIngridient
    | StartEdit
    | StopEdit
    ;

