'use strict';
var app = app || {};

(function(module) {

  Recipe.all = [];

  function Recipe(object){
    this.uri = object.uri;
    this.name = object.label;
    this.image = object.image;
    this.servingCount = object.yield;
    this.calorieCount = Math.round(object.calories);
    this.caloriePer = Math.round(object.calories / object.yield);
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

  Recipe.scrambleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  Recipe.fetchRecipes = function(){
    var recipeResults;
    $.getJSON('../assets/starterRecipes.json',function(data){
      recipeResults = data;
    }).then(function(){
      Recipe.initRecipes(recipeResults,'section#home #recipes');
    });
  };

  Recipe.getSavedRecipies = function(){
    $('section#home #recipes').empty();
    $.get(`/saved_recipes/${window.localStorage.userName}`)
      .then(
        results => {
          let savedRecipes = results.map( (item) =>{
            return JSON.parse(item.body);
          });
          Recipe.all = [];
          if (Recipe.all.length === 0){
            Recipe.fetchRecipes();
          } else {
            $('.hrTry').find('span').text('Your Saved Recipes');
            savedRecipes.forEach(function(item){
              Recipe.all.push(item);
            });
            $('section#home #recipes').append(Recipe.toHtml(Recipe.all[0]));
          }
        }
      );
  };

  Recipe.saveRecipe = (bodyString) => {
    console.log(window.localStorage.userName);
    $.get(`/users/${window.localStorage.userName}`).then(result =>{
      console.log(result[0].user_id);
      $.post('/saved_recipes', {user_id: result[0].user_id, body: bodyString});
    });
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
    Recipe.all = Recipe.scrambleArray(recipeResults).map(function(item){
      return new Recipe(item);
    });

  };

  Recipe.toHtml = function(recipe){
    var template = Handlebars.compile($('#recipe-template').html());
    return template(recipe);
  };

  Recipe.currentRecipe = 0;
//use this function to adds a recipe to the page
  Recipe.initRecipes = function(recipes,location){
    Recipe.loadRecipes(recipes);
    $(location).empty();
    var onHome = location.search('#home');
    $(location).append(Recipe.toHtml(Recipe.all[0]));
  };

  Recipe.getNextRecipe = (location) => {
    Recipe.currentRecipe++;
    $(location).empty();
    $(location).append(Recipe.toHtml(Recipe.all[Math.abs(Recipe.currentRecipe % Recipe.all.length)]));
  };

  Recipe.getPreviousRecipe = function(location){
    Recipe.currentRecipe--;
    $(location).empty();
    $(location).append(Recipe.toHtml(Recipe.all[Math.abs(Recipe.currentRecipe % Recipe.all.length)]));
  };

  Recipe.discardRecipe = function(e,location){
    Recipe.all.splice(Math.abs(Recipe.currentRecipe % Recipe.all.length), 1);
    $(e.target).closest('div').empty();
    $(location).append(Recipe.toHtml(Recipe.all[Math.abs(Recipe.currentRecipe % Recipe.all.length)]));
  };

  $(document).on('click', '.mainNav li', function(e){
    if($(e.target).data('content') === 'home'){
      Recipe.getSavedRecipies();
    }
    else if ($(e.target).data('content') === 'recipes') {
      Recipe.all = [];
    }
  });
  module.Recipe = Recipe;
})(app);
