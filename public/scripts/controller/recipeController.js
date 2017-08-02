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
  var healthParam = 'peanut-free';
  var dietParam = 'low-carb';
  var ingredient = 'beef';
  recipeController.recipeResults;

  recipeControler.dataObj = {
    q: ingredient
    ,from: 0
    ,to: 100
    ,calories:`gte ${caloriesMin}, lte ${caloriesMax}`
    ,health:healthParam
    ,diet:dietParam
  };

  recipeController.getRecipe = (dataObj) => {
    $.ajax({
      url: '/edamam/'
      ,method: 'GET'
      ,data: dataObj
    }).then(data => {
      recipeController.recipeResults = data.hits.map(function(item){
        return item.recipe;
      });
      console.log(recipeResults);
    });
  };

  module.recipeController = recipeController;
})(app);
