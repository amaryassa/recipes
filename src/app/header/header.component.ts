import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import * as  AuthActions from './../auth/store/auth.action';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthentificated = false;
  private userSub: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
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
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();

  }

  onLogout() {

    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
