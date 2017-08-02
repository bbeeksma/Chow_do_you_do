'use strict';
var app = app || {};

(function(module) {

  Recipe.all = [];

  function Recipe(object){
    this.name = object.label;
    this.image = object.image;
    this.servingCount = object.yield;
    this.calorieCount = object.calories;
    this.recipeLink = object.url;
    this.ingredients = Recipe.buildIngredientsList(object.ingredientLines);
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

  //returns ingredients as a list of <li> elements to append with the tmplate
  Recipe.buildIngredientsList = function(ingredients){
    var allIngredients = ingredients.map(function(item){
      return '<li>' + item + '</li>';
    }).reduce(function(acc,val){
      return acc += val;
    });
    console.log('ingredients for template: ',allIngredients);
    return allIngredients;
  };

  Recipe.loadRecipes = function(){
    Recipe.all = recipeResults.map(function(recipe){
      return new Recipe(recipe);
    });
  };

  Recipe.toHtml = function(recipe){
    var template = Handlebars.compile($('#recipe-template').html());
    console.log('handlebars template: ',template(recipe), recipe);
    return template(recipe);
  };

  Recipe.getRandomRecipe = function(){
    return Math.floor(Math.random() * Recipe.all.length);
  };

  Recipe.initRecipes = function(){
    Recipe.loadRecipes();
    var thisRecipe = Recipe.getRandomRecipe();
    $('#recipes').empty().append(Recipe.toHtml(Recipe.all[thisRecipe]));
  };
  //Get Recipes Handler function: Feel free to move this whare necessary
  $('#button').on('click', function(){
    Recipe.initRecipes();
  });

  module.Recipe = Recipe;
})(app);
