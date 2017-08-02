'use strict';
var app = app || {};

(function(module) {
  const recipeController = {};
  recipeController.show = () => {
    $('.tab-content').hide();
    $('#recipe').show();
  };
  module.recipeController = recipeController;
})(app);
