import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Test Name', 'test description', 'https://kabyle.com/wp-content/uploads/2019/06/amazigh-flag-768x505.jpg'),
    new Recipe('Pomme', 'description d\'une pomme', 'https://media.gerbeaud.net/2017/01/640/pomme-detouree.jpg'),
    new Recipe('banane', 'description banane', 'https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631')
  ];

  getRecipes() {
    return this.recipes.slice();
  }

}
