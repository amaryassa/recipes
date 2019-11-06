import { AuthService } from './../auth/auth.service';
import { Ingredient } from './ingredient.model';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authservice: AuthService
  ) { }
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://mybooks-abc71.firebaseio.com/recipes.json', recipes)
      .subscribe(
        response => {
          console.log(response);
        }
      );

  }

  fetchRecipes() {

    return this.http
      .get<Recipe[]>(
        'https://mybooks-abc71.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingridents: recipe.ingredients ? recipe.ingredients : [] };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }


}
