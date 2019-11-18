import { Ingredient } from './../../shared/ingredient.model';
import { Action } from '@ngrx/store';


export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGRIDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGRIDIENT = '[Shopping List] Delete Ingredient';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

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

    constructor(public payload: Ingredient ) { }
}
export class DeleteIngridient implements Action {
    readonly type = DELETE_INGRIDIENT;
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

