import { take, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as AppState from './../store/app.reducer';
import * as RecipesActions from './store/recipes.actions';
import { ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(
    private store: Store<AppState.AppState>,
    private actions$: Actions
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    return this.store.select('recipes').pipe(
      take(1),
      map(recipesState => {
        return recipesState.recipes;
      }),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipesActions.FetchRecipes());
          return this.actions$
            .pipe(
              ofType(RecipesActions.SET_RECIPES),
              take(1)
            );
        } else {
            return of(recipes);
        }
      })
    );
  }

}
