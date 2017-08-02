'use strict';
var app = app || {};

(function(module) {
  const aboutController = {};
  aboutController.show = () => {
    $('.tab-content').hide();
    $('#about').show();
  };
  module.aboutController = aboutController;
})(app);
