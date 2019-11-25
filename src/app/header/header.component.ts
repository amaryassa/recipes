
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import * as  AuthActions from '../auth/store/auth.actions';
import * as  RecipeActions from './../recipes/store/recipes.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthentificated = false;
  private userSub: Subscription;
  constructor(
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit() {
    this.userSub = this.store.select('auth')
    .pipe(
      map(authState => authState.user))
    .subscribe(
      user => {
        // this.isAuthentificated = !user ? false : true ;
        this.isAuthentificated = !!user ;
      }
    );
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes())
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {

    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
