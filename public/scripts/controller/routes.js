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

var caloriesMin = '200'; //format as gte%20<number>
var caloriesMax = '900'; //format as lte%20<number>
var health = 'peanut-free';
var diet = 'low-carb';
var ingredient = 'beef';

var recipeResults;
getRecipe = () => {
  $.ajax({
    url: '/edamam/'
    ,method: 'GET'
    ,data: {
      q: ingredient
      ,from: 0
      ,to: 100
      ,calories:`gte ${caloriesMin}, lte ${caloriesMax}`
      ,health:health
      ,diet:diet
    }
  }).then(data => {
    recipeResults = data.hits.map(function(item){
      return item.recipe;
    });

    console.log(recipeResults);
  });
};

page('/', app.homeController.show);
page('/about', app.aboutController.show);
page('/nutrition', app.nutritionController.show);
page('/recipes', app.recipeController.show);

page('*', function(){
  $('body').text('Not Found');
});

page();
