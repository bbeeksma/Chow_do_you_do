'use strict';
var app = app || {};

(function(module) {
  const recipeController = {};
  recipeController.show = () => {
    $('.tab-content').fadeOut();
    $('#recipe').fadeIn();
  };
  module.recipeController = recipeController;
})(app);
