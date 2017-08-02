'use strict';
var app = app || {};

(function(module) {

  const recipeController = {};

  recipeController.show = () => {
    $('.tab-content').hide();
    $('#recipe').show();
  };
  var caloriesMin = '200'; //format as gte%20<number>
  var caloriesMax = '900'; //format as lte%20<number>
  var healthParam1 = 'peanut-free';
  var healthParam2 = 'peanut-free';
  var dietParam = 'low-carb';
  var ingredient = 'beef';
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
    });
  };
  recipeController.onSubmit = () => {
    $('#recipeLookup').submit(function(e) {
      e.preventDefault();
      var values = $(this).serialize();
      console.log(values);
      recipeController.getRecipe(values);
    });
  };

  module.recipeController = recipeController;
})(app);
