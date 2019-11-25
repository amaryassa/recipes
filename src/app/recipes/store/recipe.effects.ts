import { HttpClient } from '@angular/common/http';
import { Recipe } from './../recipe.model';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as RecipesActions from './recipes.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as  AppState from './../../store/app.reducer';

@Injectable()
export class RecipesEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState.AppState>
  ) { }

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://mybooks-abc71.firebaseio.com/recipes.json'
      );
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingridents: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );



  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put('https://mybooks-abc71.firebaseio.com/recipes.json', recipesState.recipes);
    })
  );
}
