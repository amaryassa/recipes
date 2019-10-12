import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { relative } from 'path';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

 recipe: Recipe;
 id: number;
  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    // const id = this.route.snapshot.params['id'];
    this.route.params
      .subscribe(
          (params: Params) => {
              this.id = +params['id'];
              this.recipe = this.recipeService.getRecipe(this.id);
          }
      );
  }

  onAddToShoppingList() {
  this.recipeService.addIngridientsToShoppingList(this.recipe.ingredients)
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});

  }



}
