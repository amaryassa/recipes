import { Ingredient } from './../shared/ingredient.model';
import { Subject } from 'rxjs';


export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();



  private ingredients: Ingredient[] = [
    new Ingredient('lala', 10),
    new Ingredient('lili', 15)
  ];


  getIngredient(index: number) {
    return this.ingredients[index];
  }

  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }


  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }


  updateIngredient(index: number, newIngridient: Ingredient) {
      this.ingredients[index] = newIngridient;
      this.ingredientChanged.next(this.ingredients.slice());

  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
}
}
