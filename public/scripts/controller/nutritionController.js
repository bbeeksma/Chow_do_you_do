'use strict';
var app = app || {};

(function(module) {
  const nutritionController = {};
  nutritionController.show = () => {
    $('.tab-content').hide();
    $('#nutrition').show();
  };
  module.nutritionController = nutritionController;
})(app);
