'use strict';
var app = app || {};

(function(module) {

  const recipeController = {};

  recipeController.show = () => {
    $('.tab-content').hide();
    $('#recipe').show();
  };

  recipeController.recipeResults = [];

  recipeController.getRecipe = (dataString) => {
    $.ajax({
      url: '/edamam/'
      ,method: 'GET'
      ,data: dataString
    }).then(data => {
      recipeController.recipeResults = data.hits.map(function(item){
        return item.recipe;
      });
      console.log(recipeController.recipeResults);
      app.Recipe.initRecipes(recipeController.recipeResults,'#recipe');
    });
  };
  recipeController.submitListener = () => {
    $('#recipeLookup').submit(function(e) {
      e.preventDefault();
      var values = $(this).serialize();
      console.log(values);
      recipeController.getRecipe(values);
    });
  };

  module.recipeController = recipeController;
})(app);
