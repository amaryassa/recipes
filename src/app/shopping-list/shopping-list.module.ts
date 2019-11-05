import { RouterModule } from '@angular/router';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],

    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: 'shopping-list', component: ShoppingListComponent }
          ])
    ],
    exports: []
})
export class ShoppingListModule { }