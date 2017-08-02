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
      app.Recipe.initRecipes(recipeController.recipeResults,'.recipe-result');
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

  recipeController.scrambleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  module.recipeController = recipeController;

})(app);
