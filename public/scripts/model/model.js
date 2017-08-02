'use strict';
var app = app || {};

((module) => {
  Recipe.all = [];

  function Recipe(object){
    this.name = object.label;
    this.image = object.image;
    this.servingCount = object.yield;
    this.calorieCount = object.calories;
    this.ingredients = object.ingredietLines;
    this.recipeLink = object.url;
    this.carbCount = object.totalNutrients.CHOCDF.quantity;
    this.carbUnit = object.totalNutrients.CHOCDF.unit;
    this.protein = object.totalNutrients.PROCNT.quantity;
    this.proteinUnit = object.totalNutrients.PROCNT.unit;
    this.fat = object.totalNutrients.FAT.quantity;
    this.fatUnit = object.totalNutrients.FAT.unit;
  }

  Recipe.loadRecipes(){
    Recipe.all = recipeResults.map(function(recipe){
      new Recipe(recipe);
    });
  }

  module.Recipe = Recipe;
})(app)
