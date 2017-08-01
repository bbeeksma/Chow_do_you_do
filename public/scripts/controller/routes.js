
var caloriesMin = 'gte%20200'; //format as gte%20<number>
var caloriesMax = 'lte%20900'; //format as lte%20<number>
var health = 'peanut-free';
var diet = 'low-carb';
var ingredient = 'beef';
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

var app = app || {};

page('/', app.homeController.show);
page('/about', app.aboutController.show);
page('/nutrition', app.nutritionController.show);
page('/recipes', app.recipeController.show);

page();

getRecipe = () => {
  $.ajax({
    url: '/edamam/'
    ,method: 'GET'
    ,data: {
      q: 'beef'
      ,from: 0
      ,to: 20
      ,calories:'gte 200, lte 722'
      ,health:'peanut-free'
      ,diet:'low-carb'
    }
  })
  .then(data => {
    console.log(data);
  }
  );
};
