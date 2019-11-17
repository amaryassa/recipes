import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  subscription: Subscription;

  constructor(
      private shoppingListService: ShoppingListService,
      private store: Store<fromShoppingList.AppState>
      ) { }

  ngOnInit() {

    this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscription = this.shoppingListService.ingredientChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    // );
  }


  onEditItem(index: number) {
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }



  ngOnDestroy(): void {
    //  this.subscription.unsubscribe();
  }



 /*  onIngridientAdded(newIngridient: Ingredient) {
  this.ingredients = [...this.ingredients, newIngridient];
    // this.ingredients.push(newIngridient);
  } */

}
