'use strict';
var app = app || {};

(function(module) {
  const homeController = {};
  homeController.show = () => {
    $('.tab-content').fadeOut();
    $('#home').fadeIn();
  };
  module.homeController = homeController;
})(app);
