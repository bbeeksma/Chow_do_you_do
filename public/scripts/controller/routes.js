
page('/', app.homeController.show);
page('/about', app.aboutController.show);
page('/nutrition', app.nutritionController.show);
page('/recipes', app.recipeController.show);

page('*', function(){
  $('body').text('Not Found');
});

page();
