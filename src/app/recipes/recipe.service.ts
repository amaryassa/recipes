import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';

import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './../shopping-list/store/shopping-list.actions';


import * as fromShoppingList from './../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Test Name',
  //     'test description',
  //     'https://kabyle.com/wp-content/uploads/2019/06/amazigh-flag-768x505.jpg',
  //     [
  //       new Ingredient('oignons ', 5),
  //       new Ingredient('fromage', 20),
  //     ]
  //     ),
  //   new Recipe(
  //     'Pomme',
  //     'description d\'une pomme',
  //     'https://media.gerbeaud.net/2017/01/640/pomme-detouree.jpg',
  //     [
  //       new Ingredient('salade', 1),
  //       new Ingredient('tomate', 20),
  //     ]
  //     ),
  //   new Recipe(
  //     'banane',
  //     'description banane',
  //     'https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631',
  //     [
  //       new Ingredient('meat', 1),
  //       new Ingredient('frittes', 20),
  //     ]
  //     )
  // ];

  private recipes: Recipe[] = [];

    constructor(
      private shoppingListService: ShoppingListService,
      private store: Store<fromShoppingList.AppState>
      ) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }



  addIngridientsToShoppingList(Ingredients: Ingredient[]) {
  // this.shoppingListService.addIngredients(Ingredients);
  this.store.dispatch(new ShoppingListActions.AddIngridients(Ingredients));
  }


  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());

  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());

  }
  deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipeChanged.next(this.recipes.slice());
  }


}
