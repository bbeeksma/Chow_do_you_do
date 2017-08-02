'use strict';
var app = app || {};

(function(module) {

  Recipe.all = [];

  function Recipe(object){
    this.name = object.label;
    this.image = object.image;
    this.servingCount = object.yield;
    this.calorieCount = object.calories;
    this.ingredients = object.ingredietLines;
    this.recipeLink = object.url;
    if (object.totalNutrients.CHOCDF){
      this.carbCount = object.totalNutrients.CHOCDF.quantity + ' ' + object.totalNutrients.CHOCDF.unit;
    } else {
      this.carbCount = 'Not Available';
    }
    if (object.totalNutrients.PROCNT){
      this.protein = object.totalNutrients.PROCNT.quantity + ' ' + object.totalNutrients.PROCNT.unit;
    } else {
      this.protein = 'Not Available';
    }
    if (object.totalNutrients.FAT){
      this.fat = object.totalNutrients.FAT.quantity + ' ' + object.totalNutrients.FAT.unit;
    } else {
      this.fat = 'Not Available';
    }
  }

  Recipe.loadRecipes = function(){
    Recipe.all = recipeResults.map(function(recipe){
      return new Recipe(recipe);
    });
  };

  module.Recipe = Recipe;
})(app);
