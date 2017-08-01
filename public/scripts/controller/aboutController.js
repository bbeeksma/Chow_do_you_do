'use strict';
var app = app || {};

(function(module) {
  const aboutController = {};
  aboutController.show = () => {
    $('.tab-content').fadeOut();
    $('#about').fadeIn();
  };
  module.aboutController = aboutController;
})(app);
