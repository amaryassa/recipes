import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


import * as ShoppingListActions from './../store/shopping-list.actions';

import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false }) shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe(stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });

        } else {
          this.editMode = false;
        }
      });
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const NewIngrident = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(this.editedItemIndex, NewIngrident)
      this.store.dispatch(
        new ShoppingListActions.UpdateIngridient(NewIngrident)
      );

    } else {
      // this.shoppingListService.addIngredient(NewIngrident);
      this.store.dispatch(
        new ShoppingListActions.AddIngridient(NewIngrident)
      );
    }
    this.editMode = false;
    form.reset();
  }
  onDelete() {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngridient());

    this.onClear();
  }
  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());

  }

}
