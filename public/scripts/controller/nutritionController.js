'use strict';
var app = app || {};

(function(module) {
  const nutritionController = {};
  nutritionController.show = () => {
    $('.tab-content').fadeOut();
    $('#nutrition').fadeIn();
  };
  module.nutritionController = nutritionController;
})(app);
