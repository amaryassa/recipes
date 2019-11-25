import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as AppState from './../../store/app.reducer';
import * as RecipesActions from './../store/recipes.actions';
import * as ShoppingListActions from './../../shopping-list/store/shopping-list.actions';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState.AppState>
  ) { }

  ngOnInit() {
    // const id = this.route.snapshot.params['id'];
    this.route.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map(recipesState => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.id;
          }); 
        })
      ).
      subscribe(recipe => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngridients(this.recipe.ingredients))
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipes(this.id));
    this.router.navigate(['/recipes']);
  }



}
