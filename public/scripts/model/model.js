'use strict';
var app = app || {};

(function(module) {

  Recipe.all = [];

  function Recipe(object){
    this.uri = object.uri;
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

  Recipe.fetchRandomRecipes = function(){
    var recipeResults;
    $.getJSON('../assets/starterRecipes.json',function(data){
      recipeResults = data;
    }).then(function(){
      Recipe.initRecipes(recipeResults,'section#home #recipes');
    });
  };

  Recipe.saveRecipe = (bodyString) => {
    $.post('/saved_recipes', {user_name: window.localStorage.userName, body: bodyString});
  };

 //returns ingredients as a list of <li> elements to append with the tmplate
  Recipe.buildIngredientsList = function(ingredients){
    var allIngredients = ingredients.map(function(item){
      return '<li>' + item + '</li>';
    }).reduce(function(acc,val){
      return acc += val;
    });
    return allIngredients;
  };

  Recipe.loadRecipes = function(recipeResults){
    Recipe.all = recipeResults.map(function(recipe){
      return new Recipe(recipe);
    });
  };

  Recipe.toHtml = function(recipe){
    var template = Handlebars.compile($('#recipe-template').html());
    return template(recipe);
  };

  Recipe.getRandomRecipe = function(){
    return Math.floor(Math.random() * Recipe.all.length);
  };

//use this function to adds a recipe to the page
  Recipe.initRecipes = function(recipes,location){
    Recipe.loadRecipes(recipes);
    $(location).empty();
    var thisRecipe = Recipe.getRandomRecipe();
    $(location).append(Recipe.toHtml(Recipe.all[thisRecipe]));
  };

  module.Recipe = Recipe;
})(app);
