import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';

import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Test Name',
      'test description',
      'https://kabyle.com/wp-content/uploads/2019/06/amazigh-flag-768x505.jpg',
      [
        new Ingredient('oignons ', 5),
        new Ingredient('fromage', 20),
      ]
      ),
    new Recipe(
      'Pomme',
      'description d\'une pomme',
      'https://media.gerbeaud.net/2017/01/640/pomme-detouree.jpg',
      [
        new Ingredient('salade', 1),
        new Ingredient('tomate', 20),
      ]
      ),
    new Recipe(
      'banane',
      'description banane',
      'https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631',
      [
        new Ingredient('meat', 1),
        new Ingredient('frittes', 20),
      ]
      )
  ];

    constructor(private shoppingListService: ShoppingListService){}
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }



  addIngridientsToShoppingList(Ingredients: Ingredient[]) {
  this.shoppingListService.addIngredients(Ingredients);
  }


}
