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
  var health = 'peanut-free';
  var diet = 'low-carb';
  var ingredient = 'beef';
  var recipeResults;

  recipeController.getRecipe = (ingredient,caloriesMin,caloriesMax,healthParam,dietParam) => {
    $.ajax({
      url: '/edamam/'
      ,method: 'GET'
      ,data: {
        q: ingredient
        ,from: 0
        ,to: 100
        ,calories:`gte ${caloriesMin}, lte ${caloriesMax}`
        ,health:health
        ,diet:diet
      }
    }).then(data => {
      recipeResults = data.hits.map(function(item){
        return item.recipe;
      });
      console.log(recipeResults);
    });
  };

  module.recipeController = recipeController;
})(app);
