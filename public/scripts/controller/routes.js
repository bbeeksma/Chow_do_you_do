/*
DIET:
balanced,
high-protein,
low-fat,
low-carb,

HEALTH
vegan,
vegetarian,
sugar-conscious,
peanut-free,
tree-nut-free,
alcohol-free
*/

/*
  name: object.label
  image: object.image
  serving count: object.yield
  calorie count: object.calories
  ingredients: object.ingredietLines(array)
  recipe link: object.url
  carb count: object.totalNutrients.CHOCDF.quantity
    carb unit:object.object.totalNutrients.CHOCDF.unit
  protein: object.totalNutrients.PROCNT.quantity
    protein unit: object.totalNutrients.PROCNT.unit
  fat: object.totalNutrients.FAT.quantity
    fat: object.totalNutrients.FAT.unit
*/

page('/', app.homeController.show);
page('/about', app.aboutController.show);
page('/nutrition', app.nutritionController.show);
page('/recipes', app.recipeController.show);

page('*', function(){
  $('body').text('Not Found');
});

page();
